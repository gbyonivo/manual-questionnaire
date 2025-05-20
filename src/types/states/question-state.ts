import { AxiosError } from "axios";
import { Question } from "../question";

export interface QuestionsState {
  questions: Question[];
  answers: Record<string, string>;
  fetchingQuestions: boolean;
  errorFetchingQuestions: AxiosError | null;
}
