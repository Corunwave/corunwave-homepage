import type { ArrayField, Field, SelectField, TextareaField, TextField } from "payload";

type Options = { required?: boolean; admin?: { description?: string } };

export const textField = (name: string, label: string, options: Options = {}): TextField => ({
  name,
  label,
  type: "text",
  required: true,
  ...options,
});

export const textareaField = (name: string, label: string, options: Options = {}): TextareaField => ({
  name,
  label,
  type: "textarea",
  required: true,
  ...options,
});

export const LINE_FIELD = "line";

/* 문자열 목록. 행마다 `line` 하나만 가지며, 로더가 string[]로 펼친다. */
export const linesField = (
  name: string,
  label: string,
  options: { minRows?: number; maxRows?: number; description?: string; multiline?: boolean; dbName?: string } = {},
): ArrayField => ({
  name,
  label,
  type: "array",
  dbName: options.dbName,
  labels: { singular: "항목", plural: "항목" },
  minRows: options.minRows,
  maxRows: options.maxRows,
  admin: { description: options.description, initCollapsed: false },
  fields: [
    options.multiline
      ? textareaField(LINE_FIELD, "내용")
      : textField(LINE_FIELD, "내용"),
  ],
});

/* 글머리 항목: 제목 줄과 그 아래 하위 항목. */
/* Postgres 식별자는 63자까지라 깊이 중첩되는 곳은 dbName으로 테이블 이름을 줄인다. */
export const bulletsField = (
  name: string,
  label: string,
  options: { description?: string; dbName?: string } = {},
): ArrayField => ({
  name,
  label,
  type: "array",
  dbName: options.dbName,
  labels: { singular: "글머리", plural: "글머리" },
  admin: { description: options.description },
  fields: [
    textareaField("text", "내용"),
    linesField("children", "하위 항목(선택)", {
      multiline: true,
      dbName: options.dbName ? `${options.dbName}_children` : undefined,
    }),
  ],
});

/* 개수가 정해진 항목 묶음. `key`로 코드에 고정된 이미지·색상과 연결하므로 추가·삭제·키 변경은 막는다. */
export const fixedRowsField = (
  name: string,
  label: string,
  keys: readonly { value: string; label: string }[],
  fields: Field[],
  description?: string,
): ArrayField => {
  const keyField: SelectField = {
    name: "key",
    label: "구분",
    type: "select",
    required: true,
    options: keys.map(({ value, label: optionLabel }) => ({ value, label: optionLabel })),
    admin: { readOnly: true, description: "고정 항목입니다. 변경할 수 없습니다." },
  };

  return {
    name,
    label,
    type: "array",
    labels: { singular: "항목", plural: "항목" },
    minRows: keys.length,
    maxRows: keys.length,
    admin: { description, initCollapsed: true },
    fields: [keyField, ...fields],
  };
};

export const TEXT_HINT =
  "줄바꿈(Enter)은 화면에 그대로 반영됩니다. [[ ]]로 감싼 부분은 한 덩어리로 유지되어 중간에서 줄이 바뀌지 않습니다.";
