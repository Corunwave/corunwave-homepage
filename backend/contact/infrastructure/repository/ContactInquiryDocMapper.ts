import {
  ContactInquiryEntity,
  type EmailStatus,
  type InquiryStatus,
} from "../../domain/entity/ContactInquiryEntity";

/* `contact-inquiries` document as returned by the Payload Local API. */
export type ContactInquiryDoc = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  message?: string | null;
  status: InquiryStatus;
  emailStatus: EmailStatus;
  emailError?: string | null;
  consentedAt: string;
  ipAddress?: string | null;
  createdAt: string;
  updatedAt: string;
};

/* id and timestamps are filled in by Payload, so they are left out of creates. */
export type ContactInquiryCreateData = Omit<ContactInquiryDoc, "id" | "createdAt" | "updatedAt">;

export const toCreateData = (inquiry: ContactInquiryEntity): ContactInquiryCreateData => ({
  name: inquiry.props.name,
  company: inquiry.props.company,
  email: inquiry.props.email,
  phone: inquiry.props.phone,
  message: inquiry.props.message,
  status: inquiry.props.status,
  emailStatus: inquiry.props.emailStatus,
  emailError: inquiry.props.emailError,
  consentedAt: inquiry.props.consentedAt.toISOString(),
  ipAddress: inquiry.props.ipAddress,
});

export const toEntity = (doc: ContactInquiryDoc) =>
  ContactInquiryEntity.restore({
    id: doc.id,
    name: doc.name,
    company: doc.company,
    email: doc.email,
    phone: doc.phone,
    message: doc.message ?? null,
    status: doc.status,
    emailStatus: doc.emailStatus,
    emailError: doc.emailError ?? null,
    consentedAt: new Date(doc.consentedAt),
    ipAddress: doc.ipAddress ?? null,
    createdAt: new Date(doc.createdAt),
    updatedAt: new Date(doc.updatedAt),
  });
