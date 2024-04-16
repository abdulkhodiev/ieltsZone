import React, { useEffect, useState } from "react";
import { Typography, Stack, Box, Button } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import {
    getExams,
    reserveExamTemporariy,
} from "../../utils/api/requests/add-exams";
import Accordion from "../UI/Accordion";
import { colors } from "../../constants/colors";

const UserExams = () => {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    const fetchExams = async () => {
        try {
            const response = await getExams();
            const formattedExams = response.map((exam) => {
                const examDate = new Date(exam.examDateTime);
                const day = String(examDate.getDate()).padStart(2, "0");
                const month = String(examDate.getMonth() + 1).padStart(2, "0");
                const year = examDate.getFullYear();
                return {
                    ...exam,
                    formattedDate: `${year}-${month}-${day}`,
                };
            });
            setExams(formattedExams);
        } catch (error) {
            console.error("Failed to fetch exams:", error);
        }
    };

    const handleReserveExam = async (examId) => {
        const response = await reserveExamTemporariy(examId);
        if ((response.success = true)) {
            navigate(`/user/exams/apply/${examId}`);
        } else {
            console.warn();
            ("No places left for this exam.");
        }
    };

    useEffect(() => {
        fetchExams();
    }, []);

    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"0.5rem"}
            sx={{
                width: {
                    xs: "100%",
                    sm: "95%",
                    md: "90%",
                    lg: "75%",
                    xl: "75%",
                },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                {exams.map((exam) => (
                    <Accordion
                        key={exam.id}
                        regionName={exam.location}
                        price={exam.price}
                        examTime={exam.examDateTime.slice(11, 16)}
                        examDate={exam.formattedDate}
                        details={exam.details}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: "0.5rem",
                                justifyContent: "end",
                            }}
                        >
                            <Button
                                component={Link}
                                to={`/user/exams/apply/${exam.id}`}
                                variant="contained"
                                sx={{
                                    bgcolor: colors.primary,
                                    borderRadius: "0.7rem",
                                    padding: {
                                        sm: "0.3rem 0.8rem",
                                        md: "0.4rem 1rem",
                                    },
                                    fontSize: {
                                        sm: "0.8rem",
                                        md: "1rem",
                                    },
                                    gap: "0.3rem",
                                }}
                            >
                                <AddCircleOutline sx={{ fontSize: "1.5rem" }} />
                                Apply
                            </Button>
                        </Box>
                    </Accordion>
                ))}
            </Box>
        </Stack>
    );
};

export default UserExams;
