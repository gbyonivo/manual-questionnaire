import { useCallback, useEffect } from "react";
import { Question } from "@/types/question";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import questionsJSON from "@/utils/json/questions.json";
import {
  fetchQuestions,
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
} from "@/lib/slices/questions";
import { convertQuestions } from "@/utils/questions";

export const useQuestionnaire = (): {
  questions: Question[];
  answers: Record<string, string>;
  fetchingQuestions: boolean;
  errorFetchingQuestions: AxiosError | Error | null;
  refetch: () => void;
} => {
  const dispatch = useDispatch();
  const { questions, answers, fetchingQuestions, errorFetchingQuestions } =
    useSelector((state: RootState) => state.questions);

  const getQuestions = useCallback(() => {
    const get = async () => {
      try {
        dispatch(fetchQuestions());
        // having CORS issues, so using local json file
        // const response = await axios.get(
        //   "https://manual-case-study.herokuapp.com/questionnaires/972423.json"
        // );
        // console.log(response.data);
        const data = convertQuestions(questionsJSON.questions);
        dispatch(fetchQuestionsSuccess(data));
      } catch (e) {
        dispatch(fetchQuestionsFailure(e as AxiosError));
      }
    };
    get();
  }, [dispatch]);

  useEffect(() => {
    if (
      questions.length !== 0 ||
      fetchingQuestions ||
      !!errorFetchingQuestions
    ) {
      return;
    }
    getQuestions();
  }, [
    dispatch,
    questions,
    fetchingQuestions,
    errorFetchingQuestions,
    getQuestions,
  ]);

  return {
    questions,
    answers,
    fetchingQuestions,
    errorFetchingQuestions,
    refetch: getQuestions,
  };
};
