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
