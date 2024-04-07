import { $api } from "../interceptor";

export const getAdmins = async () => {
    try {
        const res = await $api.get("/users/admins");
        return res.data; // Return the data from the response
    } catch (error) {
        console.error("Failed to fetch admins:", error);
        throw error; // Rethrow the error to handle it in the component
    }
};
