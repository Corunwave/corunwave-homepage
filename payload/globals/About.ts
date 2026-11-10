import type { GlobalConfig } from "payload";
import { isCeoOrEditor } from "../access/roles";
import { CMS_TAGS } from "../hooks/revalidate";
import { revalidateOnChange } from "../lib/globalHooks";
import { fixedRowsField, linesField, TEXT_HINT, textareaField, textField } from "../lib/fields";

export const About: GlobalConfig = {
  slug: "about",
  label: "회사소개",
  admin: { group: "페이지", description: `회사소개 페이지 본문입니다. ${TEXT_HINT}` },
  access: { read: () => true, update: isCeoOrEditor },
  hooks: revalidateOnChange(CMS_TAGS.about),
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "페이지 소개",
          fields: [
            {
              name: "page",
              label: "페이지 소개",
              type: "group",
              fields: [textField("title", "제목"), textareaField("description", "설명")],
            },
          ],
        },
        {
          label: "대표 인사말",
          fields: [
            {
              name: "ceoMessage",
              label: "대표 인사말",
              type: "group",
              fields: [
                textField("title", "제목"),
                linesField("paragraphs", "문단", { multiline: true, minRows: 1 }),
                textField("role", "직함"),
                textField("name", "이름"),
              ],
            },
          ],
        },
        {
          label: "사업 방향",
          fields: [
            {
              name: "businessDirection",
              label: "사업 방향",
              type: "group",
              fields: [
                {
                  name: "titleLines",
                  label: "제목(줄 단위)",
                  type: "array",
                  labels: { singular: "줄", plural: "줄" },
                  admin: { description: "한 줄에 들어갈 구절들입니다. 구절 안에서는 줄이 바뀌지 않습니다." },
                  fields: [linesField("phrases", "구절", { minRows: 1 })],
                },
                textareaField("descriptionLead", "설명 앞부분"),
                textField("descriptionEmphasis", "설명 강조 문구"),
                textField("descriptionTail", "설명 뒷부분", {
                  admin: { description: "맨 앞의 공백은 의도된 것입니다. 지우지 마세요." },
                }),
                {
                  name: "values",
                  label: "핵심 가치",
                  type: "array",
                  labels: { singular: "가치", plural: "가치" },
                  fields: [textField("title", "제목"), textareaField("body", "내용")],
                },
              ],
            },
          ],
        },
        {
          label: "핵심과제",
          fields: [
            {
              name: "coreChallenges",
              label: "핵심과제",
              type: "group",
              fields: [
                textField("title", "제목"),
                textField("navLabel", "선택 영역 이름(화면 낭독용)"),
                fixedRowsField(
                  "challenges",
                  "과제",
                  [
                    { value: "internalization", label: "기술 내재화" },
                    { value: "orchestration", label: "전략적 조율" },
                    { value: "continuity", label: "지속 가능성" },
                  ],
                  [textField("title", "제목"), textareaField("body", "내용")],
                ),
              ],
            },
          ],
        },
        {
          label: "기업 가치",
          fields: [
            {
              name: "companyValues",
              label: "기업 가치",
              type: "group",
              fields: [
                linesField("titleLines", "제목(줄 단위)", { minRows: 1 }),
                textField("intro", "소개"),
                fixedRowsField(
                  "values",
                  "가치",
                  [
                    { value: "cooperation", label: "Cooperation" },
                    { value: "run", label: "Run" },
                    { value: "wave", label: "Wave" },
                  ],
                  [textField("en", "영문"), textField("ko", "한글"), textareaField("description", "설명")],
                ),
              ],
            },
          ],
        },
      ],
    },
  ],
};
