import { $api } from "../interceptor";

export const verify = async (sms) => {
    const res = await $api.post(`/auth/verify?code=${sms}`);
    return res;
};

export const resetPasswordVerify = async (sms) => {
    const res = await $api.post(`/auth/reset-password?code=${sms}`);
    return res;
};
