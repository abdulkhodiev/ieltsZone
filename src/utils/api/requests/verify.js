import { $api } from "../interceptor";

export const verify = async (sms) => {
    const res = await $api.post("/auth/verify", sms);
    return res.data;
};
