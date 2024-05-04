import { useEffect, useState } from "react";
import { Box, Stack, Card, Typography, Button, Grow } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams } from "react-router-dom";
import { colors } from "../../constants/colors";
import {
    getExamResults,
    getFeedbackFolder,
} from "../../utils/api/requests/exam-check-by-section";

const UserScoreCheck = () => {
    const { examRegistrationId } = useParams();

    const [userInfo, setUserInfo] = useState({});
    const [sections, setSections] = useState({
        listening: "",
        reading: "",
        writing: "",
        speaking: "",
    });

    const getUserScore = async () => {
        try {
            const res = await getExamResults(examRegistrationId);
            setUserInfo(res);
            setSections({
                listening: res.listening || "",
                reading: res.reading || "",
                writing: res.writing || "",
                speaking: res.speaking || "",
            });
        } catch (error) {
            console.error("Failed to fetch exam results:", error);
        }
    };

    useEffect(() => {
        getUserScore();
    }, [examRegistrationId]);

    const id = userInfo.feedbackFileId;

    const fileUrl = `http://localhost:8080/api/v1/file-storage/download-file?id=${id}`;

    const handleDownload = (fileUrl) => {
        const fileName = fileUrl.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = fileUrl;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    };

    const calculateBandScore = () => {
        const totalScore = Object.values(sections).reduce(
            (acc, section) => acc + (section ? parseFloat(section) : 0),
            0
        );
        return (
            Math.round((totalScore / Object.keys(sections).length) * 2) / 2
        ).toFixed(1);
    };

    return (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={500}>
            <Box
                display="flex"
                flexDirection="column"
                m="auto"
                justifyContent="center"
                py={15}
                px={3}
                gap={5}
                width={{ xs: "100%", md: "max-content" }}
            >
                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        mb={{
                            xs: 2,
                            md: 4,
                        }}
                        color={colors.primary}
                        textAlign="center"
                    >
                        Band Score: {calculateBandScore()}
                    </Typography>
                </Stack>

                <Box
                    display="flex"
                    justifyContent="center"
                    flexWrap="wrap"
                    gap={{
                        xs: "2rem",
                    }}
                >
                    {Object.keys(sections).map((section) => (
                        <Card
                            key={section}
                            sx={{
                                width: "8rem",
                                height: "8rem",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                borderRadius: "1rem",
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight="bold"
                                sx={{ color: colors.primary }}
                            >
                                {section.charAt(0).toUpperCase() +
                                    section.slice(1)}
                            </Typography>

                            <Typography
                                sx={{
                                    color: "red",
                                    fontWeight: "bold",
                                    fontSize: "1.5rem",
                                }}
                            >
                                {sections[section] || "N/A"}
                            </Typography>
                        </Card>
                    ))}
                </Box>

                <Button
                    fullWidth
                    sx={{
                        borderRadius: "0.6rem",
                        padding: "0.6rem 1.5rem",
                        textTransform: "none",
                        fontSize: "1.1rem",
                        ":hover": { bgcolor: colors.primary },
                        bgcolor: "green",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                    onClick={() => handleDownload(fileUrl)}
                    aria-label="Upload feedback"
                >
                    <CloudUploadIcon /> FeedBack Folder
                </Button>
            </Box>
        </Grow>
    );
};

export default UserScoreCheck;
