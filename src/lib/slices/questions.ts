import { QuestionsState } from "@/types/states/question-state";
import { createSlice } from "@reduxjs/toolkit";

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
    fetchQuestionsSuccess: (state, action) => {
      return {
        ...state,
        questions: action.payload,
        fetchingQuestions: false,
      };
    },
    fetchQuestionsFailure: (state, action) => {
      return {
        ...state,
        fetchingQuestions: false,
        errorFetchingQuestions: action.payload,
      };
    },
    answerQuestion: (state, action) => {
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
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
