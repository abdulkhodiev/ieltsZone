import { $api } from "../interceptor";

export const getScores = async (params) => {
	const res = await $api.get("/result-statistics/scores", { params });
	return res;
};

export const getAverageScore = async (params) => {
	const res = await $api.get("/result-statistics/average-score", { params });
	return res;
};
