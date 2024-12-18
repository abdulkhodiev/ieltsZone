import { $api } from "../interceptor";

export const getExamResults = async (registrationId) => {
    try {
        const res = await $api.get(
            `/exam-result/exam-registration/${registrationId}`
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching applied users:", error);
        throw error;
    }
};

export const postFeedbackFolder = async (data) => {
    try {
        const res = await $api.post("/file-storage", data);
        return res.data;
    } catch (error) {
        console.error("Error fetching applied users:", error);
        throw error;
    }
};

export const deleteFile = async (id) => {
    try {
        const res = await $api.delete(`/file-storage/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching applied users:", error);
        throw error;
    }
};

export const getFeedbackFolder = async (id) => {
    try {
        const res = await $api.get(`/file-storage/download-file?id=${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching applied users:", error);
        throw error;
    }
};

export const registerForLesson = async (id) => {
    try {
        const res = await $api.post(
            "/course-registration?examRegistrationId=" + id
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching applied users:", error);
        throw error;
    }
};

export const putSectionScores = async (id, data) => {
    try {
        const res = await $api.put(`/exam-result/${id}`, data);
        return res.data;
    } catch (error) {
        console.error("Error updating payment check:", error);
        throw error;
    }
};

export const getStudentInfo = async (registrationId) => {
    try {
        const res = await $api.get(`/registration/${registrationId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching applied users:", error);
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
