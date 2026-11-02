"use client";

import axios from "axios";
import { useState } from "react";
import {
  postContactInquiry,
  type ContactInquiryErrorBody,
  type ContactInquiryPayload,
} from "@/app/_lib/api/contactApi";
import type { InquiryErrors } from "@/backend/contact/domain/entity/contactInquiryRules";

export type SubmitStatus = "idle" | "sending" | "done" | "failed";
export type SubmitResult = { ok: boolean; fieldErrors?: InquiryErrors };

/* Submits the contact form through POST /api/contact; a 400 hands back the server's per-field errors. */
export const useSubmitContactInquiry = () => {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const submit = async (
    payload: ContactInquiryPayload,
  ): Promise<SubmitResult> => {
    if (status === "sending") return { ok: false };
    setStatus("sending");
    try {
      await postContactInquiry(payload);
      setStatus("done");
      return { ok: true };
    } catch (error) {
      setStatus("failed");
      if (axios.isAxiosError<ContactInquiryErrorBody>(error)) {
        if (error.response?.status === 400)
          return { ok: false, fieldErrors: error.response.data?.errors };
      }
      return { ok: false };
    }
  };

  return { status, submit };
};
