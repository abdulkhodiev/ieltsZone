import { $api } from "../interceptor";

export const uploadMultipleFiles = async (files) => {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });

    try {
        const res = await $api.post(`/file-storage/list`, formData);
        return res.data;
    } catch (error) {
        console.error("Error uploading files:", error);
        throw error;
    }
};
