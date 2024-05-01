import { $api } from "../interceptor";

export const getScores = async (params) => {
	const res = await $api.get("/result-statistics/scores", { params });
	return res;
};
