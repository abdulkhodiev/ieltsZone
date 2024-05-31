import { TableRow as MTableRow, TableCell } from "@mui/material";

export const TableRow = ({ row, index }) => {
	return (
		<MTableRow
			key={row.studentId}
			sx={{
				"&:last-child td, &:last-child th": {
					border: 0,
				},
			}}
		>
			<TableCell align='right'>{index + 1}</TableCell>
			<TableCell align='right'>{row.countOfRegistrations}</TableCell>
			<TableCell align='right'>
				{row.countOfAcceptedRegistrations}
			</TableCell>
			<TableCell align='right'>{row.countOfExams}</TableCell>
			<TableCell align='right'>{row.countOfIeltsZoneStudents}</TableCell>
			<TableCell align='right' component='th' scope='row'>
				{row.sumOfPayments}
			</TableCell>
		</MTableRow>
	);
};
