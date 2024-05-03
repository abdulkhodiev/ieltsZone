import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getPayments } from "../../../utils/api/requests/get-payments";
import { Table } from "./Table";

export const PaymentAnalysis = () => {
	const [payments, setPayments] = useState();
	const [loading, setLoading] = useState(true);

	const fetchPayments = async () => {
		setLoading(true);
		try {
			const res = await getPayments();
			setPayments([res.data]);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPayments();
	}, []);

	return (
		<Stack
			direction='column'
			sx={{
				width: { xs: "100%", lg: "90%" },
				justifyContent: "center",
				padding: "1.5rem 0.5rem",
			}}
		>
			<Table data={payments} loading={loading} />
		</Stack>
	);
};
