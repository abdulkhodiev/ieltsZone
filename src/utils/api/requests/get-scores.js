import { $api } from "../interceptor";

export const getScores = async (params) => {
	const res = await $api.get("/admin/result-statistics/scores", { params });
	return res;
};
