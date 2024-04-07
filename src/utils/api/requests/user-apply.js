import { $api } from "../interceptor";

export const userInfo = async (data) => {
    const res = await $api.post("/registration/register", data);
    return res.data;
};

export const paymentPic = async (file) => {
    try {
        const res = await $api.post("/picture", file);
        return res.data;
    } catch (error) {
        console.error("Payment picture problem:", error);
        throw error;
    }
};

export const speakingDates = async (examId, availabTime) => {
    try {
        const res = await $api.get(`/exam/${examId}`, availabTime);
        return res.data;
    } catch (error) {
        console.error("Speaking dates problem:", error);
        throw error;
    }
};
