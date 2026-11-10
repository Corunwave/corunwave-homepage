import "server-only";
import { draftMode } from "next/headers";

// 캐시 함수 밖에서 읽어 인자로 넘긴다. draft mode에서는 unstable_cache가 캐시를 우회한다.
export async function isDraftMode() {
  return (await draftMode()).isEnabled;
}
