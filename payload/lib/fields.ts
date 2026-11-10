import type { ArrayField, Field, SelectField, TextareaField, TextField } from "payload";

const PG_IDENTIFIER_MAX = 63;
const VERSION_TABLE_MAX = PG_IDENTIFIER_MAX - 3 - "_parent_id_idx".length;
const toSnake = (name: string) => name.replace(/([A-Z])/g, "_$1").toLowerCase();

/* 글로벌에 초안(versions)을 켜면 `_x_v_version_` 접두가 붙어 식별자가 63자를 넘는다.
   짧은 이름은 Payload 기본값과 똑같이 두고(기존 DB 이름 유지), 넘칠 때만 해시로 줄인다. */
const fitIdentifier = (full: string, max = PG_IDENTIFIER_MAX) => {
  if (full.length <= max) return full;
  let hash = 5381;
  for (const char of full) hash = ((hash * 33) ^ char.charCodeAt(0)) >>> 0;
  return `${full.slice(0, max - 9)}_${hash.toString(36).padStart(8, "0")}`;
};

/* 배열 테이블 이름: 기본값(`<부모 테이블>_<필드>`)과 같고, 넘칠 때만 줄인다. */
export const fittedTableName =
  (name: string) =>
  ({ tableName }: { tableName?: string }) =>
    // 버전 테이블(`_`로 시작)은 Payload가 앞뒤에 `_`, `_v`를 더 붙이고 `_parent_id_idx` 인덱스도 만든다.
    fitIdentifier(`${tableName}_${toSnake(name)}`, tableName?.startsWith("_") ? VERSION_TABLE_MAX : PG_IDENTIFIER_MAX);

/* select/radio enum 이름: 기본값(`enum_<부모 테이블>_<필드>`)과 같고, 넘칠 때만 줄인다. */
export const fittedEnumName =
  (name: string) =>
  ({ tableName }: { tableName?: string }) =>
    fitIdentifier(`enum_${tableName}_${toSnake(name)}`);

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
  dbName: options.dbName ?? fittedTableName(name),
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
  dbName: options.dbName ?? fittedTableName(name),
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
    enumName: fittedEnumName("key"),
    required: true,
    options: keys.map(({ value, label: optionLabel }) => ({ value, label: optionLabel })),
    admin: { readOnly: true, description: "고정 항목입니다. 변경할 수 없습니다." },
  };

  return {
    name,
    label,
    type: "array",
    dbName: fittedTableName(name),
    labels: { singular: "항목", plural: "항목" },
    minRows: keys.length,
    maxRows: keys.length,
    admin: { description, initCollapsed: true },
    fields: [keyField, ...fields],
  };
};

export const TEXT_HINT =
  "자동저장은 초안이며 '발행'해야 사이트에 반영됩니다. 줄바꿈(Enter)은 화면에 그대로 반영됩니다. [[ ]]로 감싼 부분은 한 덩어리로 유지되어 중간에서 줄이 바뀌지 않습니다.";
