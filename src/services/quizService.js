/* eslint-disable no-unused-vars */
import { GET_DATA, POST_DATA, PUT_DATA } from "../api";
import Cookies from "js-cookie";

export const chooseQuizService = async (
    theme,
    difficulty,
    setLoading,
    setQuizId,
    setQuizData
) => {
    try {
        const token = Cookies.get("token");
        setLoading(true);
        const response = await POST_DATA(
            "api/v1/quiz/generate",
            {
                theme,
                difficulty,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setQuizId(response.data.quiz_id);
        setQuizData({
            title: response.data.title,
            description: response.data.description,
        });
    } catch (error) {
        window.location.href = "/error";
    } finally {
        setLoading(false);
    }
};

export const getQuizService = async (
    quizId,
    setLoading,
    setQuizQuestions,
    navigate
) => {
    try {
        const token = Cookies.get("token");
        setLoading(true);
        const response = await POST_DATA(
            `api/v1/quiz/attempt/${quizId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setQuizQuestions({
            ...response.data,
        });
        navigate(`/quiz/${response.data.quiz_attempt_id}`);
    } catch (error) {
        window.location.href = "/error";
    } finally {
        if (setLoading) setLoading(false);
    }
};

export const submitAnswerService = async (
    quizAttemptId,
    questionId,
    answers,
    setLoading
) => {
    try {
        const token = Cookies.get("token");
        setLoading(true);
        const userAnswers = Array.isArray(answers) ? answers : [answers];

        await PUT_DATA(
            `api/v1/quiz/submit/${quizAttemptId}/${questionId}`,
            {
                user_answers: userAnswers,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        window.location.href = "/error";
    } finally {
        setLoading(false);
    }
};

export const submitQuizService = async (
    quizAttemptId,
    setLoading,
    setQuizResults,
    navigate
) => {
    try {
        const token = Cookies.get("token");
        setLoading(true);
        const response = await POST_DATA(
            `api/v1/quiz/submit/${quizAttemptId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setQuizResults(response.data);
        navigate("/quiz");
    } catch (error) {
        window.location.href = "/error";
    } finally {
        setLoading(false);
    }
};

export const getAnswerUserQuizService = async (
    quizAttemptId,
    questionId,
    setAnswer
) => {
    try {
        const token = Cookies.get("token");
        const response = await GET_DATA(
            `api/v1/quiz/answer/${quizAttemptId}/${questionId}`,
            token
        );
        setAnswer(response.data);
    } catch (error) {
        console.error("Error fetching user answer:", error);
    }
};

export const generateQuizAttemptService = async (
    quiz_attempt_id,
    setQuizQuestions
) => {
    try {
        const token = Cookies.get("token");
        const response = await GET_DATA(
            `api/v1/quiz/attempt/${quiz_attempt_id}`,
            token
        );

        setQuizQuestions(response.data);
    } catch (error) {
        console.error("Error generating quiz attempt:", error);
    }
};
