// public.contact_inquiries(supabase-js 시절 테이블) → payload.contact_inquiries 일회성 이관.
// id·접수/수정 시각을 그대로 보존하고, 이미 옮겨진 행은 건너뛴다(여러 번 실행해도 안전).
import pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const COLUMNS = [
  "id", "name", "company", "email", "phone", "message", "status",
  "email_status", "email_error", "consented_at", "ip_address", "created_at", "updated_at",
];

await client.connect();
try {
  const target = await client.query("select to_regclass('payload.contact_inquiries') as t");
  if (!target.rows[0].t) throw new Error("payload.contact_inquiries 테이블이 없습니다. 먼저 `npm run seed` 또는 dev 서버로 스키마를 만드세요.");

  const { rows } = await client.query(`select ${COLUMNS.join(", ")} from public.contact_inquiries order by id`);
  const placeholders = COLUMNS.map((_, index) => `$${index + 1}`).join(", ");

  await client.query("begin");
  let inserted = 0;
  for (const row of rows) {
    const result = await client.query(
      `insert into payload.contact_inquiries (${COLUMNS.join(", ")}) values (${placeholders}) on conflict (id) do nothing`,
      COLUMNS.map((column) => row[column]),
    );
    inserted += result.rowCount ?? 0;
  }
  await client.query(
    "select setval(pg_get_serial_sequence('payload.contact_inquiries', 'id'), greatest((select coalesce(max(id), 1) from payload.contact_inquiries), 1))",
  );
  await client.query("commit");

  const after = await client.query("select count(*)::int as n from payload.contact_inquiries");
  console.log(`[migrate] 원본 ${rows.length}건 중 ${inserted}건 이관, 대상 테이블 총 ${after.rows[0].n}건`);
} catch (error) {
  await client.query("rollback").catch(() => {});
  console.error(error);
  process.exitCode = 1;
} finally {
  await client.end();
}
