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
        if (setQuizId) setQuizId(response.data.quiz_id);
        if (setQuizData) {
            setQuizData({
                title: response.data.title,
                description: response.data.description,
            });
        }
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        if (setLoading) setLoading(false);
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
        console.error(error);
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

        const response = await PUT_DATA(
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
        return response.data;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return null;
    } finally {
        setLoading(false);
    }
};

export const submitQuizService = async (
    quizAttemptId,
    setLoading,
    setQuizResults
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
    } catch (error) {
        console.error("Error submitting quiz:", error);
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
        return null;
    }
};

export const checkSessionAttemptQuizService = async (setQuizQuestions) => {
    try {
        const token = Cookies.get("token");
        const response = await GET_DATA("api/v1/quiz/attempt", token);
        setQuizQuestions((prev) =>
            response.data.quiz_attempt_id
                ? {
                      ...prev,
                      quiz_attempt_id: response.data.quiz_attempt_id,
                  }
                : prev
        );
    } catch (error) {
        console.error("Error checking session attempt quiz:", error);
    }
};

export const generateQuizAttemptService = async (
    quiz_attempt_id,
    setQuizQuestions
) => {
    try {
        const token = Cookies.get("token");
        const response = await POST_DATA(
            `api/v1/quiz/attempt/${quiz_attempt_id}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (setQuizQuestions) {
            setQuizQuestions(response.data);
        }

        return response.data;
    } catch (error) {
        console.error("Error generating quiz attempt:", error);
        return null;
    }
};
