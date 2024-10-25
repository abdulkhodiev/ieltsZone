import { useCallback, useEffect, useState } from "react";
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
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { colors } from "../../../../constants/colors";
import {
    getExamResults,
    putSectionScores,
    postFeedbackFolder,
} from "../../../../utils/api/requests/exam-check-by-section";
import { uploadMultipleFiles } from "../../../../utils/api/requests/multi-file-upload";
import {
    listeningScoreMap,
    readingScoreMap,
} from "../../../../utils/calculators/calculators";
import { Delete } from "@mui/icons-material";

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
        listeningScore: "",
        readingScore: "",
        writingScore: "",
        speakingScore: "",
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
            section7: "",
            section8: "",
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [listeningFiles, setListeningFiles] = useState([]);
    const [readingFiles, setReadingFiles] = useState([]);
    const [writingFiles, setWritingFiles] = useState([]);
    const [speakingFiles, setSpeakingFiles] = useState("");

    const getUserScore = async () => {
        const res = await getExamResults(rowId);
        setUserInfo(res);

        setSections({
            listening: {
                id: res.listening.id,
                section1: res.listening.sectionOne,
                section2: res.listening.sectionTwo,
                section3: res.listening.sectionThree,
                section4: res.listening.sectionFour,
                files: res.listening.files.map((file) => file.id),
            },
            reading: {
                id: res.reading.id,
                section1: res.reading.sectionOne,
                section2: res.reading.sectionTwo,
                section3: res.reading.sectionThree,
                files: res.reading.files.map((file) => file.id),
            },
            writing: {
                id: res.writing.id,
                section1: res.writing.sectionOne,
                section2: res.writing.sectionTwo,
                section3: res.writing.sectionThree,
                section4: res.writing.sectionFour,
                section5: res.writing.sectionFive,
                section6: res.writing.sectionSix,
                section7: res.writing.sectionSeven,
                section8: res.writing.sectionEight,
                files: res.writing.files.map((file) => file.id),
            },
            speaking: {
                id: res.speaking.id,
                section1: res.speaking.sectionOne,
                section2: res.speaking.sectionTwo,
                section3: res.speaking.sectionThree,
                section4: res.speaking.sectionFour,
                audioId: res.speaking.audio,
            },
        });
        setListeningFiles(res.listening.files.map((file) => file));
        setReadingFiles(res.reading.files.map((file) => file));
        setWritingFiles(res.writing.files.map((file) => file));
        if (res.speaking.audio !== null) {
            setSpeakingFiles(res.speaking.audio.url);
        }
    };

    useEffect(() => {
        getUserScore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFileChange = async (event, sectionName) => {
        try {
            const files = Array.from(event.target.files);

            setLoading(true);
            const res = await uploadMultipleFiles(files);
            if (res) {
                setSections((prevSections) => ({
                    ...prevSections,
                    [sectionName]: {
                        ...prevSections[sectionName],
                        files: [...prevSections[sectionName].files, ...res],
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
            }
        } catch (error) {
            console.error("Error uploading files:", error);
            return;
        } finally {
            setLoading(false);
        }
    };

    const sectionScore = useCallback(
        (sectionName) => {
            let total = 0;

            if (sectionName === "listening") {
                const section1 = Number(sections.listening.section1);

                const section2 = Number(sections.listening.section2);

                const section3 = Number(sections.listening.section3);

                const section4 = Number(sections.listening.section4);

                total = section1 + section2 + section3 + section4;

                return listeningScoreMap[total];
            } else if (sectionName === "reading") {
                const section1 = Number(sections.reading.section1);

                const section2 = Number(sections.reading.section2);

                const section3 = Number(sections.reading.section3);

                total = section1 + section2 + section3;

                return readingScoreMap[total];
            } else if (sectionName === "writing") {
                const section1 = Number(sections.writing.section1);
                const section2 = Number(sections.writing.section2);
                const section3 = Number(sections.writing.section3);
                const section4 = Number(sections.writing.section4);
                const section5 = Number(sections.writing.section5);
                const section6 = Number(sections.writing.section6);
                const section7 = Number(sections.writing.section7);
                const section8 = Number(sections.writing.section8);

                total =
                    ((section1 + section2 + section3 + section4) / 4 +
                        ((section5 + section6 + section7 + section8) / 4) * 2) /
                    3;

                return Math.round(total * 2) / 2;
            } else if (sectionName === "speaking") {
                const section1 = Number(sections.speaking.section1);
                const section2 = Number(sections.speaking.section2);
                const section3 = Number(sections.speaking.section3);
                const section4 = Number(sections.speaking.section4);

                total = (section1 + section2 + section3 + section4) / 4;
                return Math.floor(total * 2) / 2;
            }
        },
        [
            sections.listening,
            sections.reading,
            sections.writing,
            sections.speaking,
        ]
    );

    useEffect(
        () => {
            const total1 = sectionScore("listening");
            setSections((prevSections) => ({
                ...prevSections,
                listeningScore: total1,
            }));

            const total2 = sectionScore("reading");
            setSections((prevSections) => ({
                ...prevSections,
                readingScore: total2,
            }));

            const total3 = sectionScore("writing");
            setSections((prevSections) => ({
                ...prevSections,
                writingScore: total3,
            }));

            const total4 = sectionScore("speaking");
            setSections((prevSections) => ({
                ...prevSections,
                speakingScore: total4,
            }));
        },

        [sectionScore, sections.listeningScore],
        [sections.readingScore],
        [sections.writingScore],
        [sections.speakingScore]
    );

    const handleDeleteFile = (id, sectionName) => {
        setSections((prevSections) => ({
            ...prevSections,
            [sectionName]:
                sectionName === "speaking"
                    ? {
                          ...prevSections[sectionName],
                          files: [],
                      }
                    : {
                          ...prevSections[sectionName],
                          files: prevSections[sectionName].files.filter(
                              (file) => file !== id
                          ),
                      },
        }));
        if (sectionName === "listening") {
            setListeningFiles((prevListeningFiles) =>
                prevListeningFiles.filter((file) => file.id !== id)
            );
        } else if (sectionName === "reading") {
            setReadingFiles((prevReadingFiles) =>
                prevReadingFiles.filter((file) => file.id !== id)
            );
        } else if (sectionName === "writing") {
            setWritingFiles((prevWritingFiles) =>
                prevWritingFiles.filter((file) => file.id !== id)
            );
        } else if (sectionName === "speaking") {
            setSpeakingFiles("");
        }
    };

    const handleOverAllSectionsChange = (e, sectionName) => {
        setSections((prevSections) => ({
            ...prevSections,
            [sectionName]: e.target.value,
        }));
    };

    const handleAudioUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setSpeakingFiles(file.name);
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append("file", file);
                const response = await postFeedbackFolder(formData);
                setSections((prevSections) => ({
                    ...prevSections,
                    speaking: {
                        ...prevSections.speaking,
                        audioId: response,
                    },
                }));
                setLoading(false);
            } catch (error) {
                console.error("Error uploading file:", error);
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log(sections);
        const payload = {
            listeningScore: sections.listeningScore || undefined,
            readingScore: sections.readingScore || undefined,
            writingScore: sections.writingScore || undefined,
            speakingScore: sections.speakingScore || undefined,

            listening: {
                id: sections.listening.id,
                sectionOne: sections.listening.section1,
                sectionTwo: sections.listening.section2,
                sectionThree: sections.listening.section3,
                sectionFour: sections.listening.section4,
                files: sections.listening.files,
            },

            reading: {
                id: sections.reading.id,
                sectionOne: sections.reading.section1,
                sectionTwo: sections.reading.section2,
                sectionThree: sections.reading.section3,
                files: sections.reading.files,
            },

            writing: {
                id: sections.writing.id,
                sectionOne: sections.writing.section1,
                sectionTwo: sections.writing.section2,
                sectionThree: sections.writing.section3,
                sectionFour: sections.writing.section4,
                sectionFive: sections.writing.section5,
                sectionSix: sections.writing.section6,
                sectionSeven: sections.writing.section7,
                sectionEight: sections.writing.section8,
                files: sections.writing.files,
            },

            speaking: {
                id: sections.speaking.id,
                sectionOne: sections.speaking.section1,
                sectionTwo: sections.speaking.section2,
                sectionThree: sections.speaking.section3,
                sectionFour: sections.speaking.section4,
                audioId:
                    typeof sections.speaking.audioId === "number"
                        ? sections.speaking.audioId
                        : sections.speaking.audioId?.id,
            },
        };

        try {
            await putSectionScores(userInfo.id, payload);
            setMessage("Submission successful!");
            getUserScore();
            setLoading(false);
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
                    gridTemplateColumns={{
                        xs: "repeat(1, 1fr)",
                        sm: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                    }}
                    gap={{ xs: "2rem" }}
                >
                    <form action="listening" onSubmit={handleSubmit}>
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
                                            accept="image/*"
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
                                            <ul
                                                style={{
                                                    listStyle: "none",
                                                    padding: 0,
                                                    display: "flex",
                                                    gap: "0.5rem",
                                                    flexWrap: "wrap",
                                                    justifyContent:
                                                        "flex-start",
                                                    width: "100%",
                                                }}
                                            >
                                                {listeningFiles.map(
                                                    (file, index) => (
                                                        <li
                                                            key={index}
                                                            style={{
                                                                backgroundColor:
                                                                    "lightblue",
                                                                padding:
                                                                    "0.5rem",
                                                                borderRadius:
                                                                    "0.5rem",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            {file.name ? (
                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "space-between",
                                                                        alignItems:
                                                                            "center",
                                                                        gap: "1rem",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            overflow:
                                                                                "hidden",
                                                                            textOverflow:
                                                                                "ellipsis",
                                                                            whiteSpace:
                                                                                "nowrap",
                                                                        }}
                                                                    >
                                                                        {
                                                                            file.name
                                                                        }
                                                                    </Typography>
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "space-between",
                                                                        alignItems:
                                                                            "center",
                                                                        gap: "1rem",
                                                                    }}
                                                                >
                                                                    <a
                                                                        style={{
                                                                            textDecoration:
                                                                                "none",
                                                                            color: "black",
                                                                        }}
                                                                        href={
                                                                            file?.url
                                                                        }
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{
                                                                                overflow:
                                                                                    "hidden",
                                                                                textOverflow:
                                                                                    "ellipsis",
                                                                                whiteSpace:
                                                                                    "nowrap",
                                                                                width: "fit-content",
                                                                                maxWidth:
                                                                                    "200px",
                                                                            }}
                                                                        >
                                                                            {
                                                                                file?.url
                                                                            }
                                                                        </Typography>
                                                                    </a>
                                                                    <Button
                                                                        sx={{
                                                                            bgcolor:
                                                                                "red",
                                                                            color: "white",
                                                                            padding:
                                                                                "0.5rem",
                                                                            borderRadius:
                                                                                "0.5rem",
                                                                            ":hover":
                                                                                {
                                                                                    bgcolor:
                                                                                        "red",
                                                                                },
                                                                        }}
                                                                        onClick={() =>
                                                                            handleDeleteFile(
                                                                                file?.id,
                                                                                "listening"
                                                                            )
                                                                        }
                                                                    >
                                                                        <Delete />
                                                                    </Button>
                                                                </span>
                                                            )}
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
                                display={"flex"}
                                alignItems={"baseline"}
                                gap={"1rem"}
                                justifyContent={"space-between"}
                            >
                                <TextField
                                    type="number"
                                    required
                                    margin="normal"
                                    label={`Overall`}
                                    inputProps={{
                                        step: "0.5",
                                        min: "0",
                                        max: "9",
                                    }}
                                    value={sections.listeningScore}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) =>
                                        handleOverAllSectionsChange(
                                            e,
                                            "listeningScore"
                                        )
                                    }
                                    disabled
                                    name="listening-overall"
                                    sx={{
                                        width: "100%",
                                    }}
                                />

                                <Button
                                    sx={{
                                        width: "100%",
                                        bgcolor: "purple",
                                        padding: "1rem",
                                        border: "none",
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
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </form>

                    <form action="" onSubmit={handleSubmit}>
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
                                {passages.map((part) => (
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
                                        onChange={(e) =>
                                            setSections((prev) => ({
                                                ...prev,
                                                reading: {
                                                    ...prev.reading,
                                                    [`section${part}`]:
                                                        e.target.value,
                                                },
                                            }))
                                        }
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
                                            accept="image/*"
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
                                            <ul
                                                style={{
                                                    listStyle: "none",
                                                    padding: 0,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "0.5rem",
                                                    width: "100%",
                                                }}
                                            >
                                                {readingFiles.map(
                                                    (file, index) => (
                                                        <li
                                                            key={index}
                                                            style={{
                                                                backgroundColor:
                                                                    "lightblue",
                                                                padding:
                                                                    "0.5rem",
                                                                borderRadius:
                                                                    "0.5rem",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            {file.name ? (
                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "space-between",
                                                                        alignItems:
                                                                            "center",
                                                                        gap: "1rem",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            overflow:
                                                                                "hidden",
                                                                            textOverflow:
                                                                                "ellipsis",
                                                                            whiteSpace:
                                                                                "nowrap",
                                                                        }}
                                                                    >
                                                                        {
                                                                            file.name
                                                                        }
                                                                    </Typography>
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "space-between",
                                                                        alignItems:
                                                                            "center",
                                                                        gap: "1rem",
                                                                    }}
                                                                >
                                                                    <a
                                                                        style={{
                                                                            textDecoration:
                                                                                "none",
                                                                            color: "black",
                                                                        }}
                                                                        href={
                                                                            file?.url
                                                                        }
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{
                                                                                overflow:
                                                                                    "hidden",
                                                                                textOverflow:
                                                                                    "ellipsis",
                                                                                whiteSpace:
                                                                                    "nowrap",
                                                                                width: "fit-content",
                                                                                maxWidth:
                                                                                    "200px",
                                                                            }}
                                                                        >
                                                                            {
                                                                                file?.url
                                                                            }
                                                                        </Typography>
                                                                    </a>
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleDeleteFile(
                                                                                file?.id,
                                                                                "reading"
                                                                            )
                                                                        }
                                                                        sx={{
                                                                            bgcolor:
                                                                                "red",
                                                                            color: "white",
                                                                            padding:
                                                                                "0.5rem",
                                                                            borderRadius:
                                                                                "0.5rem",
                                                                            ":hover":
                                                                                {
                                                                                    bgcolor:
                                                                                        "red",
                                                                                },
                                                                        }}
                                                                    >
                                                                        <Delete />
                                                                    </Button>
                                                                </span>
                                                            )}
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
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"baseline"}
                                gap={2}
                            >
                                <TextField
                                    type="number"
                                    required
                                    open
                                    margin="normal"
                                    label={`Overall`}
                                    inputProps={{
                                        step: "0.5",
                                        min: "0",
                                        max: "9",
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={sections.readingScore}
                                    onChange={(e) =>
                                        handleOverAllSectionsChange(
                                            e,
                                            "readingScore"
                                        )
                                    }
                                    disabled
                                    sx={{
                                        width: "100%",
                                        "& .MuiInputBase-root.Mui-disabled": {
                                            opacity: 1,
                                        },
                                    }}
                                />
                                <Button
                                    sx={{
                                        width: "100%",
                                        bgcolor: "purple",
                                        padding: "1rem",
                                        border: "none",
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
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </form>

                    <form action="" onSubmit={handleSubmit}>
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

                                {task1.map((part, index) => (
                                    <TextField
                                        padding={"1rem"}
                                        key={part}
                                        type="number"
                                        required
                                        label={`${part}`}
                                        name={`task1-${part}`}
                                        id={`task1-${part}`}
                                        value={
                                            sections.writing[
                                                `section${index + 1}`
                                            ]
                                        }
                                        inputProps={{
                                            step: "1",
                                            min: "0",
                                            max: "10",
                                        }}
                                        onChange={(e) =>
                                            setSections((prev) => ({
                                                ...prev,
                                                writing: {
                                                    ...prev.writing,
                                                    [`section${index + 1}`]:
                                                        e.target.value,
                                                },
                                            }))
                                        }
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

                                {task2.map((part, index) => (
                                    <TextField
                                        padding={"1rem"}
                                        key={part}
                                        type="number"
                                        required
                                        id={`task1-${part}`}
                                        label={`${part}`}
                                        name={`task1-${part}`}
                                        value={
                                            sections.writing[
                                                `section${index + 5}`
                                            ]
                                        }
                                        onChange={(e) =>
                                            setSections((prev) => ({
                                                ...prev,
                                                writing: {
                                                    ...prev.writing,
                                                    [`section${index + 5}`]:
                                                        e.target.value,
                                                },
                                            }))
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
                                            accept="image/*"
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
                                            <ul
                                                style={{
                                                    listStyle: "none",
                                                    padding: 0,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "0.5rem",
                                                    width: "100%",
                                                }}
                                            >
                                                {writingFiles.map(
                                                    (file, index) => (
                                                        <li
                                                            key={index}
                                                            style={{
                                                                backgroundColor:
                                                                    "lightblue",
                                                                padding:
                                                                    "0.5rem",
                                                                borderRadius:
                                                                    "0.5rem",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            {file.name ? (
                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "space-between",
                                                                        alignItems:
                                                                            "center",
                                                                        gap: "1rem",
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            overflow:
                                                                                "hidden",
                                                                            textOverflow:
                                                                                "ellipsis",
                                                                            whiteSpace:
                                                                                "nowrap",
                                                                        }}
                                                                    >
                                                                        {
                                                                            file.name
                                                                        }
                                                                    </Typography>
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "space-between",
                                                                        alignItems:
                                                                            "center",
                                                                        gap: "1rem",
                                                                    }}
                                                                >
                                                                    <a
                                                                        style={{
                                                                            textDecoration:
                                                                                "none",
                                                                            color: "black",
                                                                        }}
                                                                        href={
                                                                            file?.url
                                                                        }
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{
                                                                                overflow:
                                                                                    "hidden",
                                                                                textOverflow:
                                                                                    "ellipsis",
                                                                                whiteSpace:
                                                                                    "nowrap",
                                                                                width: "fit-content",
                                                                                maxWidth:
                                                                                    "200px",
                                                                            }}
                                                                        >
                                                                            {
                                                                                file?.url
                                                                            }
                                                                        </Typography>
                                                                    </a>
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleDeleteFile(
                                                                                file?.id,
                                                                                "writing"
                                                                            )
                                                                        }
                                                                        sx={{
                                                                            bgcolor:
                                                                                "red",
                                                                            color: "white",
                                                                            padding:
                                                                                "0.5rem",
                                                                            borderRadius:
                                                                                "0.5rem",
                                                                            ":hover":
                                                                                {
                                                                                    bgcolor:
                                                                                        "red",
                                                                                },
                                                                        }}
                                                                    >
                                                                        <Delete />
                                                                    </Button>
                                                                </span>
                                                            )}
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
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"baseline"}
                                gap={"1rem"}
                            >
                                <TextField
                                    type="number"
                                    required
                                    margin="normal"
                                    label={`Overall`}
                                    inputProps={{
                                        step: "0.5",
                                        min: "0",
                                        max: "9",
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={sections.writingScore}
                                    onChange={(e) =>
                                        handleOverAllSectionsChange(
                                            e,
                                            "writingScore"
                                        )
                                    }
                                    disabled
                                    sx={{
                                        width: "100%",
                                        "& .MuiInputBase-root.Mui-disabled": {
                                            opacity: 1,
                                        },
                                    }}
                                />
                                <Button
                                    sx={{
                                        width: "100%",
                                        bgcolor: "purple",
                                        padding: "1rem",
                                        border: "none",
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
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </form>

                    <form onSubmit={handleSubmit}>
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
                                {speaking.map((part, index) => (
                                    <TextField
                                        padding={"1rem"}
                                        key={part}
                                        type="number"
                                        required
                                        id={`speaking-${part}`}
                                        label={`${part}`}
                                        name={`speaking-${part}`}
                                        value={
                                            sections.speaking[
                                                `section${index + 1}`
                                            ]
                                        }
                                        inputProps={{
                                            step: "1",
                                            min: "0",
                                            max: "9",
                                        }}
                                        onChange={(e) => {
                                            setSections((prev) => ({
                                                ...prev,
                                                speaking: {
                                                    ...prev.speaking,
                                                    [`section${index + 1}`]:
                                                        e.target.value,
                                                },
                                            }));
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
                                            onChange={handleAudioUpload}
                                        />
                                    </Button>

                                    {speakingFiles.length > 0 && (
                                        <Box mt={2}>
                                            <Typography variant="h6">
                                                Selected Files:
                                            </Typography>
                                            <ul
                                                style={{
                                                    listStyle: "none",
                                                    padding: 0,
                                                }}
                                            >
                                                {sections?.speaking?.audioId
                                                    ?.url ? (
                                                    <li
                                                        style={{
                                                            backgroundColor:
                                                                "lightblue",
                                                            padding: "0.5rem",
                                                            borderRadius:
                                                                "0.5rem",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                                alignItems:
                                                                    "center",
                                                                gap: "1rem",
                                                            }}
                                                        >
                                                            <a
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                    color: "black",
                                                                }}
                                                                href={
                                                                    sections
                                                                        .speaking
                                                                        .audioId
                                                                        ?.url
                                                                }
                                                            >
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        overflow:
                                                                            "hidden",
                                                                        textOverflow:
                                                                            "ellipsis",
                                                                        whiteSpace:
                                                                            "nowrap",
                                                                        width: "fit-content",
                                                                        maxWidth:
                                                                            "200px",
                                                                    }}
                                                                >
                                                                    {
                                                                        sections
                                                                            .speaking
                                                                            .audioId
                                                                            ?.url
                                                                    }
                                                                </Typography>
                                                            </a>
                                                            <Button
                                                                sx={{
                                                                    bgcolor:
                                                                        "red",
                                                                    color: "white",
                                                                    padding:
                                                                        "0.5rem",
                                                                    borderRadius:
                                                                        "0.5rem",
                                                                    ":hover": {
                                                                        bgcolor:
                                                                            "red",
                                                                    },
                                                                }}
                                                                onClick={() =>
                                                                    handleDeleteFile(
                                                                        sections
                                                                            .speaking
                                                                            .audioId
                                                                            ?.id,
                                                                        "speaking"
                                                                    )
                                                                }
                                                            >
                                                                <Delete />
                                                            </Button>
                                                        </span>
                                                    </li>
                                                ) : (
                                                    <li
                                                        style={{
                                                            backgroundColor:
                                                                "lightblue",
                                                            padding: "0.5rem",
                                                            borderRadius:
                                                                "0.5rem",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        {speakingFiles}
                                                    </li>
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
                                display={"flex"}
                                gap={"1rem"}
                                alignItems={"baseline"}
                            >
                                <TextField
                                    type="number"
                                    required
                                    margin="normal"
                                    disabled
                                    value={sections.speakingScore}
                                    label={`Overall`}
                                    inputProps={{
                                        step: "0.5",
                                        min: "0",
                                        max: "9",
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) =>
                                        handleOverAllSectionsChange(
                                            e,
                                            "speakingScore"
                                        )
                                    }
                                    sx={{
                                        width: "100%",
                                        "& .MuiInputBase-root.Mui-disabled": {
                                            opacity: 1,
                                        },
                                    }}
                                />
                                <Button
                                    sx={{
                                        width: "100%",
                                        bgcolor: "purple",
                                        padding: "1rem",
                                        border: "none",
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
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>

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
                        variant="contained"
                        onClick={() => navigate(`feedback`)}
                        sx={{
                            bgcolor: "#38003d",
                            color: "white",
                            padding: "0.5rem 2rem",
                            fontWeight: "bold",
                            ":hover": { bgcolor: "primary" },
                            borderRadius: "0.6rem",
                        }}
                        fullWidth
                    >
                        Feedback
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
        </Grow>
    );
};

export default ExamCheck;
