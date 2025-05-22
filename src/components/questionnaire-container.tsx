"use client";

import { useQuestionnaire } from "@/hooks/use-questionnaire";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./common/button";
import { createQueryString } from "@/utils/common";
import { useEffect, useState } from "react";
import { QuestionnaireImageOption } from "./questionnaire/questionnaire-image-option";
import { isImageOptions, Option } from "@/types/question";
import { QuestionnaireTextOption } from "./questionnaire/questionnaire-text-option";
import { useDispatch } from "react-redux";
import { answerQuestion } from "@/lib/slices/questions";

// TODO: Creating spinner using logo and translate

const searchKey = "questionIndex";

const getQuestionIndex = (searchParams: URLSearchParams): number => {
  try {
    return parseInt(searchParams.get(searchKey) || "1", 10) || 1;
  } catch (e) {
    console.error(e);
    return 1;
  }
};
export function QuestionnaireContainer() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [questionIndex, setQuestionIndex] = useState<number>((): number => {
    return getQuestionIndex(searchParams);
  });
  const { questions, fetchingQuestions, errorFetchingQuestions, answers } =
    useQuestionnaire();

  useEffect(() => {
    const questionIndex = getQuestionIndex(searchParams);
    if (
      questionIndex > questions.length ||
      questionIndex < 1 ||
      !Number.isInteger(questionIndex)
    ) {
      router.push("/questionnaire?questionIndex=1");
    }
    setQuestionIndex(getQuestionIndex(searchParams));
  }, [questions?.length, router, searchParams]);

  const handleNextOrPreviousQuestion = (direction: "next" | "previous") => {
    if (questionIndex === questions.length && direction === "next") {
      router.push("result");
      return;
    }
    if (questionIndex === 1 && direction === "previous") {
      router.push("/");
      return;
    }
    router.push(
      pathname +
        "?" +
        createQueryString({
          name: searchKey,
          value:
            direction === "next"
              ? (questionIndex + 1).toString()
              : (questionIndex - 1).toString(),
          searchParams,
        })
    );
  };

  const currentQuestion = questions[questionIndex - 1];
  const currentAnswer = answers[currentQuestion?.question];

  const handleOptionClick = (option: Option) => {
    dispatch(
      answerQuestion({
        question: currentQuestion.question,
        answer: option.value,
      })
    );
    handleNextOrPreviousQuestion("next");
  };
  return (
    <div className="gap-4 p-4 h-screen flex flex-col justify-center items-center relative primary-text">
      {fetchingQuestions && <div>Loading...</div>}
      {errorFetchingQuestions && (
        <div>Error: {errorFetchingQuestions.message}</div>
      )}
      {!!currentQuestion && (
        <div className="text-2xl font-bold text-center absolute bottom-16 right-16">
          {questionIndex} / {questions.length}
        </div>
      )}

      {!!currentQuestion && (
        <div className="lg:max-w-2/3">
          <div className="text-2xl font-bold">{currentQuestion.question}</div>
          <div className="grid grid-cols-3 gap-8 my-8">
            {currentQuestion.options.map((option, index) => {
              {
                return isImageOptions(option) ? (
                  <QuestionnaireImageOption
                    key={option.display}
                    option={option}
                    onClick={() => handleOptionClick(option)}
                    selected={currentAnswer === option.value}
                  />
                ) : (
                  <QuestionnaireTextOption
                    key={option.display}
                    option={option}
                    onClick={() => handleOptionClick(option)}
                    index={index + 1}
                    className="col-span-3"
                    selected={currentAnswer === option.value}
                  />
                );
              }
            })}
          </div>
          <div className="flex gap-2 justify-between">
            <Button
              onClick={() => handleNextOrPreviousQuestion("previous")}
              className="bg-pink-800 text-white"
            >
              Back
            </Button>
            {currentAnswer !== undefined && (
              <Button
                onClick={() => handleNextOrPreviousQuestion("next")}
                className="bg-green-800 text-white"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
