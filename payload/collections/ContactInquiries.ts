import type { CollectionConfig, Field } from "payload";
import { isCeo, isCeoOrStaff } from "../access/roles";
import { resendContactEmail } from "../endpoints/resendContactEmail";

const locked = { admin: { readOnly: true }, access: { update: () => false } } as const;

const lockedText = (name: string, label: string, extra: Partial<Field> = {}) =>
  ({ name, label, type: "text", ...locked, ...extra }) as Field;

export const ContactInquiries: CollectionConfig = {
  slug: "contact-inquiries",
  labels: { singular: "문의", plural: "문의" },
  admin: {
    group: "문의",
    useAsTitle: "name",
    defaultColumns: ["name", "company", "status", "emailStatus", "createdAt"],
    listSearchableFields: ["name", "company", "email", "phone"],
    description: "홈페이지 '문의하기'로 접수된 내용입니다. 처리 상태만 바꿀 수 있고, 삭제는 대표(CEO)만 할 수 있습니다.",
  },
  defaultSort: "-createdAt",
  access: {
    // 접수는 /api/contact(서버)에서만 한다. 공개 REST로는 만들 수 없다.
    create: () => false,
    read: isCeoOrStaff,
    update: isCeoOrStaff,
    delete: isCeo,
  },
  endpoints: [resendContactEmail],
  fields: [
    {
      name: "status",
      label: "처리 상태",
      type: "select",
      required: true,
      defaultValue: "received",
      options: [
        { label: "접수", value: "received" },
        { label: "처리 중", value: "in_progress" },
        { label: "완료", value: "done" },
      ],
      index: true,
    },
    lockedText("name", "이름", { required: true }),
    lockedText("company", "회사명", { required: true }),
    { name: "email", label: "이메일", type: "email", required: true, ...locked },
    lockedText("phone", "전화번호", { required: true }),
    { name: "message", label: "문의 내용", type: "textarea", ...locked },
    {
      name: "consentedAt",
      label: "개인정보 수집 동의 일시",
      type: "date",
      required: true,
      admin: { readOnly: true, date: { pickerAppearance: "dayAndTime" } },
      access: { update: () => false },
    },
    lockedText("ipAddress", "접속 IP"),
    {
      type: "collapsible",
      label: "알림 메일",
      admin: { initCollapsed: false },
      fields: [
        {
          name: "emailStatus",
          label: "발송 상태",
          type: "select",
          required: true,
          defaultValue: "pending",
          options: [
            { label: "대기", value: "pending" },
            { label: "발송됨", value: "sent" },
            { label: "실패", value: "failed" },
          ],
          index: true,
          ...locked,
        },
        { name: "emailError", label: "실패 사유", type: "textarea", ...locked },
        {
          name: "resendMail",
          type: "ui",
          admin: { components: { Field: "/payload/components/ResendEmailButton#ResendEmailButton" } },
        },
      ],
    },
  ],
};
