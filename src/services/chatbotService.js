import { POST_DATA } from "../api";

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
        console.log(err);
    }
};

export const chatbotService = async (message, history) => {
    try {
        const historyChat =
            history.length > 0
                ? history.map((item) => ({
                      role: item.sender,
                      message: item.message,
                  }))
                : [];

        const response = await POST_DATA("api/v1/chat", {
            message,
            message_history: historyChat,
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
