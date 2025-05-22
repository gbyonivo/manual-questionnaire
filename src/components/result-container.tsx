"use client";

import Link from "next/link";
import { useQuestionnaire } from "@/hooks/use-questionnaire";
import { Logo } from "./common/logo";

export function ResultContainer() {
  const { answers, questions } = useQuestionnaire();

  // TODO: Write tests for this
  const hasAnsweredAllQuestions =
    Object.keys(answers).length === questions.length;

  // TODO: Write tests for this
  const hasAllQuestionsCorrectly =
    hasAnsweredAllQuestions &&
    questions.every((question) => {
      const answer = answers[question.question];
      return question.correctOptions.includes(answer);
    });

  return (
    <div className="gap-4 p-4 h-screen flex flex-col mt-32 items-center relative primary-text">
      <Logo size={40} />
      <div className="text-center lg:max-w-2/3" data-testid="result-container">
        {!hasAnsweredAllQuestions ? (
          <div>
            Please{" "}
            <Link href="/questionnaire" className="underline">
              answer all the questions
            </Link>
          </div>
        ) : (
          <>
            {hasAllQuestionsCorrectly ? (
              <div>
                Great news! We have the perfect treatment for your hair loss.
                Proceed to{" "}
                <a href="https://www.manual.co" className="underline">
                  www.manual.co
                </a>
                , and prepare to say hello to your new hair!
              </div>
            ) : (
              <div className="text-center ">
                Unfortunately, we are unable to prescribe this medication for
                you. This is because finasteride can alter the PSA levels, which
                may be used to monitor for cancer. You should discuss this
                further with your GP or specialist if you would still like this
                medication.,
              </div>
            )}
          </>
        )}

        {hasAnsweredAllQuestions && (
          <div className="mt-4">
            You can{" "}
            <Link
              href={`/questionnaire?questionIndex=${questions.length}`}
              className="underline"
            >
              change your answers
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
