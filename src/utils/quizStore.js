import { create } from "zustand";

const useQuizStore = create((set) => ({
    // State
    quizData: null,
    quizId: "",
    quizQuestions: null,
    isLoading: false,
    isLoadingQuestions: false,
    currentQuestionIndex: 0,
    userAnswers: {},
    isSubmittingAnswer: false,
    loadingAnswerFor: null,
    quizResults: null,
    isSubmittingQuiz: false,

    // Actions
    setQuizData: (data) => set({ quizData: data }),
    setQuizId: (id) => set({ quizId: id }),
    setQuizQuestions: (questions) => set({ quizQuestions: questions }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setIsLoadingQuestions: (loading) => set({ isLoadingQuestions: loading }),
    setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
    setUserAnswers: (answers) => set({ userAnswers: answers }),
    // Helper action to update a single answer
    updateUserAnswer: (questionId, answer) =>
        set((state) => ({
            userAnswers: {
                ...state.userAnswers,
                [questionId]: answer,
            },
        })),
    setIsSubmittingAnswer: (submitting) =>
        set({ isSubmittingAnswer: submitting }),
    setLoadingAnswerFor: (questionId) => set({ loadingAnswerFor: questionId }),
    setQuizResults: (results) => set({ quizResults: results }),
    setIsSubmittingQuiz: (submitting) => set({ isSubmittingQuiz: submitting }),

    resetQuizState: () =>
        set({
            quizData: null,
            quizId: "",
            quizQuestions: null,
            currentQuestionIndex: 0,
            userAnswers: {},
            quizResults: null,
            isLoading: false,
            isLoadingQuestions: false,
            isSubmittingAnswer: false,
            loadingAnswerFor: null,
            isSubmittingQuiz: false,
        }),
}));

export default useQuizStore;
