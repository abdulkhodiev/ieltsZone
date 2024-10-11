import {
	Box,
	LinearProgress,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getExamDetailed } from "../../../utils/api/requests/get-exam-detailed";

export const TableRowDetails = ({ id }) => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	const fetchResultDetails = async () => {
		setLoading(true);
		try {
			const res = await getExamDetailed(id);
			setData(res.data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchResultDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <LinearProgress />;

	return (
		<Box sx={{ margin: 1 }}>
			<Typography variant='h6' gutterBottom component='div'>
				Details
			</Typography>
			<Table size='small' aria-label='purchases'>
				<TableHead>
					<TableRow>
						<TableCell>First name</TableCell>
						<TableCell>Last name</TableCell>
						<TableCell align='right'>Phone number</TableCell>
						<TableCell align='right'>Exam date</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell component='th' scope='row'>
							{data.firstName}
						</TableCell>
						<TableCell>{data.lastName}</TableCell>
						<TableCell align='right'>{data.phoneNumber}</TableCell>
						<TableCell align='right'>
							{dayjs(data.examDate).format("DD.MM.YYYY")}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Box>
	);
};
