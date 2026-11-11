// Next 요청 밖(시드 스크립트)에서는 캐시 무효화가 필요 없으므로 번들 시 이 스텁으로 대체한다.
export const revalidateTag = () => {};
