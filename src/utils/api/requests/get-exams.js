import { $api } from "../interceptor";

export const getExams = async (params) => {
    const res = await $api.get("/exam/previews", { params });
    return res;
};

export const getUserAvailableExam = async () => {
    const res = await $api.get("/exam"); // /exam/all
    return res.data;
};
