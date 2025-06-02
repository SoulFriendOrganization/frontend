import { POST_DATA } from "../api";
import Cookies from "js-cookie";

export const checkMoodTrialService = async (imageData, setUserExpression) => {
    try {
        const response = await POST_DATA("api/v1/mood/face-detection/trial", {
            image: imageData,
        });
        setUserExpression(response.data.prediction);
    } catch (error) {
        console.log(error);
    }
};

export const checkMoodService = async (
    imageData,
    setUserExpression,
    setErrorMessage
) => {
    try {
        const token = Cookies.get("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        const response = await POST_DATA(
            "api/v1/mood/face-detection",
            { image: imageData },
            { headers }
        );
        setUserExpression(response.data.prediction);
        return { success: true };
    } catch (error) {
        console.log("Mood detection error:", error);

        // Handle specific error messages
        if (error.response) {
            if (error.response.status === 401) {
                const errorMsg =
                    "Anda perlu login terlebih dahulu untuk menggunakan fitur ini";
                if (setErrorMessage) setErrorMessage(errorMsg);
                console.error(errorMsg);
                return { success: false, message: errorMsg };
            } else if (error.response.status === 400) {
                // Handle the "Mood for today has already been recorded" error
                const errorMsg =
                    error.response.data?.detail ||
                    "Mood kamu untuk hari ini sudah terekam sebelumnya";
                if (setErrorMessage) setErrorMessage(errorMsg);
                console.error(errorMsg);
                return { success: false, message: errorMsg };
            }
        }

        const defaultErrorMsg =
            "Terjadi kesalahan saat mendeteksi mood. Silakan coba lagi nanti.";
        if (setErrorMessage) setErrorMessage(defaultErrorMsg);
        return { success: false, message: defaultErrorMsg };
    }
};
