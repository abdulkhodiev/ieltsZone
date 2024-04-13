import { $api } from "../interceptor";

export const getStudentInfo = async (registrationId) => {
    try {
        const res = await $api.get(`/registration/${registrationId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching applied users:", error);
        throw error;
    }
};

export const putSectionSecore = async (id, data) => {
    try {
        const res = await $api.put(`/result/${id}`, data);
        return res.data;
    } catch (error) {
        console.error("Error updating payment check:", error);
        throw error;
    }
};

export const examPicture = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await $api.post("/picture", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        console.error("Payment picture problem:", error);
        throw error;
    }
};

export const getSectionResults = async (registrationId) => {
    try {
        const res = await $api.get(
            `/result?exam-registration-id=${registrationId}`
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching applied users:", error);
        throw error;
    }
};
