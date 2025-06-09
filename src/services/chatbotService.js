/* eslint-disable no-unused-vars */
import { POST_DATA } from "../api";
import Cookies from "js-cookie";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

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

export const textToSpeechService = (message) => {
    return new Promise((resolve, reject) => {
        try {
            const speechConfig = sdk.SpeechConfig.fromSubscription(
                import.meta.env.VITE_SPEECH_KEY,
                import.meta.env.VITE_SPEECH_REGION
            );
            const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);
            const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="id-ID">
    <voice name="zh-CN-XiaoxiaoMultilingualNeural">
        <mstts:express-as style="cheerful" styledegree="2">
            ${message}
        </mstts:express-as>
    </voice>
</speak>`;

            speechSynthesizer.speakSsmlAsync(
                ssml,
                (result) => {
                    speechSynthesizer.close();
                    resolve(result.audioData);
                },
                (error) => {
                    speechSynthesizer.close();
                    reject(error);
                }
            );
        } catch (error) {
            console.error("Error in text-to-speech service:", error);
            reject(error);
        }
    });
};
