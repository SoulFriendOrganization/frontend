/* eslint-disable no-unused-vars */
import { POST_DATA_SECOND } from "../api";
import Cookies from "js-cookie";

export const validateWebsiteService = async (url, setState, setLoading) => {
    try {
        const token = Cookies.get("token");
        setLoading(true);
        const response = await POST_DATA_SECOND(
            "api/v1/check_harmful",
            {
                url,
            },
            token
        );
        setState(response.data);
    } catch (error) {
        setState({
            is_harmful: null,
            summary_harmful:
                "Terjadi kesalahan saat memvalidasi website. Silakan coba lagi nanti.",
        });
    } finally {
        setLoading(false);
    }
};
