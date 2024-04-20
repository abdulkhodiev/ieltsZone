import { $api } from "../interceptor";

export const userInfo = async (examId, data) => {
    const res = await $api.post(
        `/registration/register?examId=${examId}`,
        data
    );
    return res.data;
};

export const paymentPic = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file); // Append the file to the FormData object

        const res = await $api.post("/picture", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
            },
        });
        return res.data;
    } catch (error) {
        console.error("Payment picture problem:", error);
        throw error;
    }
};

export const speakingDates = async (examId, availabTime) => {
    try {
        const res = await $api.get(`/exam/${examId}`, availabTime);
        return res.data;
    } catch (error) {
        console.error("Speaking dates problem:", error);
        throw error;
    }
};

export const cancelReservation = async (studentId) => {
    const res = await $api.put(
        `/registration/cancel-reservation?examId=${studentId}`
    );
    return res.data;
};
