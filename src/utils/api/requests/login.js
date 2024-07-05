import Cookies from "js-cookie";
import { $apiAuth } from "../interceptor";

export const postLogin = async (phoneNumber, password) => {
    const res = await $apiAuth.post("/auth/signin", {
        phoneNumber,
        password,
    });

    const expires = 30;

    Cookies.set("token", res.data.token, { expires });
    Cookies.set("role", res.data.role, { expires });

    return res.data;
};
