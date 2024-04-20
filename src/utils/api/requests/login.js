import Cookies from "js-cookie";
import { $apiAuth } from "../interceptor";

export const postLogin = async (phoneNumber, password) => {
    const res = await $apiAuth.post("/auth/signin", {
        phoneNumber,
        password,
    });
    Cookies.set("token", res.data.token);
    Cookies.set("role", res.data.role);
    return res.data;
};
