import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { ko } from "@payloadcms/translations/languages/ko";
import sharp from "sharp";
import { ContactInquiries } from "./payload/collections/ContactInquiries";
import { Documents } from "./payload/collections/Documents";
import { LegalDocuments } from "./payload/collections/LegalDocuments";
import { News } from "./payload/collections/News";
import { Media } from "./payload/collections/Media";
import { Users } from "./payload/collections/Users";
import { About } from "./payload/globals/About";
import { Home } from "./payload/globals/Home";
import { PartnerStrategy } from "./payload/globals/PartnerStrategy";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { Solutions } from "./payload/globals/Solutions";
import { Typography } from "./payload/globals/Typography";
import { PREVIEW_PATHS } from "./payload/lib/previewPaths";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const s3Bucket = process.env.S3_BUCKET || "";

// 공개 버킷의 직접 URL. S3 엔드포인트(<ref>.storage.supabase.co)에서 프로젝트 주소를 유도한다.
const publicBaseUrl =
  process.env.S3_PUBLIC_BASE_URL ||
  `${(process.env.S3_ENDPOINT || "").replace(/\.storage\.supabase\.co\/storage\/v1\/s3\/?$/, ".supabase.co")}/storage/v1/object/public/${s3Bucket}`;

const publicFile = (prefix: string) => ({
  prefix,
  disablePayloadAccessControl: true as const,
  generateFileURL: ({ filename, prefix: filePrefix }: { filename: string; prefix?: string }) =>
    [publicBaseUrl, filePrefix, encodeURIComponent(filename)].filter(Boolean).join("/"),
});

export default buildConfig({
  admin: {
    user: Users.slug,
    // 사이트와 같은 파비콘(app/icon.png, app/favicon.ico, app/apple-icon.png)을 관리자에도 쓴다.
    meta: {
      titleSuffix: " - 코런웨이브 홈페이지 관리자모드",
      description: "코런웨이브 홈페이지 콘텐츠를 관리하는 관리자 화면입니다.",
      openGraph: {
        siteName: "코런웨이브 홈페이지 관리자모드",
        description: "코런웨이브 홈페이지 콘텐츠를 관리하는 관리자 화면입니다.",
      },
      icons: [
        { rel: "icon", url: "/favicon.ico", sizes: "any" },
        { rel: "icon", url: "/icon.png", type: "image/png" },
        { rel: "apple-touch-icon", url: "/apple-icon.png" },
      ],
    },
    components: {
      graphics: {
        Logo: "/payload/components/AdminLogo#AdminLogo",
        Icon: "/payload/components/AdminIcon#AdminIcon",
      },
    },
    // 편집 화면 옆 분할 미리보기. 사이트의 draft mode 진입 라우트(/next/preview)를 iframe으로 연다.
    livePreview: {
      globals: Object.keys(PREVIEW_PATHS),
      breakpoints: [
        { label: "데스크톱", name: "desktop", width: 1440, height: 900 },
        { label: "태블릿", name: "tablet", width: 1024, height: 1366 },
        { label: "모바일", name: "mobile", width: 375, height: 812 },
      ],
      url: ({ globalConfig, req }) => {
        const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
        const proto = req.headers.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
        const path = PREVIEW_PATHS[globalConfig?.slug ?? ""] ?? "/";
        return `${proto}://${host}/next/preview?path=${encodeURIComponent(path)}`;
      },
    },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, ContactInquiries, News, Media, Documents, LegalDocuments],
  globals: [SiteSettings, Typography, Home, About, Solutions, PartnerStrategy],
  editor: lexicalEditor(),
  i18n: {
    supportedLanguages: { ko },
    fallbackLanguage: "ko",
  },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    schemaName: "payload",
    pool: { connectionString: process.env.DATABASE_URL || "" },
  }),
  plugins: [
    s3Storage({
      collections: {
        media: publicFile("media"),
        documents: publicFile("documents"),
      },
      bucket: s3Bucket,
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION,
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
      },
    }),
  ],
  sharp,
});
