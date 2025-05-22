import { Question } from "@/types/question";
import { QuestionsState } from "@/types/states/question-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: QuestionsState = {
  questions: [],
  answers: {},
  fetchingQuestions: false,
  errorFetchingQuestions: null,
};

export const questionsSlice = createSlice({
  name: "_questions",
  initialState,
  reducers: {
    fetchQuestions: (state) => {
      return {
        ...state,
        fetchingQuestions: true,
        errorFetchingQuestions: null,
      };
    },
    fetchQuestionsSuccess: (state, action: PayloadAction<Question[]>) => {
      return {
        ...state,
        questions: action.payload,
        fetchingQuestions: false,
      };
    },
    fetchQuestionsFailure: (
      state,
      action: PayloadAction<Error | AxiosError>
    ) => {
      return {
        ...state,
        fetchingQuestions: false,
        errorFetchingQuestions: action.payload,
      };
    },
    answerQuestion: (
      state,
      action: PayloadAction<{ question: string; answer: string }>
    ) => {
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.question]: action.payload.answer,
        },
      };
    },
  },
});

export const {
  fetchQuestions,
  answerQuestion,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
} = questionsSlice.actions;

export default questionsSlice.reducer;
