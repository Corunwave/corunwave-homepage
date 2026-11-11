// 본문(Lexical JSON)에서 media 업로드 노드를 순서대로 뽑는 순수 함수. 서버·클라이언트가 함께 쓴다.
type LexicalNode = {
  type?: string;
  relationTo?: string;
  value?: number | string | { id?: number | string; url?: string | null; alt?: string | null };
  children?: LexicalNode[];
};

export type NewsContentImage = { id: number | string; url?: string | null; alt?: string | null };

export const extractContentImages = (content: unknown): NewsContentImage[] => {
  const images: NewsContentImage[] = [];
  const walk = (node: LexicalNode | undefined) => {
    if (!node) return;
    if (node.type === "upload" && node.relationTo === "media" && node.value != null) {
      if (typeof node.value === "object") {
        if (node.value.id != null) images.push({ id: node.value.id, url: node.value.url, alt: node.value.alt });
      } else {
        images.push({ id: node.value });
      }
    }
    node.children?.forEach(walk);
  };
  walk((content as { root?: LexicalNode } | null | undefined)?.root);
  return images;
};

export const isContentEmpty = (content: unknown) => {
  const root = (content as { root?: LexicalNode } | null | undefined)?.root;
  return !root?.children?.length;
};
