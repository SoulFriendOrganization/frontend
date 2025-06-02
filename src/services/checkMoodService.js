import { POST_DATA } from "../api";

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
