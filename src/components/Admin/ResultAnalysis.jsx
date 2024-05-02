import { useState, useEffect } from "react";
import {
<<<<<<< HEAD
	Box,
	Chip,
	Collapse,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getExams } from "../../utils/api/requests/get-exams";
import {
	getAverageScore,
	getScores,
} from "../../utils/api/requests/get-scores";

const ResultAnalysis = () => {
	const [scores, setScores] = useState();
	const [markIeltsZoneStudents, setMarkIeltsZoneStudents] = useState();
	const [isAverage, setIsAverage] = useState();
	const [currentScoresSortType, setCurrentScoresSortType] = useState("");
	const [currentAverageScoresSortType, setCurrentAverageScoresSortType] =
		useState("");
	const [exams, setExams] = useState();

	const fetchScores = async (params) => {
		try {
			const res = await getScores(params);
			setScores(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	const fetchAverageScore = async (params) => {
		setCurrentAverageScoresSortType(params?.sort || "");
		try {
			const res = await getAverageScore(
				params?.sort ? params : undefined
			);
			setScores([res.data]);
		} catch (err) {
			console.log(err);
			setCurrentAverageScoresSortType("");
		}
	};

	const fetchExams = async (params) => {
		try {
			const res = await getExams(params);
			setExams(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchScores();
		fetchExams();
	}, []);

	const handleExamChange = (e) => {
		const value = e.target.value;
		if (value && value !== "all") {
			if (isAverage) {
				fetchAverageScore({ examId: value });
			} else {
				fetchScores({ examId: value });
			}
		} else {
			if (isAverage) {
				fetchAverageScore();
			} else {
				fetchScores();
			}
		}
	};

	return (
		<Stack
			direction='column'
			sx={{
				width: { xs: "100%", lg: "90%" },
				justifyContent: "center",
				padding: "1.5rem 0.5rem",
			}}
		>
			<Stack
				direction={"row"}
				justifyContent={"start"}
				alignItems={"center"}
				marginBottom={"1rem"}
				gap={"1rem"}
			>
				<FormControl fullWidth sx={{ width: 120 }}>
					<InputLabel>Exams</InputLabel>
					<Select
						defaultValue={"all"}
						label='Exams'
						onChange={(e) => handleExamChange(e)}
					>
						<MenuItem value={"all"}>All</MenuItem>
						{exams?.map((exam) => (
							<MenuItem key={exam.id} value={exam.id}>
								{exam.examDateTime}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl fullWidth sx={{ width: 120 }}>
					<InputLabel id='demo-simple-select-label'>Sort</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						label='Age'
						onChange={(e) => {
							e.target.value === "all"
								? fetchScores()
								: fetchAverageScore();
							setIsAverage(e.target.value === "average");
						}}
					>
						<MenuItem value={"all"}>All</MenuItem>
						<MenuItem value={"average"}>Average</MenuItem>
					</Select>
				</FormControl>
				{isAverage ? (
					<>
						<Chip
							label='Overall'
							variant={
								currentAverageScoresSortType === ""
									? "filled"
									: "outlined"
							}
							checked={currentAverageScoresSortType === ""}
							onClick={() => {
								fetchAverageScore({ sort: "" });
							}}
						/>
						<Chip
							label='Only IeltsZone students'
							variant={
								currentAverageScoresSortType === "students"
									? "filled"
									: "outlined"
							}
							checked={
								currentAverageScoresSortType === "students"
							}
							onClick={() => {
								fetchAverageScore({ sort: "students" });
							}}
						/>
						<Chip
							label='Not IeltsZone students'
							variant={
								currentAverageScoresSortType === "non-students"
									? "filled"
									: "outlined"
							}
							checked={
								currentAverageScoresSortType === "non-students"
							}
							onClick={() => {
								fetchAverageScore({ sort: "non-students" });
							}}
						/>
					</>
				) : (
					<>
						<Chip
							label='IeltsZone Students'
							variant={
								markIeltsZoneStudents ? "filled" : "outlined"
							}
							checked={markIeltsZoneStudents}
							onClick={() =>
								setMarkIeltsZoneStudents(!markIeltsZoneStudents)
							}
						/>
						<Chip
							label='highest'
							variant={
								currentScoresSortType === "hightest"
									? "filled"
									: "outlined"
							}
							checked={currentScoresSortType === "hightest"}
							onClick={() => {
								fetchScores({ sort: "highest" });
								setCurrentScoresSortType("hightest");
							}}
						/>
						<Chip
							label='lowest'
							variant={
								currentScoresSortType === "lowest"
									? "filled"
									: "outlined"
							}
							checked={currentScoresSortType === "lowest"}
							onClick={() => {
								fetchScores({ sort: "lowest" });
								setCurrentScoresSortType("lowest");
							}}
						/>
					</>
				)}
			</Stack>
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
							<TableCell align='right'>#</TableCell>
							<TableCell align='right'>Listening</TableCell>
							<TableCell align='right'>Reading</TableCell>
							<TableCell align='right'>Writing</TableCell>
							<TableCell align='right'>Speaking</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{scores?.map((row, index) => (
							<Row
								key={row.name}
								row={row}
								index={index}
								markIeltsZoneStudents={markIeltsZoneStudents}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

function Row(props) {
	const { row, markIeltsZoneStudents, index } = props;
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
				<TableCell align='right'>{index + 1}</TableCell>
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
=======
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getScores } from "../../utils/api/requests/get-scores";

const ResultAnalysis = () => {
    const [scores, setScores] = useState([]);
    const [markIeltsZoneStudents, setMarkIeltsZoneStudents] = useState(false);

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
            direction="column"
            sx={{
                width: { xs: "100%", lg: "90%" },
                justifyContent: "center",
                alignItems: "center",
                padding: "1.5rem 0.5rem",
            }}
        >
            <Switch
                checked={markIeltsZoneStudents}
                onChange={() => setMarkIeltsZoneStudents((prev) => !prev)}
                sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value=""
                    label="Sort By"
                    onChange={(e) => fetchScores({ sort: e.target.value })}
                >
                    <MenuItem value={"lowest"}>Lowest Score</MenuItem>
                    <MenuItem value={"highest"}>Highest Score</MenuItem>
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
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>#</TableCell>
                            <TableCell align="right">Listening</TableCell>
                            <TableCell align="right">Reading</TableCell>
                            <TableCell align="right">Writing</TableCell>
                            <TableCell align="right">Speaking</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scores.map((row) => (
                            <Row
                                key={row.studentId}
                                row={row}
                                markIeltsZoneStudents={markIeltsZoneStudents}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

function Row({ row, markIeltsZoneStudents }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow
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
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.studentId}
                </TableCell>
                <TableCell align="right">{row.listeningScore}</TableCell>
                <TableCell align="right">{row.readingScore}</TableCell>
                <TableCell align="right">{row.writingScore}</TableCell>
                <TableCell align="right">{row.speakingScore}</TableCell>
            </TableRow>
            <CollapseRow open={open} />
        </>
    );
}

function CollapseRow({ open }) {
    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Details
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell align="right">Age</TableCell>
                                    <TableCell align="right">
                                        Total Price ($)
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            Donald
                                        </TableCell>
                                        <TableCell>Monroe</TableCell>
                                        <TableCell align="right">26</TableCell>
                                        <TableCell align="right">
                                            $300
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
>>>>>>> cd76361 (latest update)
}

export default ResultAnalysis;
