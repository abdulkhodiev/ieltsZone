import { $api } from "../interceptor";

export const getRegisteredExams = async () => {
    try {
        const res = await $api.get("exam/user-registered-exams");
        return res.data || [];
    } catch (error) {
        console.error("Failed to fetch registered exams:", error);
        throw error;
    }
};

export const getExamDetails = async (examRegistrationId) => {
    try {
        const res = await $api.get(
            `result?exam-registration-id=${examRegistrationId}`
        );
        return res.data || [];
    } catch (error) {
        console.error("Failed to fetch exam details:", error);
        throw error;
    }
};
