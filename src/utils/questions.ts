import {
  ImageOptions,
  isImageOptions,
  Question,
  Option,
} from "@/types/question";

const getValueFromHtmlString = ({
  htmlString,
  key,
}: {
  htmlString: string;
  key: string;
}) => {
  return htmlString.split(`${key}="`)[1].split('"')[0];
};

const convertOption = (option: unknown): Option | ImageOptions => {
  if (isImageOptions(option as Option)) {
    const imageOption = option as ImageOptions;
    return {
      display: imageOption.display,
      value: imageOption.value,
      isRejected: imageOption.isRejected,
      url: getValueFromHtmlString({
        htmlString: imageOption.display as string,
        key: "src",
      }),
      alt: getValueFromHtmlString({
        htmlString: imageOption.display as string,
        key: "alt",
      }),
      srcset: getValueFromHtmlString({
        htmlString: imageOption.display as string,
        key: "srcset",
      }),
    };
  }
  return {
    display: (option as Option).display,
    value: (option as Option).value,
    isRejected: (option as Option).isRejected,
  };
};

export const convertQuestions = (questionJSON: unknown): Question[] => {
  if (Array.isArray(questionJSON)) {
    return questionJSON.map((question) => {
      return {
        question: question.question,
        type: question.type,
        options: question.options.map(convertOption),
      };
    });
  }
  return [];
};
