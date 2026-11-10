"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

// 관리자 편집 화면의 iframe 안에서만 렌더된다. 자동저장 신호를 받으면 서버 컴포넌트를 다시 그린다.
export default function RefreshOnSave() {
  const router = useRouter();
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={typeof window === "undefined" ? "" : window.location.origin} />;
}
