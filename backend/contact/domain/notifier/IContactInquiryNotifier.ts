import type { ContactInquiryEntity } from "../entity/ContactInquiryEntity";

export interface IContactInquiryNotifier {
  /* Delivers the inquiry to the CEO; rejects when delivery fails. */
  notify(inquiry: ContactInquiryEntity): Promise<void>;
}
