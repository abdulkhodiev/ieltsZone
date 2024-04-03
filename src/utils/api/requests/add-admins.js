import { $api } from "../interceptor";

export const AddAdminJs = async (
    firstName,
    lastName,
    phoneNumber,
    password,
    role
) => {
    const res = await $api.post("/users", {
        firstName,
        lastName,
        phoneNumber,
        password,
        role: "ADMIN",
    });
};
