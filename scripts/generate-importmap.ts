import config from "@payload-config";
import { generateImportMap } from "payload";

// `payload generate:importmap`이 이 환경에서 실패해서 번들해 직접 실행한다.
// 번들 파일 위치가 아니라 저장소 루트를 기준으로 컴포넌트 경로를 계산한다.
const sanitized = await config;
sanitized.admin.importMap.baseDir = process.cwd();
await generateImportMap(sanitized, { force: true, log: true });
process.exit(0);
