import type { GlobalConfig } from "payload";
import { isCeoOrEditor } from "../access/roles";
import { fixedRowsField, linesField, TEXT_HINT, textareaField, textField } from "../lib/fields";
import { CMS_TAGS } from "../hooks/revalidate";
import { revalidateOnChange } from "../lib/globalHooks";

export const Home: GlobalConfig = {
  slug: "home",
  label: "홈",
  admin: { group: "페이지", description: `홈페이지 본문입니다. ${TEXT_HINT}` },
  access: { read: () => true, update: isCeoOrEditor },
  hooks: revalidateOnChange(CMS_TAGS.home),
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "첫 화면",
          fields: [
            {
              name: "hero",
              label: "첫 화면",
              type: "group",
              fields: [
                textareaField("title", "제목"),
                textareaField("description", "설명"),
                {
                  name: "cta",
                  label: "버튼",
                  type: "group",
                  fields: [textField("label", "문구"), textField("href", "연결 주소")],
                },
              ],
            },
          ],
        },
        {
          label: "제안 대상",
          fields: [
            {
              name: "proposalTargets",
              label: "제안 대상",
              type: "group",
              fields: [
                textField("title", "제목"),
                textareaField("description", "설명"),
                fixedRowsField(
                  "cards",
                  "카드",
                  [
                    { value: "enterprise", label: "대기업·중견기업" },
                    { value: "public", label: "공공·정부기관" },
                    { value: "university", label: "대학교" },
                    { value: "startup", label: "스타트업·중소기업" },
                  ],
                  [textField("tags", "태그"), textareaField("title", "제목"), textareaField("description", "설명")],
                ),
                {
                  name: "explanation",
                  label: "하단 안내",
                  type: "group",
                  fields: [
                    textareaField("title", "제목"),
                    textareaField("description", "설명"),
                    {
                      name: "link",
                      label: "링크",
                      type: "group",
                      fields: [textField("label", "문구"), textField("href", "연결 주소")],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "솔루션 소개",
          fields: [
            {
              name: "solutions",
              label: "솔루션 소개",
              type: "group",
              fields: [
                textareaField("title", "제목"),
                textareaField("description", "설명"),
                textField("processLabel", "단계 영역 이름(화면 낭독용)"),
                textareaField("axLabel", "AX 열 이름"),
                textareaField("learningLabel", "Learning 열 이름"),
                {
                  name: "stages",
                  label: "단계",
                  type: "array",
                  labels: { singular: "단계", plural: "단계" },
                  fields: [
                    textField("name", "단계 이름"),
                    textareaField("ax", "AX Infra 내용"),
                    textareaField("learning", "Learning 내용"),
                  ],
                },
                fixedRowsField(
                  "solutions",
                  "솔루션 카드",
                  [
                    { value: "ax-infra", label: "AX Infra" },
                    { value: "learning", label: "Learning Service" },
                  ],
                  [
                    textareaField("title", "제목"),
                    textareaField("description", "설명"),
                    linesField("items", "항목", { description: "맨 앞의 • 기호도 직접 입력합니다." }),
                  ],
                ),
              ],
            },
          ],
        },
        {
          label: "서비스 가치",
          fields: [
            {
              name: "serviceValues",
              label: "서비스 가치",
              type: "group",
              fields: [
                textField("title", "제목"),
                textareaField("intro", "소개"),
                fixedRowsField(
                  "values",
                  "가치",
                  [
                    { value: "trust", label: "TRUST" },
                    { value: "insight", label: "INSIGHT" },
                    { value: "partnership", label: "PARTNERSHIP" },
                  ],
                  [textField("word", "영문"), textField("title", "한글"), textareaField("description", "설명")],
                ),
              ],
            },
          ],
        },
        {
          label: "자료 다운로드",
          fields: [
            {
              name: "downloads",
              label: "자료 다운로드",
              type: "group",
              admin: { description: "버튼과 PDF 파일은 '파일 > 다운로드 자료' 메뉴에서 관리합니다." },
              fields: [
                textField("title", "제목"),
                textareaField("description", "설명"),
              ],
            },
          ],
        },
      ],
    },
  ],
};
