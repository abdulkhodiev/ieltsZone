import { $api } from "../interceptor";

export const getScores = async () => {
	const res = await $api.get("/admin/scores");
	return res.data;
};
