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
import { Filter9 } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { getRegisteredExams } from "../../utils/api/requests/get-registered-exams";

const UserResults = () => {
    const [exams, setExams] = useState([]);

    const fetchExams = async () => {
        const response = await getRegisteredExams();
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
    };

    useEffect(() => {
        fetchExams();
    }, []);
    return (
        <Stack
            direction={"column"}
            width={"75%"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"0.5rem"}
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
                            <Typography>{exam.message} </Typography>
                            <Box
                                sx={{
                                    mt: "1rem",
                                    display: "flex",
                                    gap: "0.5rem",
                                    justifyContent: "end",
                                }}
                            >
                                <Button
                                    component={Link}
                                    to={`/user/results/scores/${exam.examRegistrationId}`}
                                    variant="contained"
                                    sx={{
                                        bgcolor: colors.primary,
                                        borderRadius: "0.7rem",
                                        gap: "0.5rem",

                                        fontSize: "0.5rem",
                                    }}
                                >
                                    <Filter9 sx={{ fontSize: "1.2rem" }} />
                                    Band Score
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
                <Accordion sx={{ display: "none", width: "0", height: "0" }}>
                    <AccordionSummary></AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                </Accordion>
            </Box>
        </Stack>
    );
};

export default UserResults;
