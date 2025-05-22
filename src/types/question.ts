export enum QuestionType {
  CHOICE = "ChoiceType",
}

export interface Option {
  display: string | null;
  value: string;
  isRejection: boolean;
}

export interface ImageOptions extends Option {
  url: string;
  alt: string;
  srcset: string;
}

export function isImageOptions(option: Option): option is ImageOptions {
  return option.display?.includes("<img") ?? false;
}

export interface Question {
  question: string;
  type: QuestionType;
  options: (Option | ImageOptions)[];
  correctOptions: (string | boolean)[];
}
