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
    } = examData;
    const res = await $api.post("/exam", {
        examDateTime,
        price,
        numberOfPlaces,
        location,
        locationUrl,
        details,
        speakingDates,
    });
    return res.data; // Assuming you want to return the response data
};

export const EditExam = async (examId, examData) => {
    const res = await $api.put(`/exam/${examId}`, examData); // Send examData as the request body
    return res.data;
};

// Assuming $api is an Axios instance already configured elsewhere in your project
export const getExamById = async (examId) => {
    try {
        const response = await $api.get(`/exam/${examId}`);
        return response.data; // This should be the exam details object
    } catch (error) {
        console.error("Fetching exam details failed:", error);
        throw error; // Rethrowing the error so it can be handled or logged by the caller
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

export const deleteExams = async (examId) => {
    try {
        const response = await $api.delete(`/exam/${examId}`);
    } catch (error) {
        console.error("Error deleting exam:", error);
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
