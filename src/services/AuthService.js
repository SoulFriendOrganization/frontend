import { POST_DATA } from "../api";
import Cookies from "js-cookie";

export const registerService = async (
    data,
    errorState,
    loadingState,
    navigate,
    reset
) => {
    try {
        loadingState(true);
        const apiData = {
            full_name: data.name,
            username: data.username,
            password: data.password,
            age: data.age,
        };
        await POST_DATA("api/v1/register", apiData);
        reset();
        navigate("/login");
    } catch (error) {
        errorState(error.message);
    } finally {
        loadingState(false);
    }
};

export const loginService = async (
    data,
    errorState,
    loadingState,
    navigate,
    reset
) => {
    try {
        loadingState(true);
        const loginData = {
            grant_type: "password",
            username: data.username,
            password: data.password,
            scope: "",
            client_id: "string",
            client_secret: "string",
        };
        const response = await POST_DATA(
            "api/v1/login",
            loginData,
            {
                "Content-Type": "application/x-www-form-urlencoded",
                accept: "application/json",
            },
            true
        );
        Cookies.set("token", response.data.access_token);
        console.log(response);
        reset();
        navigate("/home");
    } catch (error) {
        errorState(error.message);
    } finally {
        loadingState(false);
    }
};
