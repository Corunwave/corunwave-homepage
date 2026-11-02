import { after } from "next/server";
import { toSubmitContactInquiryDto } from "@/backend/contact/application/dto/SubmitContactInquiryDto";
import {
  createNotifyContactInquiryUseCase,
  createSubmitContactInquiryUseCase,
} from "@/backend/contact/contactInquiryContainer";
import { ContactInquiryValidationError } from "@/backend/contact/domain/error/ContactInquiryValidationError";

const clientIp = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || null;
};

/* Mail runs after the response; the use case records the outcome on the stored row. */
const notifyAfterResponse = (id: number) =>
  after(async () => {
    try {
      await createNotifyContactInquiryUseCase().execute(id);
    } catch (error) {
      console.error("[contact] notify setup failed", id, error);
    }
  });

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, message: "잘못된 요청입니다." }, { status: 400 });
  }

  /* Honeypot: pretend success so bots get no signal, and store nothing. */
  const honeypot = (raw as { website?: unknown } | null)?.website;
  if (typeof honeypot === "string" && honeypot.trim()) {
    return Response.json({ ok: true });
  }

  try {
    const { id } = await createSubmitContactInquiryUseCase().execute(
      toSubmitContactInquiryDto(raw),
      { ipAddress: clientIp(request) },
    );
    notifyAfterResponse(id);
    return Response.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    if (error instanceof ContactInquiryValidationError) {
      return Response.json({ ok: false, errors: error.errors }, { status: 400 });
    }
    console.error("[contact] submit failed", error);
    return Response.json(
      { ok: false, message: "문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 },
    );
  }
}
