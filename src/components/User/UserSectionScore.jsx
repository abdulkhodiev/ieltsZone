import React, { useState, useEffect, useRef } from "react";
import { Stack, Box, Typography, Button, TextField } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getExamDetails } from "../../utils/api/requests/get-registered-exams";

import { colors } from "../../constants/colors";

const UserSectionScore = () => {
    const { examRegistrationId, section } = useParams();

    const [userInfo, setUserInfo] = useState({});
    const [sectionResult, setSectionResult] = useState({});

    const fetchUserInfo = async () => {
        const data = await getExamDetails(examRegistrationId);
        setUserInfo(data.user);
        setSectionResult(
            data.sectionResults.find(
                (result) =>
                    result.sectionName.toUpperCase() === section.toUpperCase()
            )
        );
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

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
                        {userInfo.firstName} {userInfo.lastName}
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
                        src={sectionResult.resultPictureUrl}
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
                                {section} Score: {sectionResult.score}
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
                                    {sectionResult.feedback}
                                </span>
                            </Typography>
                        </Stack>
                        <Button
                            component={Link}
                            to={`/user/results/scores/${examRegistrationId}`}
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
