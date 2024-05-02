import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
<<<<<<< HEAD
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
            direction="column"
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
                <TableCell>{row.studentId}</TableCell>
                <TableCell align="right" component="th" scope="row">
                    {row.listeningScore}
                </TableCell>
                <TableCell align="right">{row.readingScore}</TableCell>
                <TableCell align="right">{row.writingScore}</TableCell>
                <TableCell align="right">{row.speakingScore}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First name</TableCell>
                                        <TableCell>Last name</TableCell>
                                        <TableCell align="right">Age</TableCell>
                                        <TableCell align="right">
                                            Total price ($)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.from({ length: 3 }).map(
                                        (_, index) => (
                                            <TableRow key={index}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    Donald
                                                </TableCell>
                                                <TableCell>Monroe</TableCell>
                                                <TableCell align="right">
                                                    26
                                                </TableCell>
                                                <TableCell align="right">
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
import { getScores } from "../../utils/api/requests/get-scores";
// const data = [
// 	{
// 		studentId: 1,
// 		listening: 5.5,
// 		reading: 5.0,
// 		writing: 5.0,
// 		speaking: 5.0,
// 		overallScore: 6.0,
// 		isIeltsZoneStudent: true,
// 	},
// 	{
// 		studentId: 2,
// 		listening: 5.5,
// 		reading: 5.0,
// 		writing: 5.0,
// 		speaking: 5.0,
// 		overallScore: 6.0,
// 		isIeltsZoneStudent: false,
// 	},
// 	{
// 		studentId: 3,
// 		listening: 5.5,
// 		reading: 5.0,
// 		writing: 5.0,
// 		speaking: 5.0,
// 		overallScore: 6.0,
// 		isIeltsZoneStudent: true,
// 	},
// 	{
// 		studentId: 4,
// 		listening: 5.5,
// 		reading: 5.0,
// 		writing: 5.0,
// 		speaking: 5.0,
// 		overallScore: 6.0,
// 		isIeltsZoneStudent: false,
// 	},
// ];
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
					<InputLabel id='demo-simple-select-label'>Sort</InputLabel>
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
				<Chip
					label='IeltsZone Students'
					variant={markIeltsZoneStudents ? "filled" : "outlined"}
					checked={markIeltsZoneStudents}
					onClick={() => setMarkIeltsZoneStudents((prev) => !prev)}
				/>
				{/* <Switch
					checked={markIeltsZoneStudents}
					onChange={() => setMarkIeltsZoneStudents((prev) => !prev)}
				/> */}
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
>>>>>>> 7b432538b4c9a6b7083ba60ed5e97443daab8e46
}

export default ResultAnalysis;
