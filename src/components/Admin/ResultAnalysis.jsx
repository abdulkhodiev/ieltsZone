import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
	Box,
	Collapse,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useState } from "react";

const data = [
	{
		studentId: 1,
		listeningScore: 5.5,
		readingScore: 5.0,
		writingScore: 5.0,
		speakingScore: 5.0,
		overallAcore: 6.0,
		isIeltsZoneStudent: true,
	},
	{
		studentId: 2,
		listeningScore: 5.5,
		readingScore: 5.0,
		writingScore: 5.0,
		speakingScore: 5.0,
		overallAcore: 6.0,
		isIeltsZoneStudent: false,
	},
	{
		studentId: 3,
		listeningScore: 5.5,
		readingScore: 5.0,
		writingScore: 5.0,
		speakingScore: 5.0,
		overallAcore: 6.0,
		isIeltsZoneStudent: true,
	},
	{
		studentId: 4,
		listeningScore: 5.5,
		readingScore: 5.0,
		writingScore: 5.0,
		speakingScore: 5.0,
		overallAcore: 6.0,
		isIeltsZoneStudent: false,
	},
];

const ResultAnalysis = () => {
	return (
		<Stack
			direction='column'
			sx={{
				width: { xs: "100%", lg: "90%" },
				justifyContent: "center",
				alignItems: "center",
				padding: "1.5rem 0.5rem",
			}}
		>
			<Box sx={{ width: "100%" }}>
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
					<Table aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell />
								<TableCell>#</TableCell>
								<TableCell align='right'>Listening</TableCell>
								<TableCell align='right'>Reading</TableCell>
								<TableCell align='right'>Writing</TableCell>
								<TableCell align='right'>Speaking</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((row) => (
								<Row key={row.name} row={row} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Stack>
	);
};

function Row(props) {
	const { row } = props;
	const [open, setOpen] = useState(false);

	return (
		<>
			<TableRow
				key={row.studentId}
				sx={{
					backgroundColor: row.isIeltsZoneStudent
						? "#dcffe6"
						: "#fff",
					"&:last-child td, &:last-child th": {
						border: 0,
					},
				}}
			>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
				<TableCell>{row.studentId}</TableCell>
				<TableCell align='right' component='th' scope='row'>
					{row.listeningScore}
				</TableCell>
				<TableCell align='right'>{row.readingScore}</TableCell>
				<TableCell align='right'>{row.writingScore}</TableCell>
				<TableCell align='right'>{row.speakingScore}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant='h6'
								gutterBottom
								component='div'
							>
								Details
							</Typography>
							<Table size='small' aria-label='purchases'>
								<TableHead>
									<TableRow>
										<TableCell>First name</TableCell>
										<TableCell>Last name</TableCell>
										<TableCell align='right'>Age</TableCell>
										<TableCell align='right'>
											Total price ($)
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{Array.from({ length: 3 }).map(
										(_, index) => (
											<TableRow key={index}>
												<TableCell
													component='th'
													scope='row'
												>
													Donald
												</TableCell>
												<TableCell>Monroe</TableCell>
												<TableCell align='right'>
													26
												</TableCell>
												<TableCell align='right'>
													$300
												</TableCell>
											</TableRow>
										)
									)}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

export default ResultAnalysis;
