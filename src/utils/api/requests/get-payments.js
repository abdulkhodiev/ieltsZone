import { $api } from "../interceptor";

export const getPayments = async () => {
	const res = await $api.get("payment-and-registration-statistics");
	return res;
};
