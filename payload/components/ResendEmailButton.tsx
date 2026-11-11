"use client";

import { Button, toast, useDocumentInfo } from "@payloadcms/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ResendResult = { ok: boolean; emailStatus?: string; message?: string };

export function ResendEmailButton() {
  const { id } = useDocumentInfo();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (!id) return null;

  const resend = async () => {
    setBusy(true);
    try {
      const response = await fetch(`/api/contact-inquiries/${id}/resend-email`, {
        method: "POST",
        credentials: "include",
      });
      const result = (await response.json()) as ResendResult;
      if (result.ok) toast.success("알림 메일을 보냈습니다.");
      else toast.error(result.message ?? "메일 발송에 실패했습니다. 실패 사유를 확인해 주세요.");
      router.refresh();
    } catch {
      toast.error("요청에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button buttonStyle="secondary" size="medium" disabled={busy} onClick={resend}>
      {busy ? "보내는 중…" : "알림 메일 다시 보내기"}
    </Button>
  );
}
