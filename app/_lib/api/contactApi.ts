import type {
  InquiryErrors,
  InquiryInput,
} from "@/backend/contact/domain/entity/contactInquiryRules";
import { httpClient } from "./httpClient";

/* `website` is the honeypot field; real users leave it empty. */
export type ContactInquiryPayload = InquiryInput & { website: string };

export type ContactInquiryErrorBody = {
  ok: false;
  errors?: InquiryErrors;
  message?: string;
};

export const postContactInquiry = async (payload: ContactInquiryPayload) => {
  const { data } = await httpClient.post<{ ok: true; id?: number }>(
    "/contact",
    payload,
  );
  return data;
};
