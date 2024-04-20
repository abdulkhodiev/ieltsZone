import React, { useState, useEffect } from "react";
import {
    Container,
    TextField,
    Button,
    Box,
    Typography,
    Stack,
    Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOn from "@mui/icons-material/LocationOn";
import { colors } from "../../../constants/colors";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    AddExam,
    EditExam,
    getExamById,
} from "../../../utils/api/requests/add-exams";
import Snackbar from "@mui/joy/Snackbar";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

const ExamCreation = () => {
    const { examId } = useParams();
    const navigate = useNavigate();

    const [examDateTime, setExamDateTime] = useState("");
    const [price, setPrice] = useState("");
    const [numberOfPlaces, setNumberOfPlaces] = useState("");
    const [location, setLocation] = useState("");
    const [locationUrl, setLocationUrl] = useState("");
    const [details, setDetails] = useState("");
    const [speakingDates, setSpeakingDates] = useState([""]);
    const [currency, setCurrency] = useState("dollar");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const examData = {
            examDateTime,
            price,
            numberOfPlaces,
            location,
            locationUrl,
            details,
            speakingDates,
        };

        try {
            if (examId) {
                await EditExam(examId, examData);
            } else {
                console.log("Sending Exam Data:", examData);
                await AddExam(examData);
            }

            navigate("/admin/exams");
        } catch (error) {
            console.error(error);
            setIsError(true);
        }
    };

    useEffect(() => {
        const fetchExamDetails = async () => {
            if (examId) {
                try {
                    const examDetails = await getExamById(examId);
                    setExamDateTime(examDetails.examDateTime);
                    setPrice(examDetails.price);
                    setNumberOfPlaces(examDetails.numberOfPlaces);
                    setLocation(examDetails.location);
                    setLocationUrl(examDetails.locationUrl);
                    setDetails(examDetails.details);
                    setSpeakingDates(examDetails.speakingDates || [""]);
                } catch (error) {
                    console.error("Failed to fetch exam details:", error);
                }
            }
        };

        fetchExamDetails();
    }, [examId]);

    const handleSpeakingTimeChange = (index, value) => {
        const updatedSpeakingTimes = speakingDates.map((time, i) =>
            i === index ? value : time
        );
        setSpeakingDates(updatedSpeakingTimes);
    };

    const addSpeakingTime = () => {
        setSpeakingDates([...speakingDates, ""]);
    };

    const removeSpeakingTime = (index) => {
        setSpeakingDates(speakingDates.filter((_, i) => i !== index));
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                padding: {
                    xs: "3rem",
                    sm: "2rem",
                    md: "0rem",
                },
                width: {
                    xs: "100%",
                    sm: "90%",
                    md: "70%",
                },
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                fontWeight={"bold"}
                color={colors.primary}
            >
                EXAM INFORMATION
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                width={"100%"}
                sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "row",
                    },
                    gap: {
                        xs: 0,
                        sm: 0,
                        md: "2rem",
                    },
                    justifyContent: "center",
                    alignItems: "start",
                }}
            >
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: "60%",
                        },
                    }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="dateTime"
                        label="Date Time"
                        name="dateTime"
                        type="datetime-local"
                        value={examDateTime}
                        onChange={(e) => setExamDateTime(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Input
                        placeholder="Amount"
                        fullWidth
                        startDecorator={{ dollar: "UZS" }[currency]}
                        endDecorator={
                            <React.Fragment>
                                <Divider orientation="vertical" />
                                <Select
                                    variant="plain"
                                    value={currency}
                                    onChange={(e) =>
                                        setCurrency(e.target.value)
                                    }
                                    slotProps={{
                                        listbox: {
                                            variant: "outlined",
                                        },
                                    }}
                                    sx={{
                                        mr: -1.5,
                                        "&:hover": { bgcolor: "transparent" },
                                    }}
                                >
                                    <Option value="dollar">UZB so'm</Option>
                                </Select>
                            </React.Fragment>
                        }
                        value={price}
                        sx={{ width: "100%", height: "3.6rem", mt: "0.5rem" }}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                    />
                    <Input
                        fullWidth
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Exam location"
                        startDecorator={
                            <Button variant="soft" color="neutral">
                                <LocationOn />
                                UZBEKISTAN
                            </Button>
                        }
                        sx={{ width: "100%", height: "3.6rem", mt: "1rem" }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="location"
                        label="Location Link"
                        name="location"
                        value={locationUrl}
                        onChange={(e) => setLocationUrl(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        type="number"
                        fullWidth
                        id="seats"
                        label="Available Seats"
                        name="seats"
                        value={numberOfPlaces}
                        onChange={(e) => setNumberOfPlaces(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="details"
                        label="Details"
                        name="details"
                        multiline
                        rows={4}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </Box>
                <Box sx={{ width: { xs: "100%", sm: "100%", md: "40%" } }}>
                    <Box sx={{ width: "100%" }} my={2}>
                        {speakingDates.map((time, index) => (
                            <Stack
                                key={index}
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                sx={{ mb: 2 }}
                            >
                                <TextField
                                    fullWidth
                                    required
                                    label={`Speaking Time ${index + 1}`}
                                    type="datetime-local"
                                    value={time}
                                    onChange={(e) =>
                                        handleSpeakingTimeChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                />
                                <Button
                                    onClick={() => removeSpeakingTime(index)}
                                    edge="end"
                                    variant="contained"
                                    color="error"
                                    aria-label="delete"
                                    sx={{
                                        bgcolor: "red",
                                        color: "white",
                                        p: "1rem 1rem",
                                        borderRadius: "0.6rem",
                                    }}
                                >
                                    <DeleteIcon />
                                </Button>
                            </Stack>
                        ))}
                        <Button
                            onClick={addSpeakingTime}
                            variant="contained"
                            fullWidth
                            sx={{
                                fontWeight: "bold",

                                bgcolor: "green",
                                color: "white",
                                fontSize: "0.7rem",
                                borderRadius: "0.5rem",
                                p: "0.7rem 1rem",
                                ":hover": { bgcolor: colors.primary },
                            }}
                        >
                            Add Speaking Time
                        </Button>
                    </Box>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        gap={"1rem"}
                    >
                        <Button
                            onClick={() => navigate("/admin/exams")}
                            type="submit"
                            fullWidth
                            sx={{
                                fontWeight: "bold",

                                bgcolor: "red",
                                color: "white",
                                fontSize: "0.7rem",
                                borderRadius: "0.5rem",
                                p: "0.7rem 1rem",

                                ":hover": { bgcolor: colors.primary },
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                fontWeight: "bold",
                                bgcolor: colors.primary,
                                color: "white",
                                fontSize: "0.9rem",
                                borderRadius: "0.5rem",
                                p: "0.7rem 1rem",
                                ":hover": { bgcolor: colors.primary },
                            }}
                        >
                            Save
                        </Button>
                    </Stack>
                </Box>
            </Box>
            <Snackbar color="danger" variant="solid" size="lg" open={isError}>
                Failed to create exam! Please try again!
            </Snackbar>
        </Container>
    );
};

export default ExamCreation;
