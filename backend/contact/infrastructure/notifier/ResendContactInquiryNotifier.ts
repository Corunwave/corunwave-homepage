import "server-only";
import { Resend } from "resend";
import type { ContactInquiryEntity } from "../../domain/entity/ContactInquiryEntity";
import type { IContactInquiryNotifier } from "../../domain/notifier/IContactInquiryNotifier";

export type ResendNotifierConfig = {
  apiKey: string;
  from: string;
  to: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/* Strip CR/LF so user input can never inject mail headers through the subject. */
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ");

const rowsOf = ({ props }: ContactInquiryEntity) =>
  [
    ["이름", props.name],
    ["회사명", props.company],
    ["이메일", props.email],
    ["전화번호", props.phone],
    ["문의사항", props.message || "(없음)"],
  ] as const;

export class ResendContactInquiryNotifier implements IContactInquiryNotifier {
  /* Config is resolved per call, so missing mail env fails the delivery (recorded as failed), not the stored inquiry. */
  constructor(private readonly resolveConfig: () => ResendNotifierConfig) {}

  async notify(inquiry: ContactInquiryEntity) {
    const { apiKey, from, to } = this.resolveConfig();
    const { id, company, name, email } = inquiry.props;
    const rows = rowsOf(inquiry);
    const html = `<h2>홈페이지 문의 #${id}</h2><table cellpadding="8" style="border-collapse:collapse">${rows
      .map(
        ([label, value]) =>
          `<tr><th align="left" valign="top" style="border:1px solid #ddd">${label}</th><td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
      )
      .join("")}</table>`;
    const text = [
      `홈페이지 문의 #${id}`,
      ...rows.map(([label, value]) => `${label}: ${value}`),
    ].join("\n");

    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject: `[홈페이지 문의] ${singleLine(company)} ${singleLine(name)}`,
      html,
      text,
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
  }
}
