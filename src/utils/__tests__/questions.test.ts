import { convertQuestions } from "../questions";

const imageUrl = "https://example.com/kuma-in-lagos.jpg";
const srcset = `${imageUrl} 1x, ${imageUrl} 2x`;
const alt = "Kuma in Lagos";
const display = `<img src="${imageUrl}" alt="${alt}" srcset="${srcset}" />`;

const imageOption = {
  display,
  value: "Lagos",
  isRejection: false,
};

const textOption = {
  display: "Who is the Goat?",
  value: true,
  isRejection: false,
};

const questionFromJSON = {
  question: "What is the capital of France?",
  type: "ChoiceType",
  options: [],
};

describe("convertQuestions", () => {
  test.each([
    [
      [{ ...questionFromJSON, options: [imageOption, textOption] }],
      [
        {
          question: "What is the capital of France?",
          type: "ChoiceType",
          options: [
            {
              display,
              value: "Lagos",
              isRejection: false,
              url: imageUrl,
              alt,
              srcset,
            },
            {
              display: "Who is the Goat?",
              value: true,
              isRejection: false,
            },
          ],
          correctOptions: ["Lagos", true],
        },
      ],
    ],
    [[{ ...questionFromJSON, options: undefined }], []],
    [[{ ...questionFromJSON, question: undefined }], []],
    [
      [
        {
          ...questionFromJSON,
          options: [{ ...imageOption, display: undefined }],
        },
      ],
      [],
    ],
  ])("should convert questions %s to %s", (questions, expected) => {
    const result = convertQuestions(questions);
    expect(result).toEqual(expected);
  });
});
