import { $api } from "../interceptor";

export const getExams = async (params) => {
    const res = await $api.get("/exam/previews", { params });
    return res;
};
