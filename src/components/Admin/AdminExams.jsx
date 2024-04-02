import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Stack,
    Box,
    Button,
} from "@mui/material";
import { colors } from "../../constants/colors";
import { Link } from "react-router-dom";
import { Delete, Edit, PeopleAlt } from "@mui/icons-material";
import axios from "axios";

const AdminExams = () => {
    const [exams, setExams] = useState([]);

    // Initialize Axios instance
    const api = axios.create({
        baseURL: "http://localhost:8070/api/v1",
    });

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await api.get("/exam");
                if (Array.isArray(response.data)) {
                    const formattedExams = response.data.map((exam) => {
                        const examDate = new Date(exam.examDateTime);
                        const day = String(examDate.getDate()).padStart(2, "0");
                        const month = String(examDate.getMonth() + 1).padStart(
                            2,
                            "0"
                        );
                        const year = examDate.getFullYear();
                        return {
                            ...exam,
                            formattedDate: `${day}.${month}.${year}`,
                        };
                    });
                    setExams(formattedExams);
                } else {
                    throw new Error(
                        "Data format is incorrect, expected an array."
                    );
                }
            } catch (error) {
                console.error("Failed to fetch exams:", error);
            }
        };

        fetchExams();
    }, []);

    return (
        <Stack
            direction="column"
            width="75%"
            justifyContent="center"
            alignItems="center"
            padding="0.5rem"
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Link to="/admin/exams/create">
                    <Button
                        sx={{
                            my: "1rem",
                            bgcolor: colors.primary,
                            color: "white",
                            borderRadius: "0.7rem",
                            ":hover": { bgcolor: colors.primary },
                        }}
                        variant="contained"
                    >
                        + Add Exam
                    </Button>
                </Link>

                {exams.map((exam) => (
                    <Accordion
                        key={exam.id}
                        sx={{
                            boxShadow: "none",
                            borderRadius: "1rem",
                            overflow: "hidden",
                            ":before": { display: "none" },
                        }}
                    >
                        <AccordionSummary
                            aria-controls={`panel1-content-${exam.id}`}
                            id={`panel1-header-${exam.id}`}
                            sx={{
                                bgcolor: colors.secondary,
                                borderTopRightRadius: "1rem",
                                borderTopLeftRadius: "1rem",
                            }}
                        >
                            <Box width="100%" sx={{ borderRadius: "1rem" }}>
                                <Stack
                                    direction={"row"}
                                    justifyContent="space-between"
                                    sx={{ alignItems: "center", width: "100%" }}
                                >
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        {exam.formattedDate}
                                    </Typography>
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        {exam.examDateTime.slice(11, 16)}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction={"row"}
                                    justifyContent="space-between"
                                    sx={{ width: "100%" }}
                                >
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        {exam.location}
                                    </Typography>
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        {exam.price} som
                                    </Typography>
                                </Stack>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                bgcolor: colors.cardColor,
                                borderBottomRightRadius: "1rem",
                                borderBottomLeftRadius: "1rem",
                            }}
                        >
                            <Typography>
                                {exam.details}{" "}
                                {/* Assuming `exam.description` contains the exam description */}
                            </Typography>
                            <Box
                                sx={{
                                    mt: "1rem",
                                    display: "flex",
                                    gap: "0.5rem",
                                    justifyContent: "end",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: "red",
                                        borderRadius: "0.7rem",
                                    }}
                                >
                                    <Delete sx={{ fontSize: "1.2rem" }} />
                                </Button>
                                <Button
                                    component={Link}
                                    to={`/admin/exams/${exam.id}/edit`}
                                    variant="contained"
                                    sx={{
                                        bgcolor: "green",
                                        borderRadius: "0.7rem",
                                    }}
                                >
                                    <Edit sx={{ fontSize: "1.2rem" }} />
                                </Button>

                                <Button
                                    component={Link}
                                    to={`/admin/exams/${exam.id}/participants/applied`}
                                    variant="contained"
                                    sx={{
                                        bgcolor: colors.primary,
                                        borderRadius: "0.7rem",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <PeopleAlt sx={{ fontSize: "1.2rem" }} />
                                    Participants
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
                <Accordion sx={{ display: "none" }}>
                    <AccordionSummary></AccordionSummary>
                </Accordion>
            </Box>
        </Stack>
    );
};

export default AdminExams;
