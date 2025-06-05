/* eslint-disable no-unused-vars */
import { POST_DATA } from "../api";
import Cookies from "js-cookie";

export const chatbotTrialService = async (username, message, history, mood) => {
    try {
        const historyChat =
            history.length > 0
                ? history.map((item) => ({
                      role: item.sender,
                      message: item.message,
                  }))
                : [];

        const response = await POST_DATA("api/v1/chat/trial", {
            user_name: username,
            message,
            message_history: historyChat,
            current_mood: mood,
        });
        return response.data;
    } catch (err) {
        window.location.href = "/error";
    }
};

export const chatbotService = async (message, history) => {
    const token = Cookies.get("token");
    try {
        const historyChat =
            history.length > 0
                ? history.map((item) => ({
                      role: item.sender,
                      message: item.message,
                  }))
                : [];

        const response = await POST_DATA(
            "api/v1/chat",
            {
                message,
                message_history: historyChat,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        window.location.href = "/error";
    }
};
