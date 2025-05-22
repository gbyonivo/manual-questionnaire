import React from "react";
import { render, screen } from "@testing-library/react";
import { ResultContainer } from "../result-container";
import { useSelector } from "react-redux";

const correctAnswers = {
  "Who am I?": "Kuma",
  "Who are You?": "Legend",
};
const allAnswersCorrectMessage =
  "Great news! We have the perfect treatment for your hair loss. Proceed to www.manual.co, and prepare to say hello to your new hair!You can change your answers";
const onlyOneAnswer = {
  "Who am I?": "Kuma",
};
const notAllQuestionsAnswered = "Please answer all the questions";

const inCorrectAnswers = {
  "Who am I?": "Kuma",
  "Who are You?": "Bossman",
};
const inCorrectAnswerMessage =
  "Unfortunately, we are unable to prescribe this medication for you. This is because finasteride can alter the PSA levels, which may be used to monitor for cancer. You should discuss this further with your GP or specialist if you would still like this medication.,You can change your answers";

const mockedQuestions = [
  {
    question: "Who am I?",
    options: [{ display: "Kuma", value: "Kuma", isRejection: false }],
    correctOptions: ["Kuma"],
  },
  {
    question: "Who are You?",
    options: [
      { display: "Legend eh?", value: "Legend", isRejection: false },
      { display: "Bossman eh?", value: "Bossman", isRejection: true },
    ],
    correctOptions: ["Legend"],
  },
];

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("ResultContainer", () => {
  test.each([
    [correctAnswers, allAnswersCorrectMessage],
    [onlyOneAnswer, notAllQuestionsAnswered],
    [inCorrectAnswers, inCorrectAnswerMessage],
  ])("should create a query string", (answers, expected) => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      questions: mockedQuestions,
      answers,
      fetchingQuestions: false,
      errorFetchingQuestions: null,
    });

    render(<ResultContainer />);
    const text = screen.getByTestId("result-container").textContent;
    expect(text).toBe(expected);
  });
});
