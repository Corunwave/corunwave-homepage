// 글로벌 slug → 관리자 미리보기가 처음 여는 사이트 경로.
// 사이트 설정·글꼴은 모든 페이지에 걸리므로 홈에서 시작한다.
export const PREVIEW_PATHS: Record<string, string> = {
  home: "/",
  about: "/about",
  solutions: "/solutions",
  "partner-strategy": "/partner-strategy",
  "site-settings": "/",
  typography: "/",
};

export const PREVIEW_COOKIE_MAX_AGE = 60 * 60;
