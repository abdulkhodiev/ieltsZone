import { $api } from "../interceptor";

export const forgetPassword = async (credentials) => {
    const res = await $api.post("/auth/forgot-password", credentials);
    return res.data;
};
