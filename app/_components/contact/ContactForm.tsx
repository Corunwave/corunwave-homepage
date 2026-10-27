"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";

type RequiredField = "name" | "company" | "email" | "phone" | "consent";
type Errors = Partial<Record<RequiredField, string>>;

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

const PREPARING_MESSAGE = "문의하기 기능은 준비 중입니다.";

const isRequiredField = (name: string): name is RequiredField =>
  (REQUIRED_FIELDS as readonly string[]).includes(name);

/* Same rules and copy as the preview's assets/contact/contact-form.js. */
const validateField = (field: HTMLInputElement) => {
  if (field.type === "checkbox")
    return field.checked ? "" : "개인정보 수집 및 이용에 동의해주세요.";
  const value = field.value.trim();
  if (!value) return "이 입력칸을 작성해주세요";
  if (field.type === "email" && field.validity.typeMismatch)
    return "이메일 형식을 확인해주세요.";
  if (field.type === "tel") {
    const digits = value.replace(/\D/g, "");
    if (
      !/^\+?[0-9\s-]+$/.test(value) ||
      digits.length < 7 ||
      digits.length > 15
    )
      return "전화번호 형식을 확인해주세요.";
  }
  return "";
};

/* Contact form "고객문의" (preview #contact-form). Client component: validation runs after the first submit; a valid submit logs the values and alerts that sending is not ready. */
const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [attempted, setAttempted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const fieldOf = (name: RequiredField) =>
    formRef.current?.elements.namedItem(name) as HTMLInputElement | null;

  const revalidate = (target: EventTarget) => {
    if (!attempted || !(target instanceof HTMLInputElement)) return;
    if (!isRequiredField(target.name)) return;
    const name = target.name;
    setErrors((current) => ({ ...current, [name]: validateField(target) }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const nextErrors: Errors = {};
    for (const name of REQUIRED_FIELDS) {
      const field = fieldOf(name);
      if (field) nextErrors[name] = validateField(field);
    }
    setErrors(nextErrors);
    const firstInvalid = REQUIRED_FIELDS.find((name) => nextErrors[name]);
    if (firstInvalid) {
      fieldOf(firstInvalid)?.focus();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log("[contact] submit", {
      name: data.get("name"),
      company: data.get("company"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
      consent: data.get("consent") === "on",
    });
    alert(PREPARING_MESSAGE);
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
      <button className="contact-submit" type="submit">
        문의하기
      </button>
    </form>
  );
};

export default ContactForm;
