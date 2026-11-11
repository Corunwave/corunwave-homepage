import type { GlobalConfig } from "payload";
import { isCeoOrEditor } from "../access/roles";
import { CMS_TAGS } from "../hooks/revalidate";
import { globalVersions, revalidateOnChange } from "../lib/globalHooks";
import { fittedTableName, fixedRowsField, linesField, TEXT_HINT, textareaField, textField } from "../lib/fields";

export const PartnerStrategy: GlobalConfig = {
  slug: "partner-strategy",
  label: "파트너 전략",
  admin: { group: "페이지", description: `파트너 전략 페이지 본문입니다. ${TEXT_HINT}` },
  access: { read: () => true, update: isCeoOrEditor },
  versions: globalVersions,
  hooks: revalidateOnChange(CMS_TAGS.partnerStrategy),
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
              fields: [
                textField("title", "제목"),
                textareaField("description", "설명"),
                linesField("keywords", "검색 키워드"),
                textField("openGraphTitle", "공유 미리보기 제목"),
              ],
            },
          ],
        },
        {
          label: "협력모델",
          fields: [
            {
              name: "cooperationModels",
              label: "협력모델",
              type: "group",
              fields: [
                textField("title", "제목"),
                textareaField("description", "설명"),
                linesField("stages", "단계 이름", { minRows: 4, maxRows: 4 }),
                fixedRowsField(
                  "roles",
                  "역할",
                  [
                    { value: "corunwave", label: "코런웨이브" },
                    { value: "sales", label: "Sales 파트너" },
                    { value: "ax-infra", label: "AX Infra 파트너" },
                    { value: "learning", label: "Learning 파트너" },
                  ],
                  [
                    textField("name", "이름"),
                    textField("subName", "보조 이름(선택)", { required: false }),
                    linesField("steps", "단계별 내용(4단계)", {
                      minRows: 4,
                      maxRows: 4,
                      multiline: true,
                      description: "위의 '단계 이름' 순서와 같습니다.",
                    }),
                  ],
                ),
              ],
            },
          ],
        },
        {
          label: "To-be 전략",
          fields: [
            {
              name: "toBeStrategy",
              label: "To-be 전략",
              type: "group",
              fields: [
                textField("title", "제목"),
                fixedRowsField(
                  "stages",
                  "단계",
                  [
                    { value: "short", label: "단기" },
                    { value: "mid", label: "중기" },
                    { value: "long", label: "장기" },
                  ],
                  [textField("term", "기간 표기"), textField("title", "제목"), textareaField("description", "설명")],
                ),
              ],
            },
          ],
        },
        {
          label: "기대효과",
          fields: [
            {
              name: "partnershipBenefits",
              label: "파트너십 기대효과",
              type: "group",
              fields: [
                textField("title", "제목"),
                fixedRowsField(
                  "benefits",
                  "기대효과",
                  [
                    { value: "scale", label: "비즈니스 규모의 확장" },
                    { value: "operation", label: "운영 탁월성 확보" },
                    { value: "integration", label: "통합 솔루션의 완성" },
                    { value: "resource", label: "전략적 자원 최적화" },
                  ],
                  [
                    textField("title", "제목"),
                    textareaField("subtitle", "부제"),
                    linesField("bullets", "상세 문장(2개)", { minRows: 2, maxRows: 2, multiline: true, dbName: "benefit_bullets" }),
                  ],
                ),
              ],
            },
          ],
        },
        {
          label: "고객 유형별 제안",
          fields: [
            {
              name: "customerProposals",
              label: "고객 유형별 제안",
              type: "group",
              fields: [
                textField("title", "제목"),
                fixedRowsField(
                  "proposals",
                  "고객 유형",
                  [
                    { value: "public", label: "공공/정부기관" },
                    { value: "enterprise", label: "대기업/중견기업" },
                    { value: "startup", label: "스타트업/중소기업" },
                    { value: "university", label: "대학교" },
                  ],
                  [
                    textField("label", "이름"),
                    textareaField("description", "설명"),
                    linesField("offerings", "제안 항목", { dbName: "proposal_offerings" }),
                  ],
                ),
              ],
            },
          ],
        },
        {
          label: "협력 제안",
          fields: [
            {
              name: "proposal",
              label: "협력 제안",
              type: "group",
              fields: [
                textField("title", "제목"),
                {
                  name: "brands",
                  label: "브랜드",
                  type: "array",
                  dbName: fittedTableName("brands"),
                  labels: { singular: "브랜드", plural: "브랜드" },
                  minRows: 2,
                  maxRows: 2,
                  admin: { description: "로고 이미지는 고정입니다. 설명과 이름만 수정할 수 있습니다." },
                  fields: [textField("description", "설명"), textField("name", "이름(로고 대체 텍스트)")],
                },
                fixedRowsField(
                  "cards",
                  "제안 카드",
                  [
                    { value: "university", label: "대학 맞춤형" },
                    { value: "enterprise", label: "기업 및 공공 맞춤형" },
                  ],
                  [
                    textField("audience", "대상(강조 첫 줄)"),
                    textField("title", "제목"),
                    textareaField("lead", "핵심 문장"),
                    textareaField("body", "본문"),
                    {
                      name: "download",
                      label: "다운로드 버튼",
                      type: "group",
                      admin: { description: "연결되는 PDF는 '파일 > 다운로드 자료'에서 구분을 지정해 관리합니다." },
                      fields: [textField("label", "문구"), textField("ariaLabel", "화면 낭독용 설명")],
                    },
                  ],
                ),
                {
                  name: "contact",
                  label: "문의 버튼",
                  type: "group",
                  fields: [textField("label", "문구")],
                },
              ],
            },
          ],
        },
        {
          label: "파트너사 로고",
          fields: [
            {
              name: "partnerLogos",
              label: "파트너사 로고",
              type: "group",
              fields: [
                {
                  name: "enabled",
                  label: "이 영역 표시",
                  type: "checkbox",
                  defaultValue: true,
                },
                textField("title", "제목"),
                textField("ariaLabel", "화면 낭독용 설명"),
                {
                  name: "logos",
                  label: "로고",
                  type: "array",
                  dbName: fittedTableName("logos"),
                  labels: { singular: "로고", plural: "로고" },
                  admin: { description: "위아래로 끌어 순서를 바꿀 수 있습니다." },
                  fields: [
                    textField("name", "파트너 이름"),
                    { name: "image", label: "로고 이미지", type: "upload", relationTo: "media", required: true },
                    {
                      type: "row",
                      fields: [
                        { name: "width", label: "가로(px)", type: "number", required: true, min: 1 },
                        { name: "height", label: "세로(px)", type: "number", required: true, min: 1 },
                      ],
                    },
                    {
                      name: "visible",
                      label: "표시",
                      type: "checkbox",
                      defaultValue: true,
                      admin: { description: "끄면 삭제하지 않고 화면에서만 숨깁니다." },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
