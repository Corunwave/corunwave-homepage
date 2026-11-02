import { ContactInquiryEntity } from "../../domain/entity/ContactInquiryEntity";
import type { IContactInquiryRepository } from "../../domain/repository/IContactInquiryRepository";
import type { ContactInquiryResultDto } from "../dto/ContactInquiryResultDto";
import type { SubmitContactInquiryDto } from "../dto/SubmitContactInquiryDto";

export class SubmitContactInquiryUseCase {
  constructor(private readonly repository: IContactInquiryRepository) {}

  /* Throws ContactInquiryValidationError for bad input; any other error means the inquiry was not stored. */
  async execute(
    dto: SubmitContactInquiryDto,
    context: { ipAddress: string | null },
  ): Promise<ContactInquiryResultDto> {
    const inquiry = ContactInquiryEntity.create(dto, context.ipAddress);
    const saved = await this.repository.create(inquiry);
    if (saved.props.id === null)
      throw new Error("Repository returned an inquiry without an id");
    return { id: saved.props.id };
  }
}
