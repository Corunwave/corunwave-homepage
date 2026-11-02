import { ContactInquiryValidationError } from "../error/ContactInquiryValidationError";
import { validateInquiry, type InquiryInput } from "./contactInquiryRules";

export type InquiryStatus = "received" | "in_progress" | "done";
export type EmailStatus = "pending" | "sent" | "failed";

export type ContactInquiryProps = {
  id: number | null;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string | null;
  status: InquiryStatus;
  emailStatus: EmailStatus;
  emailError: string | null;
  consentedAt: Date;
  ipAddress: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

/* 문의하기 form 한 건. State changes return a new instance. */
export class ContactInquiryEntity {
  private constructor(readonly props: Readonly<ContactInquiryProps>) {}

  /* Validates a fresh submission; throws ContactInquiryValidationError. */
  static create(
    input: InquiryInput,
    ipAddress: string | null,
    now: Date = new Date(),
  ) {
    const errors = validateInquiry(input);
    if (Object.keys(errors).length > 0)
      throw new ContactInquiryValidationError(errors);
    return new ContactInquiryEntity({
      id: null,
      name: input.name,
      company: input.company,
      email: input.email,
      phone: input.phone,
      message: input.message || null,
      status: "received",
      emailStatus: "pending",
      emailError: null,
      consentedAt: now,
      ipAddress,
      createdAt: null,
      updatedAt: null,
    });
  }

  /* Rebuilds a stored row; skips validation because the DB already holds it. */
  static restore(props: ContactInquiryProps) {
    return new ContactInquiryEntity(props);
  }

  markEmailSent() {
    return new ContactInquiryEntity({
      ...this.props,
      emailStatus: "sent",
      emailError: null,
    });
  }

  markEmailFailed(reason: string) {
    return new ContactInquiryEntity({
      ...this.props,
      emailStatus: "failed",
      emailError: reason,
    });
  }

  changeStatus(status: InquiryStatus) {
    return new ContactInquiryEntity({ ...this.props, status });
  }
}
