import {
	CircularProgress,
	Table as MTable,
	Paper,
	Stack,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import Row from "./TableRow";

export const Table = ({ data, loading, markIeltsZoneStudents }) => {
	if (loading)
		return (
			<Stack alignItems={"center"}>
				<CircularProgress />
			</Stack>
		);

	return (
		<TableContainer
			component={Paper}
			sx={{
				boxShadow: "none",
				margin: 0,
				padding: 0,
				border: "1px solid #EEEEEE",
				borderRadius: "1rem",
			}}
		>
			<MTable aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell align='right'>#</TableCell>
						<TableCell align='right'>Listening</TableCell>
						<TableCell align='right'>Reading</TableCell>
						<TableCell align='right'>Writing</TableCell>
						<TableCell align='right'>Speaking</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.map((row, index) => (
						<Row
							key={row.candidateId}
							row={row}
							index={index}
							markIeltsZoneStudents={markIeltsZoneStudents}
						/>
					))}
				</TableBody>
			</MTable>
		</TableContainer>
	);
};
