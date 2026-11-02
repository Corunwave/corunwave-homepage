import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
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
  toEntity,
  toInsertRow,
  type ContactInquiryRow,
} from "./ContactInquiryRowMapper";

const TABLE = "contact_inquiries";

export class SupabaseContactInquiryRepository
  implements IContactInquiryRepository
{
  /* Client is resolved on first query, so input validation can fail fast before any Supabase env is needed. */
  constructor(private readonly resolveClient: () => SupabaseClient) {}

  private get client() {
    return this.resolveClient();
  }

  async create(inquiry: ContactInquiryEntity) {
    const { data, error } = await this.client
      .from(TABLE)
      .insert(toInsertRow(inquiry))
      .select()
      .single<ContactInquiryRow>();
    if (error) throw error;
    return toEntity(data);
  }

  async findById(id: number) {
    const { data, error } = await this.client
      .from(TABLE)
      .select()
      .eq("id", id)
      .maybeSingle<ContactInquiryRow>();
    if (error) throw error;
    return data ? toEntity(data) : null;
  }

  async findAll({ status, limit, offset }: FindContactInquiriesQuery) {
    let query = this.client.from(TABLE).select();
    if (status) query = query.eq("status", status);
    const { data, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)
      .returns<ContactInquiryRow[]>();
    if (error) throw error;
    return data.map(toEntity);
  }

  async updateStatus(id: number, status: InquiryStatus) {
    const { error } = await this.client
      .from(TABLE)
      .update({ status })
      .eq("id", id);
    if (error) throw error;
  }

  async updateEmailDelivery(
    id: number,
    emailStatus: EmailStatus,
    emailError?: string,
  ) {
    const { error } = await this.client
      .from(TABLE)
      .update({ email_status: emailStatus, email_error: emailError ?? null })
      .eq("id", id);
    if (error) throw error;
  }
}
