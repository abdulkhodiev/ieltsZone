import { $api } from "../interceptor";

export const getPayments = async (params) => {
	const res = await $api.get("payment-and-registration-statistics", {params});
	return res;
};
