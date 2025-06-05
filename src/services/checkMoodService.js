import { GET_DATA, POST_DATA } from "../api";
import Cookies from "js-cookie";

export const checkMoodTrialService = async (
    imageData,
    setUserExpression,
    setGlobalUserExpression = null
) => {
    try {
        const response = await POST_DATA("api/v1/mood/face-detection/trial", {
            image: imageData,
        });
        const prediction = response.data.prediction;
        setUserExpression(prediction);

        if (setGlobalUserExpression) {
            setGlobalUserExpression(prediction);
        }
    } catch (error) {
        console.log(error);
    }
};

export const checkMoodService = async (
    imageData,
    setUserExpression,
    setErrorMessage,
    setGlobalUserExpression = null
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
        const prediction = response.data.prediction;
        setUserExpression(prediction);

        // If global setter is provided, also update the global state
        if (setGlobalUserExpression) {
            setGlobalUserExpression(prediction);
        }

        return { success: true };
    } catch (error) {
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

export const getHomeService = async (setData) => {
    try {
        const token = Cookies.get("token");
        const response = await GET_DATA("api/v1/fetch_stat", token);
        setData(response.data);
    } catch (error) {
        console.log(error);
    }
};
