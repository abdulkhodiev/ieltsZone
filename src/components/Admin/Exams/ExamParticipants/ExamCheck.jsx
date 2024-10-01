import { useEffect, useState } from "react";
import {
    Box,
    Stack,
    TextField,
    Typography,
    Button,
    Grow,
    CircularProgress,
    Snackbar,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { colors } from "../../../../constants/colors";
import {
    getExamResults,
    putSectionScores,
    postFeedbackFolder,
} from "../../../../utils/api/requests/exam-check-by-section";
import { uploadMultipleFiles } from "../../../../utils/api/requests/multi-file-upload";

const parts = [1, 2, 3, 4];

const passages = [1, 2, 3];

const task1 = [
    "Task Achievement",
    "Coherence & Cohesion",
    "Lexical Resource",
    "Gramatical Range & Accuracy",
];

const task2 = [
    "Task Response",
    "Coherence & Cohesion",
    "Lexical Rosource",
    "Gramatical Range & Accuracy",
];

const speaking = [
    "Fluency and coherence",
    "Lexical Resource",
    "Grammatical range and accuracy",
    "Pronunciation",
];

const ExamCheck = () => {
    const { rowId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { firstName, lastName } = location.state;
    const [userInfo, setUserInfo] = useState({});
    const [sections, setSections] = useState({
        listeningScore: 0,
        readingScore: 0,
        writingScore: 0,
        speakingScore: 0,
        listening: {
            section1: "",
            section2: "",
            section3: "",
            section4: "",
            files: [],
        },
        reading: {
            section1: "",
            section2: "",
            section3: "",
            files: [],
        },
        writing: {
            section1: "",
            section2: "",
            section3: "",
            section4: "",
            section5: "",
            section6: "",
            section8: "",
            section9: "",
            files: [],
        },
        speaking: {
            section1: "",
            section2: "",
            section3: "",
            section4: "",
            audioId: "",
        },
    });
    const [feedbackFile, setFeedbackFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [listeningFiles, setListeningFiles] = useState([]);
    const [readingFiles, setReadingFiles] = useState([]);
    const [writingFiles, setWritingFiles] = useState([]);
    const [speakingFiles, setSpeakingFiles] = useState([]);

    const getUserScore = async () => {
        const res = await getExamResults(rowId);
        setUserInfo(res);
        setSections(res);
    };

    useEffect(() => {
        getUserScore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowId]);

    const handleFileChange = async (event, sectionName) => {
        const files = Array.from(event.target.files);

        const res = await uploadMultipleFiles(files);

        if (res) {
            setSections((prevSections) => ({
                ...prevSections,
                [sectionName]: {
                    ...prevSections[sectionName],
                    files: res,
                    audioId: res[0].id,
                },
            }));
        }

        if (sectionName === "listening") {
            setListeningFiles((prevListeningFiles) => [
                ...prevListeningFiles,
                ...files,
            ]);
        } else if (sectionName === "reading") {
            setReadingFiles((prevReadingFiles) => [
                ...prevReadingFiles,
                ...files,
            ]);
        } else if (sectionName === "writing") {
            setWritingFiles((prevWritingFiles) => [
                ...prevWritingFiles,
                ...files,
            ]);
        } else if (sectionName === "speaking") {
            setSpeakingFiles((prevSpeakingFiles) => [
                ...prevSpeakingFiles,
                ...files,
            ]);
        }
    };

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
                setLoading(false);
            }
        }
    };

    const handleSubmit = async () => {
        event.preventDefault();
        setLoading(true);

        const payload = [
            {
                listening: {
                    sectionOne: sections.listening.section1,
                    sectionTwo: sections.listening.section2,
                    sectionThree: sections.listening.section3,
                    sectionFour: sections.listening.section4,
                    files: sections.listening.files,
                },
            },
            {
                reading: {
                    sectionOne: sections.reading.section1,
                    sectionTwo: sections.reading.section2,
                    sectionThree: sections.reading.section3,
                    files: sections.reading.files,
                },
            },
            {
                writing: {
                    sectionOne: sections.writing.section1,
                    sectionTwo: sections.writing.section2,
                    sectionThree: sections.writing.section3,
                    sectionFour: sections.writing.section4,
                    sectionFive: sections.writing.section5,
                    sectionSix: sections.writing.section6,
                    sectionEight: sections.writing.section8,
                    sectionNine: sections.writing.section9,
                    files: sections.writing.files,
                },
            },
            {
                speaking: {
                    sectionOne: sections.speaking.section1,
                    sectionTwo: sections.speaking.section2,
                    sectionThree: sections.speaking.section3,
                    sectionFour: sections.speaking.section4,
                    audioId: sections.speaking.audioId,
                },
            },
        ];

        try {
            await putSectionScores(userInfo.id, payload);
            setMessage("Submission successful!");
            setFeedbackFile(null);
            getUserScore();
            setLoading(false);
            // navigate(-1);
        } catch (error) {
            setError(error.response?.data?.detail || "An error occurred");
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    // const calculateBandScore = () => {
    //     const totalScore = Object.values(sections).reduce((acc, section) => {
    //         const sectionTotal = Object.values(section)
    //             .filter((val) => !isNaN(parseFloat(val)))
    //             .reduce((sum, val) => sum + parseFloat(val), 0);
    //         return acc + sectionTotal;
    //     }, 0);
    //     return (
    //         Math.round((totalScore / Object.keys(sections).length) * 2) / 2
    //     ).toFixed(1);
    // };

    return (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={500}>
            <form action="" onSubmit={handleSubmit}>
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
                            {/* Band Score: {calculateBandScore()} */}
                        </Typography>
                    </Stack>

                    <Box
                        display={"grid"}
                        gridTemplateColumns={"repeat(2, 1fr)"}
                        gap={{ xs: "2rem" }}
                    >
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            gap={2}
                            border={"1px solid black"}
                            borderRadius={"0.5rem"}
                            height={"max-content"}
                        >
                            <Box
                                padding={"1rem 1rem "}
                                display={"flex"}
                                flexDirection={"column"}
                                gap={2}
                            >
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    color={colors.primary}
                                >
                                    Listening
                                </Typography>
                                {parts.map((part) => (
                                    <TextField
                                        padding={"1rem"}
                                        key={part}
                                        type="number"
                                        required
                                        id={`listening-part-${part}`}
                                        label={`Part ${part}`}
                                        name={`listening-part-${part}`}
                                        value={
                                            sections.listening[`section${part}`]
                                        }
                                        onChange={(e) =>
                                            setSections((prev) => ({
                                                ...prev,
                                                listening: {
                                                    ...prev.listening,
                                                    [`section${part}`]:
                                                        e.target.value,
                                                },
                                            }))
                                        }
                                        max={10}
                                        min={0}
                                        inputProps={{
                                            step: "1",
                                            min: "0",
                                            max: "10",
                                        }}
                                        sx={{ width: "100%" }}
                                    />
                                ))}
                                <Box sx={{ width: "100%" }}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        sx={{
                                            width: "100%",
                                            padding: "1rem",
                                        }}
                                    >
                                        Upload Files
                                        <input
                                            type="file"
                                            multiple
                                            hidden
                                            onChange={(e) =>
                                                handleFileChange(e, "listening")
                                            }
                                        />
                                    </Button>

                                    {listeningFiles.length > 0 && (
                                        <Box mt={2}>
                                            <Typography variant="h6">
                                                Selected Files:
                                            </Typography>
                                            <ul>
                                                {listeningFiles.map(
                                                    (file, index) => (
                                                        <li key={index}>
                                                            {file.name}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                            <Box
                                borderTop={"1px solid black"}
                                paddingX={"1rem"}
                                py={0.5}
                            >
                                <TextField
                                    type="number"
                                    required
                                    margin="normal"
                                    label={`Overall`}
                                    inputProps={{
                                        step: "1",
                                        min: "0",
                                        max: "10",
                                    }}
                                    sx={{ width: "100%" }}
                                />
                            </Box>
                        </Box>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            gap={2}
                            border={"1px solid black"}
                            borderRadius={"0.5rem"}
                            height={"max-content"}
                        >
                            <Box
                                padding={"1rem 1rem "}
                                display={"flex"}
                                flexDirection={"column"}
                                gap={2}
                            >
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    color={colors.primary}
                                >
                                    Reading
                                </Typography>
                                {passages.map(() => (
                                    <TextField
                                        padding={"1rem"}
                                        key={part}
                                        type="number"
                                        required
                                        id={`reading-${part}`}
                                        label={`Passage ${part}`}
                                        name={`reading-${part}`}
                                        value={
                                            sections.reading[`section${part}`]
                                        }
                                        inputProps={{
                                            step: "1",
                                            min: "0",
                                            max: "14",
                                        }}
                                        sx={{ width: "100%" }}
                                    />
                                ))}
                                <Box sx={{ width: "100%" }}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        sx={{
                                            width: "100%",
                                            padding: "1rem",
                                        }}
                                    >
                                        Upload Files
                                        <input
                                            type="file"
                                            multiple
                                            hidden
                                            onChange={(e) => {
                                                handleFileChange(e, "reading");
                                            }}
                                        />
                                    </Button>

                                    {readingFiles.length > 0 && (
                                        <Box mt={2}>
                                            <Typography variant="h6">
                                                Selected Files:
                                            </Typography>
                                            <ul>
                                                {readingFiles.map(
                                                    (file, index) => (
                                                        <li key={index}>
                                                            {file.name}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                            <Box
                                borderTop={"1px solid black"}
                                paddingX={"1rem"}
                                py={0.5}
                            >
                                <TextField
                                    type="number"
                                    required
                                    margin="normal"
                                    label={`Overall`}
                                    inputProps={{
                                        step: "1",
                                        min: "0",
                                        max: "10",
                                    }}
                                    sx={{ width: "100%" }}
                                />
                            </Box>
                        </Box>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            gap={2}
                            border={"1px solid black"}
                            borderRadius={"0.5rem"}
                            height={"max-content"}
                        >
                            <Box
                                padding={"1rem 1rem "}
                                display={"flex"}
                                flexDirection={"column"}
                                gap={2}
                            >
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    color={colors.primary}
                                >
                                    Writing
                                </Typography>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color={colors.primary}
                                >
                                    Task 1
                                </Typography>

                                {task1.map((part) => (
                                    <TextField
                                        padding={"1rem"}
                                        key={part}
                                        type="number"
                                        required
                                        label={`${part}`}
                                        name={`task1-${part}`}
                                        value={
                                            sections.writing[`section${part}`]
                                        }
                                        inputProps={{
                                            step: "1",
                                            min: "0",
                                            max: "10",
                                        }}
                                        sx={{ width: "100%" }}
                                    />
                                ))}
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color={colors.primary}
                                >
                                    Task 2
                                </Typography>

                                {task2.map((part) => (
                                    <TextField
                                        padding={"1rem"}
                                        key={part}
                                        type="number"
                                        required
                                        label={`${part}`}
                                        name={`task1-${part}`}
                                        value={
                                            sections.listening[`section${part}`]
                                        }
                                        inputProps={{
                                            step: "1",
                                            min: "0",
                                            max: "10",
                                        }}
                                        sx={{ width: "100%" }}
                                    />
                                ))}
                                <Box sx={{ width: "100%" }}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        sx={{
                                            width: "100%",
                                            padding: "1rem",
                                        }}
                                    >
                                        Upload Files
                                        <input
                                            type="file"
                                            multiple
                                            hidden
                                            onChange={(e) => {
                                                handleFileChange(e, "writing");
                                            }}
                                        />
                                    </Button>

                                    {writingFiles.length > 0 && (
                                        <Box mt={2}>
                                            <Typography variant="h6">
                                                Selected Files:
                                            </Typography>
                                            <ul>
                                                {writingFiles.map(
                                                    (file, index) => (
                                                        <li key={index}>
                                                            {file.name}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                            <Box
                                borderTop={"1px solid black"}
                                paddingX={"1rem"}
                                py={0.5}
                            >
                                <TextField
                                    type="number"
                                    required
                                    margin="normal"
                                    label={`Overall`}
                                    inputProps={{
                                        step: "1",
                                        min: "0",
                                        max: "10",
                                    }}
                                    sx={{ width: "100%" }}
                                />
                            </Box>
                        </Box>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            gap={2}
                            border={"1px solid black"}
                            borderRadius={"0.5rem"}
                            height={"max-content"}
                        >
                            <Box
                                padding={"1rem 1rem "}
                                display={"flex"}
                                flexDirection={"column"}
                                gap={2}
                            >
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    color={colors.primary}
                                >
                                    Speaking
                                </Typography>
                                {speaking.map((part) => (
                                    <TextField
                                        padding={"1rem"}
                                        key={part}
                                        type="number"
                                        required
                                        id={`${part}`}
                                        label={`${part}`}
                                        name={`listening-${part}`}
                                        value={
                                            sections.speaking[`section${part}`]
                                        }
                                        inputProps={{
                                            step: "1",
                                            min: "0",
                                            max: "10",
                                        }}
                                        sx={{ width: "100%" }}
                                    />
                                ))}
                                <Box sx={{ width: "100%" }}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        sx={{
                                            width: "100%",
                                            padding: "1rem",
                                        }}
                                    >
                                        Upload Files
                                        <input
                                            type="file"
                                            multiple
                                            hidden
                                            onChange={(e) => {
                                                handleFileChange(e, "speaking");
                                            }}
                                        />
                                    </Button>

                                    {speakingFiles.length > 0 && (
                                        <Box mt={2}>
                                            <Typography variant="h6">
                                                Selected Files:
                                            </Typography>
                                            <ul>
                                                {speakingFiles.map(
                                                    (file, index) => (
                                                        <li key={index}>
                                                            {file.name}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                            <Box
                                borderTop={"1px solid black"}
                                paddingX={"1rem"}
                                py={0.5}
                            >
                                <TextField
                                    type="number"
                                    required
                                    margin="normal"
                                    label={`Overall`}
                                    inputProps={{
                                        step: "1",
                                        min: "0",
                                        max: "10",
                                    }}
                                    sx={{ width: "100%" }}
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "column",
                            md: "row",
                        }}
                        alignItems="center"
                        alignSelf={"center"}
                    >
                        <input
                            accept="*/*"
                            style={{ display: "none" }}
                            id="feedback-file-upload"
                            type="file"
                            onChange={handleFeedbackUpload}
                        />
                        <label
                            style={{ cursor: "pointer" }}
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
                            type="submit"
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
                        open={!!error}
                        onClose={() => setError("")}
                        message={error}
                    />

                    <Snackbar
                        autoHideDuration={3000}
                        open={!!message}
                        onClose={() => setMessage("")}
                        message={message}
                    />
                </Box>
            </form>
        </Grow>
    );
};

export default ExamCheck;
