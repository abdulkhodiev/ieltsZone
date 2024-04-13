import { $api } from "../interceptor";

export const getAcceptedUsers = async (examId) => {
    try {
        const res = await $api.get(
            `/registration/accepted-registrations?examId=${examId}`
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching accepted users:", error);
        throw error;
    }
};

export const excelDownload = async (examId) => {
    try {
        const res = await $api.get(
            `/registration/download-excel?examId=${examId}`
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching accepted users:", error);
        throw error;
    }
};
