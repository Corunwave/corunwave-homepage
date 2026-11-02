import {
  ContactInquiryEntity,
  type EmailStatus,
  type InquiryStatus,
} from "../../domain/entity/ContactInquiryEntity";

/* public.contact_inquiries row as returned by supabase-js. */
export type ContactInquiryRow = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string | null;
  status: InquiryStatus;
  email_status: EmailStatus;
  email_error: string | null;
  consented_at: string;
  ip_address: string | null;
  created_at: string;
  updated_at: string;
};

/* Columns the database fills in itself (id, timestamps) are left out of inserts. */
export type ContactInquiryInsertRow = Omit<
  ContactInquiryRow,
  "id" | "created_at" | "updated_at"
>;

export const toInsertRow = (
  inquiry: ContactInquiryEntity,
): ContactInquiryInsertRow => ({
  name: inquiry.props.name,
  company: inquiry.props.company,
  email: inquiry.props.email,
  phone: inquiry.props.phone,
  message: inquiry.props.message,
  status: inquiry.props.status,
  email_status: inquiry.props.emailStatus,
  email_error: inquiry.props.emailError,
  consented_at: inquiry.props.consentedAt.toISOString(),
  ip_address: inquiry.props.ipAddress,
});

export const toEntity = (row: ContactInquiryRow) =>
  ContactInquiryEntity.restore({
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    message: row.message,
    status: row.status,
    emailStatus: row.email_status,
    emailError: row.email_error,
    consentedAt: new Date(row.consented_at),
    ipAddress: row.ip_address,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  });
