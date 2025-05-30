import axios from "axios";

export const GET_DATA = async (endpoint) => {
    const response = await axios.get(
        `${import.meta.env.BASE_URL_BACKEND}/${endpoint}`
    );
    return response;
};

export const POST_DATA = async (data, endpoint, header) => {
    const response = await axios.post(
        `${import.meta.env.BASE_URL_BACKEND}/${endpoint}`,
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
