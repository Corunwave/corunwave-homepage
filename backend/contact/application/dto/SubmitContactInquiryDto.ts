import type { InquiryInput } from "../../domain/entity/contactInquiryRules";

export type SubmitContactInquiryDto = InquiryInput;

const asTrimmedString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

/* Normalizes untrusted JSON; non-strings become empty so they fail validation. */
export const toSubmitContactInquiryDto = (
  raw: unknown,
): SubmitContactInquiryDto => {
  const body = (typeof raw === "object" && raw !== null ? raw : {}) as Record<
    string,
    unknown
  >;
  return {
    name: asTrimmedString(body.name),
    company: asTrimmedString(body.company),
    email: asTrimmedString(body.email),
    phone: asTrimmedString(body.phone),
    message: asTrimmedString(body.message),
    consent: body.consent === true,
  };
};
