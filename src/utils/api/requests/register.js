import Cookies from "js-cookie";
import { $apiAuth } from "../interceptor";

export const register = async (userData) => {
    try {
        const res = await $apiAuth.post("/auth/register", userData);
        return res.data;
    } catch (error) {
        console.error("Error in SignUp:", error);
        throw error;
    }
};
