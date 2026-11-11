import type { Access } from "payload";

export type Role = "ceo" | "editor" | "staff";

// payload-types.ts 생성 전에도 쓸 수 있도록 user는 느슨하게 받고 role만 검사한다.
export const hasRole = (user: object | null | undefined, ...roles: Role[]) => {
  const role = (user as { role?: unknown } | null | undefined)?.role;
  return typeof role === "string" && (roles as string[]).includes(role);
};

export const isCeo: Access = ({ req: { user } }) => hasRole(user, "ceo");

export const isCeoOrStaff: Access = ({ req: { user } }) => hasRole(user, "ceo", "staff");

export const isCeoOrEditor: Access = ({ req: { user } }) => hasRole(user, "ceo", "editor");

export const isStaffOrAbove: Access = ({ req: { user } }) =>
  hasRole(user, "ceo", "editor", "staff");
