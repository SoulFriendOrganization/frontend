import Cookies from "js-cookie";

// Cookie utility functions for better UX
export const getCookie = (name) => {
    return Cookies.get(name);
};

export const setCookie = (name, value, options = {}) => {
    const defaultOptions = {
        expires: 365, // 1 year by default
        path: "/",
        ...options,
    };
    Cookies.set(name, value, defaultOptions);
};

export const removeCookie = (name) => {
    Cookies.remove(name);
};

// Specific cookie keys for user preferences
export const COOKIE_KEYS = {
    MOOD_CHECK_AGREEMENT: "mood_check_camera_agreement",
    CAMERA_PERMISSION_SHOWN: "camera_permission_shown",
    DONT_SHOW_MOOD_ALERT: "dont_show_mood_alert",
};

// Check if user has already agreed to camera usage for mood check
export const hasAgreedToMoodCheck = () => {
    return getCookie(COOKIE_KEYS.MOOD_CHECK_AGREEMENT) === "true";
};

// Set user agreement for mood check
export const setMoodCheckAgreement = (agreed = true) => {
    setCookie(COOKIE_KEYS.MOOD_CHECK_AGREEMENT, agreed.toString());
};

// Check if user doesn't want to see mood check alert anymore
export const shouldShowMoodAlert = () => {
    return getCookie(COOKIE_KEYS.DONT_SHOW_MOOD_ALERT) !== "true";
};

// Set user preference to not show mood alert
export const setDontShowMoodAlert = () => {
    setCookie(COOKIE_KEYS.DONT_SHOW_MOOD_ALERT, "true");
};

// Reset all mood-related preferences (useful for testing/debugging)
export const resetMoodPreferences = () => {
    removeCookie(COOKIE_KEYS.MOOD_CHECK_AGREEMENT);
    removeCookie(COOKIE_KEYS.DONT_SHOW_MOOD_ALERT);
};
