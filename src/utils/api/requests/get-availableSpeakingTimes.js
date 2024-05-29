import { $api } from "../interceptor";

export const getAvailableSpeakingTimes = async (examId) => {
    const res = await $api.get(`/exam/${examId}/speaking-dates`);

    console.log(res.data);
    return res.data;
};
