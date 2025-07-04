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

        setGlobalUserExpression(prediction);
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
        setGlobalUserExpression(prediction);
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                setErrorMessage(
                    "Anda perlu login terlebih dahulu untuk menggunakan fitur ini"
                );
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            } else if (error.response.status === 400) {
                const errorMsg =
                    error.response.data?.detail ||
                    "Mood kamu untuk hari ini sudah terekam sebelumnya";
                setErrorMessage(errorMsg);
            }
        }
        setErrorMessage(
            "Terjadi kesalahan saat mendeteksi mood. Silakan coba lagi nanti."
        );
    }
};

export const getHomeService = async (setData, setLoading) => {
    try {
        setLoading(true);
        const token = Cookies.get("token");
        const response = await GET_DATA("api/v1/fetch_stat", token);
        setData(response.data);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            setData({ redirect_url: "/login" });
            Cookies.remove("token");
        } else if (error.response && error.response.status === 307) {
            setData({ redirect_url: error.response.data.detail.redirect_url });
        }
    } finally {
        setLoading(false);
    }
};
