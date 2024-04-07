import Cookies from "js-cookie";
import { $apiAuth } from "../interceptor";

export const postLogin = async (phoneNumber, password) => {
    try {
        const res = await $apiAuth.post("/auth/signin", {
            phoneNumber,
            password,
        });
        Cookies.set("token", res.data.token);
        return res.data;
    } catch (error) {
        console.error("Error in postLogin:", error);
        throw error;
    }
};
