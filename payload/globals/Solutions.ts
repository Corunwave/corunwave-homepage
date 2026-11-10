import type { GlobalConfig } from "payload";
import { isCeoOrEditor } from "../access/roles";
import { CMS_TAGS } from "../hooks/revalidate";
import { globalVersions, revalidateOnChange } from "../lib/globalHooks";
import {
  bulletsField,
  fixedRowsField,
  linesField,
  TEXT_HINT,
  textareaField,
  textField,
  fittedTableName,
} from "../lib/fields";

const AX_SERVICES = [
  { value: "arm-server", label: "Arm Based 서버" },
  { value: "data-security", label: "데이터 저장 및 보안" },
  { value: "network-security", label: "네트워크 보안" },
  { value: "erp", label: "ERP" },
  { value: "media-synthesis", label: "미디어 합성" },
  { value: "esg", label: "ESG" },
  { value: "app-dev", label: "앱 개발" },
  { value: "ito", label: "IT 아웃소싱(ITO)" },
] as const;

export const Solutions: GlobalConfig = {
  slug: "solutions",
  label: "솔루션",
  admin: { group: "페이지", description: `솔루션 페이지 본문입니다. ${TEXT_HINT}` },
  access: { read: () => true, update: isCeoOrEditor },
  versions: globalVersions,
  hooks: revalidateOnChange(CMS_TAGS.solutions),
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
          label: "AX Infra",
          fields: [
            {
              name: "axInfra",
              label: "AX Infra",
              type: "group",
              fields: [
                textField("title", "제목"),
                textareaField("intro", "소개"),
                linesField("flow", "진행 단계", {
                  minRows: 3,
                  maxRows: 3,
                  multiline: true,
                  description: "3단계 흐름도에 표시됩니다.",
                }),
                textField("internalLabel", "내부망 라벨"),
                textField("externalLabel", "외부망 라벨"),
                textareaField("aiEnvironment", "AI 환경 문구"),
                textField("detailAction", "상세 보기 버튼 문구"),
                fixedRowsField(
                  "services",
                  "서비스",
                  AX_SERVICES,
                  [
                    {
                      name: "map",
                      label: "요약 카드",
                      type: "group",
                      fields: [
                        textField("title", "제목"),
                        textareaField("quote", "강조 문구(선택)", { required: false }),
                        {
                          name: "parallel",
                          label: "묶음을 나란히 배치",
                          type: "checkbox",
                          defaultValue: false,
                        },
                        {
                          name: "groups",
                          label: "묶음",
                          type: "array",
                          dbName: fittedTableName("groups"),
                          labels: { singular: "묶음", plural: "묶음" },
                          fields: [
                            textField("heading", "묶음 제목(선택)", { required: false }),
                            bulletsField("items", "항목", { dbName: "ax_map_items" }),
                          ],
                        },
                      ],
                    },
                    {
                      name: "detail",
                      label: "상세 내용",
                      type: "group",
                      fields: [
                        textField("title", "제목"),
                        textareaField("lead", "핵심 문장"),
                        bulletsField("items", "항목"),
                      ],
                    },
                  ],
                  "서비스 8개는 고정입니다. 내용만 수정할 수 있습니다.",
                ),
              ],
            },
          ],
        },
        {
          label: "Learning Service",
          fields: [
            {
              name: "learningService",
              label: "Learning Service",
              type: "group",
              fields: [
                textField("title", "제목"),
                textareaField("lead", "핵심 문장"),
                linesField("support", "소개 문단", { multiline: true }),
                linesField("pillars", "핵심 가치", { multiline: true }),
                textField("marketTitle", "시장 동향 제목"),
                linesField("trends", "시장 동향", { multiline: true }),
                textField("tableLabel", "표 이름(화면 낭독용)"),
                linesField("tableHead", "표 머리글", { minRows: 3, maxRows: 3 }),
                {
                  name: "rows",
                  label: "서비스 체계 표",
                  type: "array",
                  dbName: fittedTableName("rows"),
                  labels: { singular: "단계", plural: "단계" },
                  fields: [
                    textField("stage", "단계"),
                    textField("value", "핵심 가치"),
                    bulletsField("system", "서비스 체계"),
                    bulletsField("extension", "추가 설명 상자(선택)", { dbName: "learning_extension" }),
                  ],
                },
                {
                  name: "process",
                  label: "마무리 문장",
                  type: "group",
                  fields: [
                    textField("highlight", "강조 문구"),
                    textareaField("rest", "이어지는 문장"),
                  ],
                },
                {
                  name: "details",
                  label: "상세 안내",
                  type: "array",
                  dbName: fittedTableName("details"),
                  labels: { singular: "안내", plural: "안내" },
                  fields: [textField("title", "제목"), bulletsField("body", "내용")],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
