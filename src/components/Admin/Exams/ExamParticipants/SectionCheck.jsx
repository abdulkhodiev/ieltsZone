import React, { useState, useEffect, useContext } from "react";
import {
    Stack,
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    IconButton,
    Paper,
    CardMedia,
} from "@mui/material";
import { colors } from "../../../../constants/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link, useParams, useNavigate } from "react-router-dom";
import Context from "../../../../context/Context";
import {
    getSectionResults,
    putSectionSecore,
    examPicture,
} from "../../../../utils/api/requests/exam-check-by-section";

const SectionCheck = () => {
    const { examId, rowId, section } = useParams();
    const navigate = useNavigate();
    const { scores, setScores } = useContext(Context);
    const [userInfo, setUserInfo] = useState({});
    const [examImg, setExamImg] = useState(null);
    const [formData, setFormData] = useState({
        score: scores[section] || "",
        details: "",
    });
    const [pictureId, setPictureId] = useState(0);
    const [sectionResults, setSectionResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSectionResults(rowId);
                setUserInfo(data.user);
                setSectionResults(data.sectionResults);
            } catch (error) {
                console.error("Error fetching section results:", error);
            }
        };

        fetchData();
    }, [rowId]);

    const handleExamImg = async (event) => {
        const file = event.target.files[0];
        setExamImg(URL.createObjectURL(file));

        try {
            const pictureRes = await examPicture(file);
            setPictureId(pictureRes);
        } catch (error) {
            console.error("Error uploading payment image:", error);
        }
    };

    const displaySectionName =
        section.charAt(0).toUpperCase() + section.slice(1);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const sectionResult = sectionResults.find(
            (result) =>
                result.sectionName.toUpperCase() === section.toUpperCase()
        );

        if (!sectionResult) {
            console.error(
                "Section result not found for the given section:",
                section
            );
            return;
        }

        const data = {
            score: parseFloat(formData.score),
            feedback: formData.details,
            sectionResultPictureId: pictureId,
        };
        await putSectionSecore(sectionResult.id, data);

        navigate(`/admin/exams/${examId}/participants/accepted/${rowId}`);
    };

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
                    md: "70%",
                },
            }}
        >
            <Stack spacing={4} width="100%">
                <Stack
                    alignItems="center"
                    sx={{
                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },
                        justifyContent: {
                            xs: "center",
                            md: "space-between",
                        },
                        gap: {
                            xs: "1rem",
                            md: "0",
                        },
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ textAlign: { xs: "center", md: "left" } }}
                        fontWeight={"bold"}
                    >
                        {userInfo.firstName} {userInfo.lastName}
                    </Typography>
                    <Typography
                        color={colors.primary}
                        variant="h4"
                        fontWeight={"bold"}
                    >
                        {displaySectionName}
                    </Typography>{" "}
                </Stack>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            required
                            label="Score"
                            type="number"
                            inputProps={{
                                step: 0.5,
                                min: 0,
                                max: 9,
                            }}
                            name="score"
                            value={formData.score}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            label="Details and Comments"
                            multiline
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                        />
                        <Grid item xs={12} sx={{ textAlign: "end" }}>
                            <input
                                style={{ display: "none" }}
                                id="payment-screenshot"
                                type="file"
                                onChange={handleExamImg}
                            />
                            <label htmlFor="payment-screenshot">
                                <IconButton
                                    component="span"
                                    sx={{
                                        border: `2px solid ${colors.primary}`,
                                        borderRadius: "1rem",
                                        color: colors.primary,
                                        fontSize: "1.2rem",
                                        width: "100%",
                                        padding: "0.5rem 1rem",
                                        ":hover": {
                                            bgcolor: colors.primary,
                                            color: "white",
                                        },
                                    }}
                                    aria-label="upload picture"
                                >
                                    <CloudUploadIcon
                                        fontSize="medium"
                                        sx={{ marginRight: "0.5rem" }}
                                    />
                                    Upload Payment Screenshot
                                </IconButton>
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            {examImg && (
                                <CardMedia
                                    component="img"
                                    sx={{ borderRadius: "1rem" }}
                                    height="160"
                                    image={examImg}
                                    alt="Payment Screenshot"
                                />
                            )}
                        </Grid>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={2}
                        >
                            <Button
                                component={Link}
                                to={`/admin/exams/${examId}/participants/accepted/${rowId}`}
                                sx={{
                                    bgcolor: "red",
                                    ":hover": { bgcolor: "red" },
                                    borderRadius: "0.6rem",
                                    textTransform: "none",
                                    fontSize: "1.2rem",
                                    width: "50%",
                                    padding: "0.5rem 1rem",
                                    color: "white",
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    bgcolor: colors.primary,
                                    ":hover": { bgcolor: colors.primary },
                                    borderRadius: "0.6rem",
                                    padding: "0.5rem 1rem",
                                    textTransform: "none",
                                    fontSize: "1.1rem",
                                    width: "50%",
                                }}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </Box>
    );
};

export default SectionCheck;
