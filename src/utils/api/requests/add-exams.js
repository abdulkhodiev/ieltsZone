import { $api } from "../interceptor";

export const AddExam = async (examData) => {
    const {
        examDateTime,
        price,
        numberOfPlaces,
        location,
        locationUrl,
        details,
        speakingDates,
        cardNumber,
        cardHolderName,
    } = examData;
    const res = await $api.post("/exam", {
        examDateTime,
        price,
        numberOfPlaces,
        location,
        locationUrl,
        details,
        speakingDates,
        cardNumber,
        cardHolderName,
    });
    return res.data;
};

export const EditExam = async (examId, examData) => {
    const res = await $api.put(`/exam/${examId}`, examData);
    return res.data;
};

export const getExamById = async (examId) => {
    try {
        const response = await $api.get(`/exam/${examId}/update`);
        return response.data;
    } catch (error) {
        console.error("Fetching exam details failed:", error);
        throw error;
    }
};

export const getExams = async () => {
    try {
        const res = await $api.get("/exam");
        return res.data || [];
    } catch (error) {
        console.error("Failed to fetch exams:", error);
        throw error;
    }
};
export const getAllExams = async () => {
    try {
        const res = await $api.get("/exam/all");
        return res.data || [];
    } catch (error) {
        console.error("Failed to fetch exams:", error);
        throw error;
    }
};

export const getMe = async () => {
    const res = await $api.get("users/me");
    return res.data;
};

export const deleteExams = async (examId) => {
    try {
        const response = await $api.delete(`/exam/${examId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting exam:", error);
        throw error;
    }
};

export const deleteFeedbackFolders = async (examId) => {
    try {
        await $api.delete(`/exam-result/old-files?examId=${examId}`);
    } catch (error) {
        console.error("Error deleting feedback folders:", error);
        throw error;
    }
};

export const reserveExamTemporariy = async (examId) => {
    try {
        const response = await $api.post(
            `/registration/reserve?examId=${examId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error reserving:", error);
        throw error;
    }
};

export const examInformation = async (examId) => {
    try {
        const response = await $api.get(`/exam/audit/${examId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching exam information:", error);
        throw error;
    }
};
