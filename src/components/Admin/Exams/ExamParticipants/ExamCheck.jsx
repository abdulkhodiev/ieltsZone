import { useEffect, useState } from "react";
import {
    Box,
    Stack,
    Card,
    TextField,
    Typography,
    Button,
    Grow,
    CircularProgress, // Import CircularProgress here
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { colors } from "../../../../constants/colors";
import {
    getExamResults,
    putSectionScores,
    postFeedbackFolder,
} from "../../../../utils/api/requests/exam-check-by-section";
import Snackbar from "@mui/joy/Snackbar";

const ExamCheck = () => {
    const { rowId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { firstName, lastName } = location.state;
    const [userInfo, setUserInfo] = useState({});
    const [sections, setSections] = useState({
        listening: "",
        reading: "",
        writing: "",
        speaking: "",
    });
    const [feedbackResponse, setFeedbackResponse] = useState("");
    const [feedbackFile, setFeedbackFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const getUserScore = async () => {
        const res = await getExamResults(rowId);
        setUserInfo(res);
        setSections((prevSections) => ({
            ...prevSections,
            listening: res.listening || "",
            reading: res.reading || "",
            writing: res.writing || "",
            speaking: res.speaking || "",
        }));
    };

    useEffect(() => {
        getUserScore();
    }, [rowId]);

    const handleFeedbackUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFeedbackFile(file);
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append("file", file);
                const response = await postFeedbackFolder(formData);
                setFeedbackResponse(response);
                setLoading(false);
            } catch (error) {
                console.error("Error uploading file:", error);
                setLoading(false); // Stop loading on error
            }
        }
    };

    const handleChange = (sectionName, value) => {
        const numValue = parseFloat(value);
        if (
            value === "" ||
            (numValue >= 0 && numValue <= 9 && (numValue * 2) % 1 === 0)
        ) {
            setSections((prevSections) => ({
                ...prevSections,
                [sectionName]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true); // Start loading on submit
        try {
            await putSectionScores(userInfo.id, sections);
            setMessage("Submission successful!");
            setLoading(false);
            navigate(-1);
        } catch (error) {
            setError(error.response.data.detail);
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
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
                py={5}
                px={3}
                width={{ xs: "100%", md: "75%" }}
            >
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        mb={{ xs: 2, md: 4 }}
                        color={colors.primary}
                        textAlign="center"
                    >
                        {firstName} {lastName}
                    </Typography>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        mb={{ xs: 2, md: 4 }}
                        color={colors.primary}
                        textAlign="center"
                    >
                        Band Score: {calculateBandScore()}
                    </Typography>
                </Stack>
                <Box
                    display="flex"
                    justifyContent={{
                        xs: "center",
                        md: "space-between",
                    }}
                    flexWrap="wrap"
                    gap={{ xs: "2rem" }}
                >
                    {Object.keys(sections).map((section) => (
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
                                {section.charAt(0).toUpperCase() +
                                    section.slice(1)}
                            </Typography>
                            <TextField
                                type="number"
                                label="Score"
                                required
                                variant="outlined"
                                value={sections[section]}
                                onChange={(e) =>
                                    handleChange(section, e.target.value)
                                }
                                inputProps={{ step: "0.5", min: "0", max: "9" }}
                                sx={{ mb: 2 }}
                            />
                        </Card>
                    ))}
                </Box>
                <Stack
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    alignItems="center"
                    spacing={2}
                    alignSelf={"center"}
                    mt={3}
                    sx={{ borderRadius: "0.6rem", padding: "1rem" }}
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
                    {userInfo.feedbackFileId && (
                        <Typography variant="subtitle1" gutterBottom>
                            You have already uploaded the feedback folder.
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
                        Close
                    </Button>

                    <Button
                        sx={{
                            bgcolor: colors.primary,
                            color: "white",
                            padding: "0.5rem 2rem",
                            fontWeight: "bold",
                            ":hover": { bgcolor: colors.primary },
                            borderRadius: "0.6rem",
                            display: "flex",
                            gap: "0.5rem",
                        }}
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading && (
                            <CircularProgress
                                sx={{
                                    color: "white",
                                }}
                            />
                        )}
                        Submit
                    </Button>
                </Stack>
                <Snackbar
                    autoHideDuration={3000}
                    color="danger"
                    size="lg"
                    open={error}
                    onClose={() => setError("")}
                    variant="solid"
                >
                    {error}
                </Snackbar>
                <Snackbar
                    autoHideDuration={3000}
                    color="success"
                    open={message}
                    onClose={() => setMessage("")}
                    size="lg"
                    variant="solid"
                >
                    {message}
                </Snackbar>
                {/* Loading indicator */}
            </Box>
        </Grow>
    );
};

export default ExamCheck;
