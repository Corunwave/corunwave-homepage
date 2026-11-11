import path from "path";
import type { CollectionBeforeOperationHook } from "payload";

// Supabase Storage는 ASCII 객체명만 받으므로 업로드 파일명을 ASCII로 바꾸고, 원래 이름은 context에 남긴다.
export const asciiUploadName: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if ((operation !== "create" && operation !== "update") || !req.file) return args;

  const original = req.file.name;
  const extension = path.extname(original).toLowerCase().replace(/[^.a-z0-9]/g, "");
  const base = original.slice(0, original.length - path.extname(original).length);
  const ascii =
    base
      .normalize("NFKD")
      .replace(/[^\x20-\x7e]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "file";

  req.file.name = `${ascii}-${Date.now().toString(36)}${extension}`;
  req.context.originalFileName = base;
  return args;
};
