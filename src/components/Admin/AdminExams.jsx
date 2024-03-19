import React from "react";
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
import { useParams } from "react-router-dom";

const AdminExams = () => {
    const { examId } = useParams();
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

                <Accordion
                    sx={{
                        boxShadow: "none",
                        borderRadius: "1rem",
                        bgcolor: "transparent !important",
                        ":before": {
                            bgcolor: "transparent !important",
                        },
                        overflow: "hidden",
                    }}
                >
                    <AccordionSummary
                        aria-controls="panel2-content"
                        id="panel2-header"
                        width={"100%"}
                        sx={{
                            bgcolor: colors.secondary,
                            borderTopRightRadius: "1rem",
                            borderTopLeftRadius: "1rem",
                        }}
                    >
                        <Box width="100%">
                            <Stack
                                direction={"row"}
                                sx={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <Typography sx={{ fontWeight: "bold" }}>
                                    15.02.2022
                                </Typography>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    19:00
                                </Typography>
                            </Stack>
                            <Stack
                                direction={"row"}
                                sx={{
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <Typography sx={{ fontWeight: "bold" }}>
                                    Toshkent, Chilonzor
                                </Typography>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    200 000 som
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
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
                                sx={{ bgcolor: "red", borderRadius: "0.7rem" }}
                            >
                                <Delete sx={{ fontSize: "1.2rem" }} />
                            </Button>
                            <Button
                                component={Link}
                                to={`/admin/exams/${examId}/edit`} // Make sure examId is the actual ID of the exam
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
                                to={`/admin/exams/${examId}/participants/applied`}
                                variant="contained"
                                sx={{
                                    bgcolor: colors.primary,
                                    borderRadius: "0.7rem",
                                    gap: "0.5rem",

                                    fontSize: "0.5rem",
                                }}
                            >
                                <PeopleAlt sx={{ fontSize: "1.2rem" }} />
                                Participants
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ display: "none", width: "0", height: "0" }}>
                    <AccordionSummary></AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                </Accordion>
            </Box>
        </Stack>
    );
};

export default AdminExams;
