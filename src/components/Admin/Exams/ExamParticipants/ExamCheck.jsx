import { useEffect, useState } from "react";
import { Box, Stack, Card, TextField, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams, useNavigate } from "react-router-dom";
import { colors } from "../../../../constants/colors";
import {
    putSectionScore,
    getStudentInfo,
} from "../../../../utils/api/requests/exam-check-by-section";

const ExamCheck = () => {
    const { examId, rowId } = useParams();
    const navigate = useNavigate();

    const sections = ["listening", "reading", "writing", "speaking"];
    const [name, setName] = useState({ firstName: "", lastName: "" });
    const [formData, setFormData] = useState({
        listeningScore: "",
        readingScore: "",
        writingScore: "",
        speakingScore: "",
    });
    const [feedbackFile, setFeedbackFile] = useState(null);

    useEffect(() => {
        const fetchNameAndScores = async () => {
            const studentInfo = await getStudentInfo(rowId);
            const sectionScores = await getSectionResults(rowId);

            setName(studentInfo.student);
            const scores = {};
            sectionScores.sectionResults.forEach((section) => {
                scores[section.sectionName] = section.score;
            });
            setFormData(scores);
        };

        fetchNameAndScores();
    }, [rowId]);

    const handleFeedbackUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFeedbackFile(file);
        }
    };

    const handleChange = (sectionName, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [sectionName]: value,
        }));
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async () => {
        await putSectionScore(2, formData);
    };

    const calculateBandScore = () => {
        const totalScore = sections.reduce(
            (acc, section) =>
                acc + (formData[section] ? parseFloat(formData[section]) : 0),
            0
        );
        return (Math.round((totalScore / sections.length) * 2) / 2).toFixed(1);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            m={"auto"}
            justifyContent="center"
            py={5}
            px={3}
            width={{ xs: "100%", md: "65%" }}
        >
            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                alignItems="center"
                justifyContent="space-between"
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
                    {name.firstName} {name.lastName}
                </Typography>
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
                {sections.map((section) => (
                    <Card
                        key={section}
                        sx={{
                            py: 2,
                            px: 3,
                            display: "flex",
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
                            sx={{ mb: 2, color: colors.primary }}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </Typography>
                        <TextField
                            type="number"
                            label="Score"
                            variant="outlined"
                            value={formData[section]}
                            onChange={(e) =>
                                handleChange(section, e.target.value)
                            }
                            inputProps={{
                                step: "0.5",
                                min: "0",
                                max: "9",
                            }}
                            sx={{ mb: 2 }}
                        />
                    </Card>
                ))}
            </Box>

            <Stack
                direction={{
                    xs: "column",
                    sm: "column",
                    md: "row",
                }}
                alignItems="center"
                spacing={2}
                alignSelf={"center"}
                mt={3}
                sx={{
                    borderRadius: "0.6rem",
                    padding: "1rem",
                }}
            >
                <input
                    accept="*/*"
                    style={{ display: "none" }}
                    id="feedback-file-upload"
                    type="file"
                    onChange={handleFeedbackUpload}
                />
                <label
                    style={{ cursor: "pointer", marginLeft: "0rem" }}
                    htmlFor="feedback-file-upload"
                >
                    <Button
                        variant="contained"
                        component="span"
                        sx={{
                            bgcolor: "green",
                            color: "white",
                            padding: "0.5rem 2rem",
                            fontWeight: "bold",
                            ":hover": { bgcolor: "green" },
                            borderRadius: "0.6rem",
                        }}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Feedback Folder
                    </Button>
                </label>
                {feedbackFile && (
                    <Typography variant="subtitle1" gutterBottom>
                        {feedbackFile.name}
                    </Typography>
                )}
            </Stack>

            <Stack
                direction="row"
                justifyContent={"flex-end"}
                spacing={2}
                mt={4}
            >
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={handleCancel}
                    sx={{
                        bgcolor: "red",
                        color: "white",
                        padding: "0.5rem 2rem",
                        fontWeight: "bold",
                        ":hover": { bgcolor: "red" },
                        borderRadius: "0.6rem",
                    }}
                >
                    Cancel
                </Button>
                <Button
                    sx={{
                        bgcolor: colors.primary,
                        color: "white",
                        padding: "0.5rem 2rem",
                        fontWeight: "bold",
                        ":hover": { bgcolor: colors.primary },
                        borderRadius: "0.6rem",
                    }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Stack>
        </Box>
    );
};

export default ExamCheck;
