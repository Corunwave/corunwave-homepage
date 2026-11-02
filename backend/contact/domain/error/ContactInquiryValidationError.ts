import type { InquiryErrors } from "../entity/contactInquiryRules";

export class ContactInquiryValidationError extends Error {
  constructor(readonly errors: InquiryErrors) {
    super("Invalid contact inquiry");
    this.name = "ContactInquiryValidationError";
  }
}
