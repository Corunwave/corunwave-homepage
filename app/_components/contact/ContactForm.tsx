"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { useSubmitContactInquiry } from "@/app/_hooks/useSubmitContactInquiry";
import {
  validateInquiry,
  validateInquiryField,
  type InquiryErrors,
  type InquiryField,
  type InquiryInput,
} from "@/backend/contact/domain/entity/contactInquiryRules";

type RequiredField = "name" | "company" | "email" | "phone" | "consent";
type Errors = InquiryErrors;

const TEXT_FIELDS = [
  {
    name: "name",
    label: "이름",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "company",
    label: "회사명",
    type: "text",
    autoComplete: "organization",
    placeholder: "회사명을 적어주세요",
  },
  {
    name: "email",
    label: "이메일",
    type: "email",
    autoComplete: "email",
    inputMode: "email",
    placeholder: "이메일을 적어주세요",
  },
  {
    name: "phone",
    label: "전화번호",
    type: "tel",
    autoComplete: "tel",
    inputMode: "tel",
    placeholder: "전화번호를 적어주세요",
  },
] as const;

const REQUIRED_FIELDS: readonly RequiredField[] = [
  ...TEXT_FIELDS.map(({ name }) => name),
  "consent",
];

const SUCCESS_MESSAGE =
  "문의가 접수되었습니다. 3 영업일 이내로 회신드리겠습니다.";
const FAILURE_MESSAGE =
  "문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.";

const isRequiredField = (name: string): name is RequiredField =>
  (REQUIRED_FIELDS as readonly string[]).includes(name);

const readInquiry = (form: HTMLFormElement): InquiryInput => {
  const data = new FormData(form);
  const text = (key: string) => String(data.get(key) ?? "").trim();
  return {
    name: text("name"),
    company: text("company"),
    email: text("email"),
    phone: text("phone"),
    message: text("message"),
    consent: data.get("consent") === "on",
  };
};

/* Contact form "고객문의" (preview #contact-form). Client component: validation runs after the first submit; a valid submit POSTs to /api/contact. */
const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [attempted, setAttempted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const { status, submit } = useSubmitContactInquiry();

  const fieldOf = (name: InquiryField) =>
    formRef.current?.elements.namedItem(name) as HTMLInputElement | null;

  const revalidate = (target: EventTarget) => {
    if (!attempted || !(target instanceof HTMLInputElement)) return;
    if (!isRequiredField(target.name) || !formRef.current) return;
    const name = target.name;
    const error = validateInquiryField(name, readInquiry(formRef.current));
    setErrors((current) => ({ ...current, [name]: error }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    setAttempted(true);
    const inquiry = readInquiry(form);
    const nextErrors = validateInquiry(inquiry);
    setErrors(nextErrors);
    const firstInvalid = (
      ["name", "company", "email", "phone", "message", "consent"] as const
    ).find((name) => nextErrors[name]);
    if (firstInvalid) {
      fieldOf(firstInvalid)?.focus();
      return;
    }

    const result = await submit({
      ...inquiry,
      website: String(new FormData(form).get("website") ?? ""),
    });
    if (result.ok) {
      form.reset();
      setAttempted(false);
      setErrors({});
    } else if (result.fieldErrors) {
      setErrors(result.fieldErrors);
    }
  };

  return (
    <form
      ref={formRef}
      className="contact-form"
      aria-label="고객문의"
      noValidate
      onSubmit={handleSubmit}
      onInput={(event) => revalidate(event.target)}
      onBlur={(event) => revalidate(event.target)}
    >
      {TEXT_FIELDS.map((field) => {
        const id = `contact-${field.name}`;
        const error = errors[field.name];
        return (
          <div key={field.name} className="contact-field">
            <label className="contact-label" htmlFor={id}>
              {field.label}{" "}
              <span className="contact-required" aria-hidden="true">
                *
              </span>
            </label>
            <input
              className="contact-input"
              id={id}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              inputMode={"inputMode" in field ? field.inputMode : undefined}
              placeholder={"placeholder" in field ? field.placeholder : undefined}
              required
              aria-invalid={attempted ? Boolean(error) : undefined}
              aria-describedby={`${id}-error`}
            />
            <p className="contact-error" id={`${id}-error`} hidden={!error}>
              {error}
            </p>
          </div>
        );
      })}
      <div className="contact-field">
        <label className="contact-label" htmlFor="contact-message">
          문의사항
        </label>
        <textarea
          className="contact-input contact-input--textarea"
          id="contact-message"
          name="message"
          placeholder="구체적인 문의 내용을 자유롭게 작성하는 공간입니다."
          aria-invalid={attempted ? Boolean(errors.message) : undefined}
          aria-describedby="contact-message-error"
        />
        <p
          className="contact-error"
          id="contact-message-error"
          hidden={!errors.message}
        >
          {errors.message}
        </p>
      </div>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">웹사이트</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="contact-field">
        <label className="contact-consent" htmlFor="contact-consent">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={attempted ? Boolean(errors.consent) : undefined}
            aria-describedby="contact-consent-error"
            onChange={(event) => revalidate(event.target)}
          />
          <span>
            <Link href="/privacy-policy" target="_blank">
              개인정보 수집 및 이용
            </Link>
            에 동의합니다.{" "}
            <span className="contact-required" aria-hidden="true">
              *
            </span>
          </span>
        </label>
        <p
          className="contact-error"
          id="contact-consent-error"
          hidden={!errors.consent}
        >
          {errors.consent}
        </p>
      </div>
      <button
        className="contact-submit"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "전송 중…" : "문의하기"}
      </button>
      <p
        className="contact-status"
        data-state={status === "failed" ? "error" : "success"}
        role="status"
        hidden={status !== "done" && status !== "failed"}
      >
        {status === "done" ? SUCCESS_MESSAGE : FAILURE_MESSAGE}
      </p>
    </form>
  );
};

export default ContactForm;
