import { $api } from "../interceptor";

export const getAppliedUsers = async (examId) => {
    try {
        const res = await $api.get(`/registration/${examId}/all`);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error("Error fetching applied users:", error);
        throw error;
    }
};

export const getAppliedUserPaymentCheck = async (registrationId) => {
    try {
        const res = await $api.get(`/registration/${registrationId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching applied users:", error);
        throw error;
    }
};

export const updatePaymentCheck = async (id, data) => {
    try {
        const res = await $api.put(`/registration/payment-check/${id}`, data);
        return res.data;
    } catch (error) {
        console.error("Error updating payment check:", error);
        throw error;
    }
};
