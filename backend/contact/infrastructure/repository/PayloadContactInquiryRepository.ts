import "server-only";
import type { Payload } from "payload";
import type {
  ContactInquiryEntity,
  EmailStatus,
  InquiryStatus,
} from "../../domain/entity/ContactInquiryEntity";
import type {
  FindContactInquiriesQuery,
  IContactInquiryRepository,
} from "../../domain/repository/IContactInquiryRepository";
import {
  toCreateData,
  toEntity,
  type ContactInquiryDoc,
} from "./ContactInquiryDocMapper";

const COLLECTION = "contact-inquiries";

export class PayloadContactInquiryRepository implements IContactInquiryRepository {
  /* Payload is resolved on first query, so input validation can fail fast before the database is touched. */
  constructor(private readonly resolvePayload: () => Promise<Payload>) {}

  async create(inquiry: ContactInquiryEntity) {
    const payload = await this.resolvePayload();
    const doc = await payload.create({
      collection: COLLECTION,
      data: toCreateData(inquiry),
      depth: 0,
    });
    return toEntity(doc as unknown as ContactInquiryDoc);
  }

  async findById(id: number) {
    const payload = await this.resolvePayload();
    const { docs } = await payload.find({
      collection: COLLECTION,
      where: { id: { equals: id } },
      limit: 1,
      depth: 0,
    });
    const doc = docs[0] as unknown as ContactInquiryDoc | undefined;
    return doc ? toEntity(doc) : null;
  }

  async findAll({ status, limit, offset }: FindContactInquiriesQuery) {
    const payload = await this.resolvePayload();
    const { docs } = await payload.find({
      collection: COLLECTION,
      where: status ? { status: { equals: status } } : undefined,
      sort: "-createdAt",
      limit,
      // Payload pages by number; offset is expected to be a multiple of limit.
      page: Math.floor(offset / limit) + 1,
      depth: 0,
    });
    return (docs as unknown as ContactInquiryDoc[]).map(toEntity);
  }

  async updateStatus(id: number, status: InquiryStatus) {
    const payload = await this.resolvePayload();
    await payload.update({ collection: COLLECTION, id, data: { status }, depth: 0 });
  }

  async updateEmailDelivery(id: number, emailStatus: EmailStatus, emailError?: string) {
    const payload = await this.resolvePayload();
    await payload.update({
      collection: COLLECTION,
      id,
      data: { emailStatus, emailError: emailError ?? null },
      depth: 0,
    });
  }
}
