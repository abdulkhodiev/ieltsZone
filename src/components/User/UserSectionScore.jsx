import React, { useState, useEffect, useRef, useContext } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Box, Typography, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed
import { colors } from "../../constants/colors";

const UserSectionScore = () => {
    const { examId, rowId, section } = useParams();
    const navigate = useNavigate();
    const [participantInfo, setParticipantInfo] = useState({
        firstName: "Loading",
        lastName: "...",
        score: "N/A",
        details: "",
        image: "",
    });

    useEffect(() => {
        // Fetch the participant's section score, comments, and photo from backend
        const fetchSectionDetails = async () => {
            try {
                const response = await axios.get(
                    `/api/exams/${examId}/participants/${rowId}/${section}`
                );
                setParticipantInfo({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    score: response.data.score,
                    details: response.data.details,
                    image: response.data.image,
                });
            } catch (error) {
                console.error("Failed to fetch section details:", error);
            }
        };

        fetchSectionDetails();
    }, [examId, rowId, section]);

    return (
        <Box
            width={"65%"}
            height={"100vh"}
            m={"auto"}
            p={"2rem"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Stack spacing={4} width="100%">
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems="center"
                >
                    <Typography variant="h4" fontWeight={"bold"}>
                        {participantInfo.firstName} {participantInfo.lastName}
                    </Typography>
                    <Typography
                        color={colors.primary}
                        variant="h4"
                        fontWeight={"bold"}
                        textTransform={"capitalize"}
                    >
                        {section}{" "}
                    </Typography>{" "}
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    bgcolor={colors.secondary}
                    p={"2rem"}
                    borderRadius={"1rem"}
                >
                    <img
                        style={{ width: "350px", borderRadius: "1rem" }}
                        src="https://images.pexels.com/photos/5428826/pexels-photo-5428826.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Loading..."
                    />
                    <Stack
                        pl={"2rem"}
                        justifyContent="space-between"
                        alignItems={"start"}
                    >
                        <Stack gap={2}>
                            <Typography
                                fontWeight={"bold"}
                                variant="h5"
                                color={colors.primary}
                                textTransform={"capitalize"}
                            >
                                ={section} Score: {participantInfo.score}
                            </Typography>
                            <Typography
                                fontWeight={"bold"}
                                variant="h5"
                                color={colors.primary}
                                textTransform={"capitalize"}
                                bgcolor={colors.cardColor}
                                p={"0.5rem 1rem"}
                                borderRadius={"1rem"}
                            >
                                Comments :{" "}
                                <span
                                    style={{
                                        fontWeight: "normal",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {participantInfo.details}
                                </span>
                            </Typography>
                        </Stack>
                        <Button
                            component={Link}
                            to={`/user/results/${examId}/scores`}
                            sx={{
                                bgcolor: "red",
                                ":hover": { bgcolor: "red" },
                                borderRadius: "0.6rem",
                                textTransform: "none",
                                fontSize: "1.1rem",
                                color: "white",
                                alignSelf: "end",
                            }}
                        >
                            Back
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
};

export default UserSectionScore;
