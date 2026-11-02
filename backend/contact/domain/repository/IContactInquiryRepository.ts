import type {
  ContactInquiryEntity,
  EmailStatus,
  InquiryStatus,
} from "../entity/ContactInquiryEntity";

export type FindContactInquiriesQuery = {
  status?: InquiryStatus;
  limit: number;
  offset: number;
};

export interface IContactInquiryRepository {
  /* Persists a new inquiry and returns it with id and timestamps filled in. */
  create(inquiry: ContactInquiryEntity): Promise<ContactInquiryEntity>;
  findById(id: number): Promise<ContactInquiryEntity | null>;
  /* Newest first. */
  findAll(query: FindContactInquiriesQuery): Promise<ContactInquiryEntity[]>;
  updateStatus(id: number, status: InquiryStatus): Promise<void>;
  updateEmailDelivery(
    id: number,
    emailStatus: EmailStatus,
    emailError?: string,
  ): Promise<void>;
}
