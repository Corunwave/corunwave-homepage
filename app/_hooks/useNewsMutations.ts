"use client";

import axios from "axios";
import { useState } from "react";
import {
  deleteNews,
  patchNews,
  postNews,
  toNewsFieldErrors,
  type NewsDetail,
  type NewsFieldErrors,
  type NewsPayload,
} from "@/app/_lib/api/newsApi";

export type NewsWriteStatus = "idle" | "sending" | "done" | "failed";
export type NewsWriteResult<T = undefined> = {
  ok: boolean;
  data?: T;
  fieldErrors?: NewsFieldErrors;
  /** 401/403: 로그인하지 않았거나 대표·에디터가 아님 */
  forbidden?: boolean;
};

/* 요청 하나를 실행하고 status와 결과(400 필드 에러, 401/403)를 정리하는 공통 훅. */
const useWrite = <A extends unknown[], T>(run: (...args: A) => Promise<T>) => {
  const [status, setStatus] = useState<NewsWriteStatus>("idle");

  const submit = async (...args: A): Promise<NewsWriteResult<T>> => {
    if (status === "sending") return { ok: false };
    setStatus("sending");
    try {
      const data = await run(...args);
      setStatus("done");
      return { ok: true, data };
    } catch (error) {
      setStatus("failed");
      if (axios.isAxiosError(error)) {
        const code = error.response?.status;
        if (code === 400) return { ok: false, fieldErrors: toNewsFieldErrors(error.response?.data) };
        if (code === 401 || code === 403) return { ok: false, forbidden: true };
      }
      return { ok: false };
    }
  };

  return { status, submit };
};

export const useCreateNews = () =>
  useWrite<[NewsPayload], NewsDetail>((payload) => postNews(payload));

export const useUpdateNews = () =>
  useWrite<[number, Partial<NewsPayload>], NewsDetail>((id, payload) =>
    patchNews(id, payload),
  );

export const useDeleteNews = () =>
  useWrite<[number], void>((id) => deleteNews(id));
