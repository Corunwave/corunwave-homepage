// 한글을 유지하는 주소용 문자열. 공백은 하이픈, 주소에 쓸 수 없는 기호는 제거한다.
export const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
