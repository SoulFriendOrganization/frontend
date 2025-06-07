import axios from "axios";

export const GET_DATA = async (endpoint, token) => {
    const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/${endpoint}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
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

export const POST_DATA_SECOND = async (endpoint, data, token, header) => {
    const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_V2_BACKEND}/${endpoint}`,
        data,
        header
            ? header
            : {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                  },
              }
    );
    return response;
};

export const PUT_DATA = async (endpoint, data, header) => {
    const response = await axios.put(
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
