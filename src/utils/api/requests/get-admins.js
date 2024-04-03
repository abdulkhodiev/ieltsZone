import { $api } from "../interceptor";

export const getAdmins = async () => {
    const res = await $api.get("/users/admins");
};
