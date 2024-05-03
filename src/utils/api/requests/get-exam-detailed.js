import { $api } from "../interceptor";

export const getExamDetailed = async (id) => {
	const res = await $api.get(`/exam-result/detailed/${id}`);
	return res;
};
