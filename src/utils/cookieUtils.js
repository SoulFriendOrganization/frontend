import Cookies from "js-cookie";

export const getCookie = (name) => {
    return Cookies.get(name);
};

export const setCookie = (name, value, options = {}) => {
    const defaultOptions = {
        expires: 365,
        path: "/",
        ...options,
    };
    Cookies.set(name, value, defaultOptions);
};

export const removeCookie = (name) => {
    Cookies.remove(name);
};

export const COOKIE_KEYS = {
    MOOD_CHECK_AGREEMENT: "mood_check_camera_agreement",
    CAMERA_PERMISSION_SHOWN: "camera_permission_shown",
    DONT_SHOW_MOOD_ALERT: "dont_show_mood_alert",
};

export const hasAgreedToMoodCheck = () => {
    return getCookie(COOKIE_KEYS.MOOD_CHECK_AGREEMENT) === "true";
};

export const setMoodCheckAgreement = (agreed = true) => {
    setCookie(COOKIE_KEYS.MOOD_CHECK_AGREEMENT, agreed.toString());
};

export const shouldShowMoodAlert = () => {
    return getCookie(COOKIE_KEYS.DONT_SHOW_MOOD_ALERT) !== "true";
};

export const setDontShowMoodAlert = () => {
    setCookie(COOKIE_KEYS.DONT_SHOW_MOOD_ALERT, "true");
};

export const resetMoodPreferences = () => {
    removeCookie(COOKIE_KEYS.MOOD_CHECK_AGREEMENT);
    removeCookie(COOKIE_KEYS.DONT_SHOW_MOOD_ALERT);
};
