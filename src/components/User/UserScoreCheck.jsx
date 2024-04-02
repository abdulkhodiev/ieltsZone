import React, { useState, useEffect } from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import { colors } from "../../constants/colors";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed or replace with your fetch method

const UserScoreCheck = () => {
    const { examId, rowId } = useParams();
    const [participantDetails, setParticipantDetails] = useState({
        participantName: "Loading...", // Default loading state
        scores: {
            listening: "N/A", // Default values
            reading: "N/A",
            writing: "N/A",
            speaking: "N/A",
            bandScore: "N/A",
        },
    });

    useEffect(() => {
        const fetchParticipantDetails = async () => {
            try {
                const response = await axios.get(
                    `/api/exams/${examId}/participants/${rowId}`
                );
                if (
                    response.data &&
                    response.data.firstName &&
                    response.data.lastName &&
                    response.data.scores
                ) {
                    setParticipantDetails({
                        participantName: `${response.data.firstName} ${response.data.lastName}`,
                        scores: response.data.scores,
                    });
                } else {
                    console.error("Invalid response structure:", response.data);
                    // Handle unexpected structure or missing data
                }
            } catch (error) {
                console.error(
                    "There was an error fetching the participant details: ",
                    error
                );
            }
        };

        fetchParticipantDetails();
    }, [examId, rowId]);

    const { participantName, scores } = participantDetails;
    const sections = [
        "Listening",
        "Reading",
        "Writing",
        "Speaking",
        "Band Score",
    ];

    return (
        <Stack
            width={"70%"}
            height={"100vh"}
            m={"auto"}
            p={"1em"}
            justifyContent={"center"}
        >
            <Box>
                <Typography
                    variant="h4"
                    fontWeight={"bold"}
                    py={"1rem"}
                    textAlign={"center"}
                >
                    {participantName}
                </Typography>
            </Box>

            {sections.map((section) => (
                <Box key={section}>
                    <Typography
                        variant="h6"
                        textAlign={section === "Band Score" ? "right" : "left"}
                        fontWeight={"bold"}
                        py={"0.5rem"}
                    >
                        {section}
                    </Typography>
                    <Stack
                        direction={"row"}
                        justifyContent={
                            section === "Band Score"
                                ? "flex-end"
                                : "space-between"
                        }
                        alignItems={"center"}
                        bgcolor={
                            section === "Band Score"
                                ? colors.cardColor
                                : colors.secondary
                        }
                        ml={section === "Band Score" ? "auto" : "0"}
                        width={
                            section === "Band Score" ? "max-content" : "100%"
                        }
                        p={section === "Band Score" ? "0.5rem 2rem" : "0.5rem"}
                        borderRadius={"1rem"}
                    >
                        <Typography
                            variant={"h6"}
                            textAlign={"left"}
                            fontWeight={section === "Band Score" ? "bold" : ""}
                        >
                            {scores[section.toLowerCase().replace(/\s/g, "")] ||
                                "N/A"}{" "}
                            {/* Ensure the key matches the object structure */}
                        </Typography>
                        {section !== "Band Score" && (
                            <Button
                                component={Link}
                                variant="contained"
                                to={`/user/results/${examId}/scores/${section.toLowerCase()}`}
                                state={{ participant: participantDetails }}
                                sx={{
                                    bgcolor: colors.primary,
                                    ":hover": { bgcolor: colors.primary },
                                    borderRadius: "0.6rem",
                                    textTransform: "none",
                                }}
                            >
                                Details
                            </Button>
                        )}
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
};

export default UserScoreCheck;
