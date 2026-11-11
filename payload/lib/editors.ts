import {
  BlockquoteFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

/*
 * 소식 본문 에디터. 굵게·기울임·밑줄·목록·링크·인용·구분선과 이미지·PDF 삽입만 허용한다.
 * 글자 크기·색·글꼴은 일부러 넣지 않는다(디자인은 코드의 타이포 토큰이 담당).
 */
export const newsEditor = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    LinkFeature(),
    UploadFeature({ collections: { media: { fields: [] }, documents: { fields: [] } } }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
});
