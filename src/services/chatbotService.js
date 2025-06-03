import { POST_DATA } from "../api";

export const chatbotTrialService = async (username, message, history, mood) => {
    try {
        const historyChat =
            history.length > 0
                ? [
                      history.reduce((acc, item, index) => {
                          acc[`additionalProp${index + 1}`] = item.message;
                          return acc;
                      }, {}),
                  ]
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

export const chatbotService = async (
    user_id,
    username,
    message,
    history,
    mood
) => {
    try {
        const historyChat =
            history.length > 0
                ? [
                      history.reduce((acc, item, index) => {
                          acc[`additionalProp${index + 1}`] = item.message;
                          return acc;
                      }, {}),
                  ]
                : [];

        const response = await POST_DATA("api/v1/chat", {
            user_id,
            message,
            message_history: historyChat,
            user_name: username,
            current_mood: mood,
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
