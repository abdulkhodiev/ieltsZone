import { useEffect, useState } from "react";
import { Stack, Box, Button } from "@mui/material";
import { colors } from "../../constants/colors";
import { Filter9 } from "@mui/icons-material";
import { getRegisteredExams } from "../../utils/api/requests/get-registered-exams";
import Accordion from "./_components/Accordion";
import MobileAccordion from "./_components/MobileAccordion";
import Snackbar from "@mui/joy/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

const UserResults = () => {
    const [exams, setExams] = useState([]);
    const [openPending, setOpenPending] = useState(false);
    const [openRejected, setOpenRejected] = useState(false);

    const fetchExams = async () => {
        const response = await getRegisteredExams();
        const formattedExams = response.map((exam) => {
            const examDate = new Date(exam.examDateTime);
            const day = String(examDate.getDate()).padStart(2, "0");
            const month = String(examDate.getMonth() + 1).padStart(2, "0");
            const year = examDate.getFullYear();
            const speakingDate = new Date(exam.speakingDate);
            const day2 = String(speakingDate.getDate()).padStart(2, "0");
            const month2 = String(speakingDate.getMonth() + 1).padStart(2, "0");
            const year2 = speakingDate.getFullYear();
            return {
                ...exam,
                formattedDate: `${day}-${month}-${year}`,
                formattedSpeakingDate: `${day2}-${month2}-${year2}`,
            };
        });
        setExams(formattedExams);
    };

    useEffect(() => {
        fetchExams();
    }, []);

    const handleBandScore = (status, id) => {
        if (status === "REJECTED") {
            setOpenRejected(true);
        } else if (status === "NEW") {
            setOpenPending(true);
        } else {
            window.location.href = `/user/results/scores/${id}`;
        }
    };

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
                    display: {
                        xs: "none",
                        sm: "none",
                        md: "flex",
                        lg: "flex",
                        xl: "flex",
                    },
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                {exams.map((exam) => (
                    <Accordion
                        key={exam.id}
                        regionName={exam.location.split(",")[0]}
                        examTime={exam.examDateTime.slice(11, 16)}
                        examDate={exam.formattedDate}
                        details={exam.message}
                        locationUrl={exam.locationUrl}
                        fullRegionName={exam.location}
                        speakingDate={
                            exam.speakingDate === null
                                ? "Speaking date has been cancelled"
                                : exam.formattedSpeakingDate
                        }
                        status={exam.status}
                        speakingTime={exam.speakingDate?.slice(11, 16)}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: "0.5rem",
                                justifyContent: "end",
                            }}
                        >
                            <Button
                                // to={`/user/results/scores/${exam.examRegistrationId}`}
                                onClick={() => {
                                    handleBandScore(
                                        exam.status,
                                        exam.examRegistrationId
                                    );
                                }}
                                variant="contained"
                                sx={{
                                    bgcolor: colors.primary,
                                    borderRadius: "0.7rem",
                                    padding: {
                                        xs: "0.3rem 0.8rem",
                                        sm: "0.3rem 0.8rem",
                                        md: "0.4rem 1rem",
                                    },
                                    fontSize: {
                                        xs: "0.6rem",
                                        sm: "0.8rem",
                                        md: "0.9rem",
                                        lg: "0.9rem",
                                    },
                                    gap: "0.3rem",
                                }}
                            >
                                <Filter9 sx={{ fontSize: "1.2rem" }} />
                                Band Score
                            </Button>
                        </Box>
                    </Accordion>
                ))}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: {
                        xs: "flex",
                        sm: "flex",
                        md: "none",
                    },
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                {exams.map((exam) => (
                    <MobileAccordion
                        key={exam.id}
                        regionName={exam.location.split(",")[0]}
                        examTime={exam.examDateTime.slice(11, 16)}
                        examDate={exam.formattedDate}
                        details={exam.message}
                        locationUrl={exam.locationUrl}
                        fullRegionName={exam.location}
                        speakingDate={
                            exam.speakingDate === null
                                ? "Speaking Date has been cancelled"
                                : exam.formattedSpeakingDate
                        }
                        status={exam.status}
                        speakingTime={exam.speakingDate?.slice(11, 16)}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: "0.5rem",
                                justifyContent: "end",
                            }}
                        >
                            <Button
                                onClick={() => {
                                    handleBandScore(
                                        exam.status,
                                        exam.examRegistrationId
                                    );
                                }}
                                variant="contained"
                                sx={{
                                    bgcolor: colors.primary,
                                    borderRadius: "0.7rem",
                                    padding: {
                                        xs: "0.3rem 0.8rem",
                                        sm: "0.3rem 0.8rem",
                                        md: "0.4rem 1rem",
                                    },
                                    fontSize: {
                                        xs: "0.6rem",
                                        sm: "0.8rem",
                                        md: "0.9rem",
                                        lg: "0.9rem",
                                    },
                                    gap: "0.3rem",
                                }}
                            >
                                <Filter9 sx={{ fontSize: "1.2rem" }} />
                                Band Score
                            </Button>
                        </Box>
                    </MobileAccordion>
                ))}
            </Box>

            <Snackbar
                open={openPending}
                color="neutral"
                variant="solid"
                onClose={() => setOpenPending(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={6000}
                endDecorator={
                    <button
                        onClick={() => setOpenPending(false)}
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            color: "white",
                        }}
                    >
                        <CloseIcon />
                    </button>
                }
            >
                Your application is pending! Please wait.
            </Snackbar>
            <Snackbar
                open={openRejected}
                color="danger"
                variant="solid"
                onClose={() => setOpenRejected(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={6000}
                endDecorator={
                    <button
                        onClick={() => setOpenRejected(false)}
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            color: "white",
                        }}
                    >
                        <CloseIcon />
                    </button>
                }
            >
                Your application was rejected!
            </Snackbar>
        </Stack>
    );
};

export default UserResults;
