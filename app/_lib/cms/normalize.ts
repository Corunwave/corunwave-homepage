import { LINE_FIELD } from "@/payload/lib/fields";

// 비어 있을 때 "없음"으로 취급할 선택 항목.
const OPTIONAL_KEYS = new Set(["children", "extension", "quote", "subName", "heading"]);

const isEmpty = (key: string, value: unknown) =>
  OPTIONAL_KEYS.has(key) &&
  (value === "" || (Array.isArray(value) && value.length === 0));

/*
 * Payload 문서를 기존 콘텐츠 타입 모양으로 되돌린다.
 * - 배열 행의 자동 id 제거, 고정 항목의 `key`는 `id`로 복원
 * - `{ line }` 한 칸짜리 행은 문자열로 펼침
 * - null·빈 선택 항목은 제거
 */
export function normalize<T>(value: unknown): T {
  return walk(value) as T;
}

function walk(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(walk);
  if (value === null || typeof value !== "object") return value;

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record).filter((key) => key !== "id");
  if (keys.length === 1 && keys[0] === LINE_FIELD) return record[LINE_FIELD];

  const result: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(record)) {
    if (key === "id" || child === null || child === undefined) continue;
    if (key === "key") {
      result.id = child;
      continue;
    }
    const converted = walk(child);
    if (isEmpty(key, converted)) continue;
    result[key] = converted;
  }
  return result;
}

type WithId = { id: string };

/* CMS 항목에 코드에 고정된 값(이미지·색상 등)을 `id`로 맞춰 채운다. */
export function mergeById<C extends WithId, S extends WithId>(cms: readonly C[], fixed: readonly S[]) {
  const fixedById = new Map(fixed.map((item) => [item.id, item]));
  return cms.map((item) => ({ ...fixedById.get(item.id), ...item }) as S & C);
}
