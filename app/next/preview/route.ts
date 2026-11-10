import { cookies, draftMode, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCms } from "@/app/_lib/cms/getCms";
import { hasRole } from "@/payload/access/roles";
import { PREVIEW_COOKIE_MAX_AGE } from "@/payload/lib/previewPaths";

const BYPASS_COOKIE = "__prerender_bypass";

// 같은 사이트 안의 경로만 허용한다(오픈 리다이렉트 방지).
const isInternalPath = (path: string) => path.startsWith("/") && !path.startsWith("//") && !path.includes("\\");

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path") ?? "/";
  if (!isInternalPath(path)) return new Response("Invalid path", { status: 400 });

  const payload = await getCms();
  const { user } = await payload.auth({ headers: await headers() });
  if (!hasRole(user, "ceo", "editor", "staff")) return new Response("Unauthorized", { status: 401 });

  const draft = await draftMode();
  draft.enable();

  // enable()이 세션 쿠키로 심은 값을 1시간 만료로 다시 쓴다. iframe 안에서 쓰이므로 SameSite=None이 필요하다.
  const jar = await cookies();
  const bypass = jar.get(BYPASS_COOKIE);
  if (bypass) {
    jar.set(BYPASS_COOKIE, bypass.value, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: PREVIEW_COOKIE_MAX_AGE,
    });
  }

  redirect(path);
}
