import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getExams } from "../../../utils/api/requests/get-exams";
import {
    getAverageScore,
    getScores,
} from "../../../utils/api/requests/get-scores";
export const TableControl = ({
    setScores,
    setLoading,
    markIeltsZoneStudents,
    setMarkIeltsZoneStudents,
}) => {
    const [exams, setExams] = useState();
    const [isAverage, setIsAverage] = useState();
    const [currentScoresSortType, setCurrentScoresSortType] =
        useState("highest");
    const [currentAverageScoresSortType, setCurrentAverageScoresSortType] =
        useState("");

    const fetchScores = async (params) => {
        setLoading(true);
        try {
            const res = await getScores(params);
            setScores(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAverageScore = async (params) => {
        setLoading(true);
        setCurrentAverageScoresSortType(params?.sort || "");
        try {
            const res = await getAverageScore(
                params?.sort ? params : undefined
            );
            setScores([res.data]);
        } catch (err) {
            console.error(err);
            setCurrentAverageScoresSortType("");
        } finally {
            setLoading(false);
        }
    };
    const fetchExams = async (params) => {
        try {
            const res = await getExams(params);
            setExams(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchScores();
        fetchExams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            direction={"row"}
            justifyContent={"start"}
            alignItems={"center"}
            marginBottom={"1rem"}
            gap={"1rem"}
            flexWrap={"wrap"}
        >
            <Box>
                <FormControl fullWidth sx={{ width: 200, marginRight: "1rem" }}>
                    <InputLabel>Exams</InputLabel>
                    <Select
                        defaultValue={"all"}
                        label="Exams"
                        onChange={(e) => handleExamChange(e)}
                        sx={{
                            "& .MuiSelect-select": {
                                paddingRight: 4,
                                paddingLeft: 2,
                                paddingTop: 1,
                                paddingBottom: 1,
                            },
                        }}
                    >
                        <MenuItem value={"all"}>All</MenuItem>
                        {exams?.map((exam) => (
                            <MenuItem key={exam.id} value={exam.id}>
                                {dayjs(exam.examDateTime).format("DD.MM.YYYY")}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ width: 120 }}>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        defaultValue={"all"}
                        sx={{
                            "& .MuiSelect-select": {
                                paddingRight: 4,
                                paddingLeft: 2,
                                paddingTop: 1,
                                paddingBottom: 1,
                            },
                        }}
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
            </Box>
            <Box display={"flex"} gap={"1rem"}>
                {isAverage ? (
                    <>
                        <Chip
                            sx={{
                                fontSize: "1rem",
                            }}
                            color="primary"
                            label="Overall"
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
                            sx={{
                                fontSize: "1rem",
                            }}
                            label="Only IeltsZone students"
                            color="primary"
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
                            sx={{
                                fontSize: "1rem",
                            }}
                            color="primary"
                            label="Not IeltsZone students"
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
                            sx={{
                                fontSize: "1rem",
                            }}
                            label="IELTS ZONE Students"
                            color="primary"
                            variant={
                                markIeltsZoneStudents ? "filled" : "outlined"
                            }
                            checked={markIeltsZoneStudents}
                            onClick={() =>
                                setMarkIeltsZoneStudents(!markIeltsZoneStudents)
                            }
                        />
                        <Chip
                            sx={{
                                fontSize: "1rem",
                            }}
                            label="highest"
                            color="primary"
                            variant={
                                currentScoresSortType === "highest"
                                    ? "filled"
                                    : "outlined"
                            }
                            checked={currentScoresSortType === "highest"}
                            onClick={() => {
                                fetchScores({ sort: "highest" });
                                setCurrentScoresSortType("highest");
                            }}
                        />
                        <Chip
                            sx={{
                                fontSize: "1rem",
                            }}
                            label="lowest"
                            color="primary"
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
            </Box>
        </Stack>
    );
};
