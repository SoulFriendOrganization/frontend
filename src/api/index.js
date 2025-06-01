import axios from "axios";

export const GET_DATA = async (endpoint) => {
    const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/${endpoint}`
    );
    return response;
};

export const POST_DATA = async (endpoint, data, header, fromUrl = false) => {
    if (fromUrl) {
        const formData = new URLSearchParams();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        data = formData;
    }

    const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/${endpoint}`,
        data,
        header
            ? header
            : {
                  headers: {
                      "Content-Type": "application/json",
                  },
              }
    );
    return response;
};
