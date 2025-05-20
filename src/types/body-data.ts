export type BodyContentWithLines = {
  id?: string;
  lines?: string[];
};

export type BodyContentWithImages = {
  id?: string;
  images?: { src: string; alt: string }[];
};

export type BodyContent = BodyContentWithLines | BodyContentWithImages;

export function isBodyContentWithLines(
  content: BodyContent
): content is BodyContentWithLines {
  return "lines" in content;
}

export function isBodyContentWithImages(
  content: BodyContent
): content is BodyContentWithImages {
  return "images" in content;
}

export interface BodyData {
  header: string;
  parts: {
    id: string;
    content: BodyContent[];
  }[];
}
