import type { Endpoint } from "payload";
import { hasRole } from "../access/roles";

// 접수 알림 메일을 다시 보낸다. 결과(성공/실패)는 NotifyContactInquiryUseCase가 문의 행에 기록한다.
export const resendContactEmail: Endpoint = {
  path: "/:id/resend-email",
  method: "post",
  handler: async (req) => {
    if (!hasRole(req.user, "ceo", "staff")) {
      return Response.json({ ok: false, message: "권한이 없습니다." }, { status: 403 });
    }

    const id = Number(req.routeParams?.id);
    if (!Number.isInteger(id) || id <= 0) {
      return Response.json({ ok: false, message: "잘못된 문의 번호입니다." }, { status: 400 });
    }

    // server-only 모듈이 시드 스크립트 번들에 끌려가지 않도록 호출 시점에 불러온다.
    const { createNotifyContactInquiryUseCase } = await import("@/backend/contact/contactInquiryContainer");
    await createNotifyContactInquiryUseCase().execute(id);

    const doc = (await req.payload.findByID({ collection: "contact-inquiries", id, depth: 0 })) as unknown as {
      emailStatus: string;
      emailError?: string | null;
    };
    return Response.json({ ok: doc.emailStatus === "sent", emailStatus: doc.emailStatus, emailError: doc.emailError ?? null });
  },
};
