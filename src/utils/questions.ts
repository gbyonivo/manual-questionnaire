import {
  ImageOptions,
  isImageOptions,
  Question,
  Option,
} from "@/types/question";

export const getValueFromHtmlString = ({
  htmlString,
  key,
}: {
  htmlString: string;
  key: string;
}) => {
  return htmlString.split(`${key}="`)[1]?.split('"')?.[0] ?? "";
};

export const convertOption = (
  option: unknown
): Option | ImageOptions | null => {
  if (
    !option ||
    !(option as Option).display ||
    (option as Option).value === undefined ||
    (option as Option).isRejection === undefined
  ) {
    return null;
  }
  if (isImageOptions(option as Option)) {
    const imageOption = option as ImageOptions;
    return {
      display: imageOption.display,
      value: imageOption.value,
      isRejection: imageOption.isRejection,
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
    isRejection: (option as Option).isRejection,
  };
};

// TODO: Add tests for this function
export const convertQuestions = (questionJSON: unknown): Question[] => {
  try {
    if (Array.isArray(questionJSON)) {
      return questionJSON.reduce((acc: Question[], question) => {
        if (
          !question.question ||
          !question.options ||
          (question.type !== "ChoiceType" &&
            !Array.isArray(question.options) &&
            question.options.length === 0)
        ) {
          return acc;
        }

        const validOptions = question.options.reduce(
          (acc: Option[], curr: unknown) => {
            const option = convertOption(curr);
            if (option) {
              return [...acc, option];
            }
            return acc;
          },
          []
        );

        if (validOptions.length === 0) {
          return acc;
        }

        const q = {
          question: question.question,
          type: question.type,
          options: validOptions,
          correctOptions: validOptions.reduce(
            (acc: string[], option: Option) => {
              if (!option.isRejection) {
                acc.push(option.value);
              }
              return acc;
            },
            []
          ),
        };
        return [...acc, q];
      }, []);
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
