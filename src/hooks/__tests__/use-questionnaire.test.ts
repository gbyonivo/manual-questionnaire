import { renderHook, waitFor } from "@testing-library/react";
import { useQuestionnaire } from "../use-questionnaire";
import { useSelector } from "react-redux";
import { fetchQuestions } from "@/lib/slices/questions";

const mockDispatch = jest.fn();

const mockQuestions = [
  {
    question: "Who am I?",
    options: [{ display: "Kuma", value: "Kuma", isRejection: false }],
    correctOptions: ["Kuma"],
  },
];

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("useQuestionnaire", () => {
  // asyncing assuming we made the api call
  it("should fetch questions", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      questions: [],
      answers: {},
      fetchingQuestions: false,
      errorFetchingQuestions: null,
    });

    // could have mocked return from axios.get
    // await waitFor(() =>
    //   expect(mockDispatch).toHaveBeenCalledWith(fetchQuestionsSuccess([]))
    // );
    const { result } = renderHook(() => useQuestionnaire());

    const promises = [
      waitFor(() =>
        expect(mockDispatch).toHaveBeenCalledWith(fetchQuestions())
      ),
      waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(2)),
      waitFor(() => expect(result.current.answers).toEqual({})),
    ];

    await Promise.all(promises);
  });

  test("should fetch questions", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      questions: mockQuestions,
      answers: {},
      fetchingQuestions: false,
      errorFetchingQuestions: null,
    });

    // could have mocked return from axios.get
    // await waitFor(() =>
    //   expect(mockDispatch).toHaveBeenCalledWith(fetchQuestionsSuccess([]))
    // );
    const { result } = renderHook(() => useQuestionnaire());

    const promises = [
      waitFor(() => expect(mockDispatch).not.toHaveBeenCalled()),
      waitFor(() => expect(result.current.answers).toEqual({})),
      waitFor(() => expect(result.current.questions).toEqual(mockQuestions)),
    ];

    await Promise.all(promises);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
