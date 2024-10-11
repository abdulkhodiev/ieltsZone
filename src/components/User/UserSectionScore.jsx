import React, { useState, useEffect } from "react";
import {
    Stack,
    Box,
    Typography,
    Button,
    TextField,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getExamDetails } from "../../utils/api/requests/get-registered-exams";

import { colors } from "../../constants/colors";

const UserSectionScore = () => {
    const { examRegistrationId, section } = useParams();

    const [userInfo, setUserInfo] = useState({});
    const [sectionResult, setSectionResult] = useState({});
    const theme = useTheme();
    const [img, setImg] = useState(
        "https://media.istockphoto.com/id/1367679511/photo/ielts-wood-word-with-liight-bulb.jpg?b=1&s=612x612&w=0&k=20&c=odmK7XZcziYZma_77VGOfWnEVG8Qq8KaaJSN2P2iCi0="
    );
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

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

    useEffect(() => {
        if (
            sectionResult.resultPictureUrl !== null &&
            sectionResult.resultPictureUrl !== undefined
        ) {
            setImg(sectionResult.resultPictureUrl);
        }
    }, [sectionResult]);

    return (
        <Box
            height={"100vh"}
            m={"auto"}
            p={"2rem"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                width: {
                    xs: "100%",
                    sm: "95%",
                    md: "60%",
                    lg: "60%",
                    xl: "60%",
                },
            }}
        >
            <Stack spacing={4} width="100%">
                <Stack
                    sx={{
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: {
                            xs: "center",
                            sm: "space-between",
                            gap: 2,
                        },
                    }}
                    alignItems="center"
                >
                    <Typography
                        variant="h4"
                        sx={{ textAlign: { xs: "center", sm: "left" } }}
                        fontWeight={"bold"}
                    >
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
                    direction={isMobile ? "column" : "row"}
                    justifyContent="space-between"
                    alignItems={isMobile ? "center" : "initial"}
                    p={isMobile ? "1rem" : "2rem"}
                    borderRadius="1rem"
                    boxShadow="0 4px 20px rgba(0,0,0,0.15)"
                    spacing={isMobile ? 2 : 0}
                >
                    <img
                        style={{
                            width: isMobile ? "100%" : "350px",
                            borderRadius: "1rem",
                        }}
                        src={img}
                        alt="..."
                    />
                    <Stack
                        pl={isMobile ? 0 : "2rem"}
                        pt={isMobile ? 2 : 0}
                        justifyContent="space-between"
                        alignItems={isMobile ? "center" : "end"}
                        width="100%"
                    >
                        <Stack gap={2} alignItems={isMobile ? "center" : "end"}>
                            <Typography
                                fontWeight="bold"
                                variant="h5"
                                color={colors.primary}
                                textTransform="capitalize"
                                textAlign={isMobile ? "center" : "left"}
                            >
                                {section} Score: {sectionResult.score}
                            </Typography>
                            <Typography
                                fontWeight="bold"
                                variant="h6"
                                color={colors.primary}
                                textTransform="capitalize"
                                p="0.5rem 1rem"
                                border={`2px solid ${colors.primary}`}
                                borderRadius="1rem"
                                textAlign={isMobile ? "center" : "left"}
                            >
                                Comments:{" "}
                                <span
                                    style={{
                                        fontSize: "1.2rem",
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
                                ":hover": { bgcolor: "darkred" },
                                borderRadius: "0.6rem",
                                textTransform: "none",
                                fontSize: "1.1rem",
                                color: "white",
                                padding: "0.5rem 2rem",
                                alignSelf: isMobile ? "center" : "end",
                                mt: isMobile ? 2 : 2,
                                width: isMobile ? "80%" : "max-content",
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
