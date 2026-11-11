import type { CollectionConfig } from "payload";
import { isCeo, isCeoOrEditor } from "../access/roles";
import { asciiUploadName } from "../hooks/asciiUploadName";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "이미지", plural: "이미지" },
  admin: { group: "파일", useAsTitle: "alt" },
  access: {
    read: () => true,
    create: isCeoOrEditor,
    update: isCeoOrEditor,
    delete: isCeo,
  },
  upload: {
    mimeTypes: ["image/*"],
    focalPoint: false,
    crop: false,
  },
  hooks: { beforeOperation: [asciiUploadName] },
  fields: [
    {
      name: "alt",
      label: "대체 텍스트",
      type: "text",
      required: true,
      admin: { description: "이미지를 보지 못하는 이용자와 검색엔진을 위한 설명입니다." },
    },
  ],
};
