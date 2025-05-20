"use client";

import { useQuestionnaire } from "@/hooks/use-questionnaire";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./common/button";
import { createQueryString } from "@/utils/common";
import { useEffect, useState } from "react";
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
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [questionIndex, setQuestionIndex] = useState<number>((): number => {
    return getQuestionIndex(searchParams);
  });

  useEffect(() => {
    setQuestionIndex(getQuestionIndex(searchParams));
  }, [searchParams]);

  const { questions, fetchingQuestions, errorFetchingQuestions } =
    useQuestionnaire();

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

  return (
    <div>
      {fetchingQuestions && <div>Loading...</div>}
      {errorFetchingQuestions && (
        <div>Error: {errorFetchingQuestions.message}</div>
      )}
      {!!questions[questionIndex - 1] && (
        <>
          <div>{questions[questionIndex - 1].question}</div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleNextOrPreviousQuestion("previous")}
              className="bg-orange-500"
            >
              Previous
            </Button>
            <Button
              onClick={() => handleNextOrPreviousQuestion("next")}
              className="bg-green-500"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
