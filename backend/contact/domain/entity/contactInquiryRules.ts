/* Pure rules, no server-only imports: ContactForm (browser) and ContactInquiryEntity (server) share them. */
export type InquiryInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
};

export type InquiryField = keyof InquiryInput;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const INQUIRY_LIMITS = {
  name: 50,
  company: 50,
  email: 254,
  phone: 30,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s-]+$/;

const REQUIRED_MESSAGE = "이 입력칸을 작성해주세요";

const validateText = (value: string, max: number) => {
  if (!value) return REQUIRED_MESSAGE;
  if (value.length > max) return `${max}자 이내로 작성해주세요.`;
  return "";
};

/* Shared by ContactForm (instant feedback) and POST /api/contact (authoritative); copy matches the preview's contact-form.js. */
export const validateInquiryField = (
  field: InquiryField,
  input: InquiryInput,
) => {
  switch (field) {
    case "name":
    case "company":
      return validateText(input[field], INQUIRY_LIMITS[field]);
    case "email": {
      const error = validateText(input.email, INQUIRY_LIMITS.email);
      if (error) return error;
      return EMAIL_PATTERN.test(input.email) ? "" : "이메일 형식을 확인해주세요.";
    }
    case "phone": {
      if (!input.phone) return REQUIRED_MESSAGE;
      if (input.phone.length > INQUIRY_LIMITS.phone)
        return "전화번호 형식을 확인해주세요.";
      const digits = input.phone.replace(/\D/g, "");
      return PHONE_PATTERN.test(input.phone) &&
        digits.length >= 7 &&
        digits.length <= 15
        ? ""
        : "전화번호 형식을 확인해주세요.";
    }
    case "message":
      return input.message.length > INQUIRY_LIMITS.message
        ? `${INQUIRY_LIMITS.message}자 이내로 작성해주세요.`
        : "";
    case "consent":
      return input.consent ? "" : "개인정보 수집 및 이용에 동의해주세요.";
  }
};

const FIELDS: readonly InquiryField[] = [
  "name",
  "company",
  "email",
  "phone",
  "message",
  "consent",
];

export const validateInquiry = (input: InquiryInput): InquiryErrors => {
  const errors: InquiryErrors = {};
  for (const field of FIELDS) {
    const error = validateInquiryField(field, input);
    if (error) errors[field] = error;
  }
  return errors;
};
