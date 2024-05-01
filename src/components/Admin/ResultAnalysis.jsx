import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
	Box,
	Collapse,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getScores } from "../../utils/api/requests/get-scores";

const ResultAnalysis = () => {
	const [scores, setScores] = useState();
	const [markIeltsZoneStudents, setMarkIeltsZoneStudents] = useState();

	const fetchScores = async (params) => {
		try {
			const res = await getScores(params);
			setScores(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchScores();
	}, []);

	if (!scores) {
		return null;
	}

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
				<Switch
					checked={markIeltsZoneStudents}
					onChange={() => setMarkIeltsZoneStudents((prev) => !prev)}
				/>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>Age</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						label='Age'
						onChange={(e) => fetchScores({ sort: e.target.value })}
					>
						<MenuItem value={"lowest"}>Lowest</MenuItem>
						<MenuItem value={"highest"}>Highest</MenuItem>
					</Select>
				</FormControl>
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
								<TableCell align='right'>Listening</TableCell>
								<TableCell align='right'>Reading</TableCell>
								<TableCell align='right'>Writing</TableCell>
								<TableCell align='right'>Speaking</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{scores.map((row) => (
								<Row
									key={row.name}
									row={row}
									markIeltsZoneStudents={
										markIeltsZoneStudents
									}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Stack>
	);
};

function Row(props) {
	const { row, markIeltsZoneStudents } = props;
	const [open, setOpen] = useState(false);

	return (
		<>
			<TableRow
				key={row.studentId}
				sx={{
					backgroundColor:
						row.isIeltsZoneStudent && markIeltsZoneStudents
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
				<TableCell align='right' component='th' scope='row'>
					{row.listening}
				</TableCell>
				<TableCell align='right'>{row.reading}</TableCell>
				<TableCell align='right'>{row.writing}</TableCell>
				<TableCell align='right'>{row.speaking}</TableCell>
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
