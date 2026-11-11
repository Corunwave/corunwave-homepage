import { APIError, type CollectionConfig } from "payload";
import { hasRole, isCeo } from "../access/roles";

const CEO_ONLY_ONE = "대표(CEO) 계정은 1개만 둘 수 있습니다.";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "사용자", plural: "사용자" },
  auth: true,
  admin: {
    group: "계정",
    useAsTitle: "email",
    defaultColumns: ["email", "role", "createdAt"],
  },
  access: {
    // 관리자 화면 진입은 로그인한 모든 역할에 허용한다.
    admin: ({ req: { user } }) => Boolean(user),
    create: isCeo,
    delete: isCeo,
    // CEO는 전체, 나머지는 본인 계정만 조회·수정한다.
    read: ({ req: { user } }) => {
      if (!user) return false;
      return hasRole(user, "ceo") ? true : { id: { equals: user.id } };
    },
    update: ({ req: { user } }) => {
      if (!user) return false;
      return hasRole(user, "ceo") ? true : { id: { equals: user.id } };
    },
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, originalDoc, req }) => {
        if (!data) return data;

        // 첫 계정(register-first-user 포함)은 CEO로 만든다.
        if (operation === "create") {
          const { totalDocs: ceoCount } = await req.payload.count({
            collection: "users",
            where: { role: { equals: "ceo" } },
            req,
          });
          if (ceoCount === 0) return { ...data, role: "ceo" };
          if (data.role === "ceo") throw new APIError(CEO_ONLY_ONE, 400);
          return data;
        }

        if (operation === "update") {
          // CEO 강등 금지
          if (originalDoc?.role === "ceo" && data.role && data.role !== "ceo") {
            throw new APIError(CEO_ONLY_ONE, 400);
          }
          // 다른 계정을 CEO로 승격 금지
          if (originalDoc?.role !== "ceo" && data.role === "ceo") {
            throw new APIError(CEO_ONLY_ONE, 400);
          }
        }
        return data;
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        const target = await req.payload.findByID({
          collection: "users",
          id,
          depth: 0,
          req,
        });
        if (target.role === "ceo") {
          throw new APIError("대표(CEO) 계정은 삭제할 수 없습니다.", 400);
        }
      },
    ],
  },
  fields: [
    {
      name: "name",
      label: "이름",
      type: "text",
    },
    {
      name: "role",
      label: "권한",
      type: "select",
      required: true,
      defaultValue: "staff",
      saveToJWT: true,
      options: [
        { label: "대표(CEO)", value: "ceo" },
        { label: "에디터", value: "editor" },
        { label: "직원", value: "staff" },
      ],
      access: {
        // 권한 변경은 CEO만 가능
        create: ({ req: { user } }) => hasRole(user, "ceo") || !user,
        update: ({ req: { user } }) => hasRole(user, "ceo"),
      },
    },
  ],
};
