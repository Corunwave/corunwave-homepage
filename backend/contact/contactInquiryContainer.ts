import "server-only";
import { createSupabaseAdmin } from "@/backend/shared/infrastructure/supabaseAdmin";
import { NotifyContactInquiryUseCase } from "./application/usecase/NotifyContactInquiryUseCase";
import { SubmitContactInquiryUseCase } from "./application/usecase/SubmitContactInquiryUseCase";
import { ResendContactInquiryNotifier } from "./infrastructure/notifier/ResendContactInquiryNotifier";
import { SupabaseContactInquiryRepository } from "./infrastructure/repository/SupabaseContactInquiryRepository";

const requireEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

const createRepository = () =>
  new SupabaseContactInquiryRepository(createSupabaseAdmin);

/* Composition root: the only place that knows which concrete classes back the interfaces. */
export const createSubmitContactInquiryUseCase = () =>
  new SubmitContactInquiryUseCase(createRepository());

export const createNotifyContactInquiryUseCase = () =>
  new NotifyContactInquiryUseCase(
    createRepository(),
    new ResendContactInquiryNotifier(() => ({
      apiKey: requireEnv("RESEND_API_KEY"),
      from: requireEnv("CONTACT_MAIL_FROM"),
      to: requireEnv("CONTACT_MAIL_TO"),
    })),
  );
