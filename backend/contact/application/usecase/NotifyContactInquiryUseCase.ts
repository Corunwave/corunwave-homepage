import type { IContactInquiryNotifier } from "../../domain/notifier/IContactInquiryNotifier";
import type { IContactInquiryRepository } from "../../domain/repository/IContactInquiryRepository";

const reasonOf = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

export class NotifyContactInquiryUseCase {
  constructor(
    private readonly repository: IContactInquiryRepository,
    private readonly notifier: IContactInquiryNotifier,
  ) {}

  /* Never throws: the inquiry is already stored, so delivery trouble is only recorded on its email status. */
  async execute(id: number): Promise<void> {
    try {
      const inquiry = await this.repository.findById(id);
      if (!inquiry) {
        console.error("[contact] notify: inquiry not found", id);
        return;
      }
      let failure: string | null = null;
      try {
        await this.notifier.notify(inquiry);
      } catch (error) {
        console.error("[contact] mail failed", id, error);
        failure = reasonOf(error);
      }
      if (failure === null) await this.repository.updateEmailDelivery(id, "sent");
      else await this.repository.updateEmailDelivery(id, "failed", failure);
    } catch (error) {
      console.error("[contact] notify failed", id, error);
    }
  }
}
