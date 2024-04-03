import React, { useState, useEffect } from "react";
import {
    Container,
    TextField,
    Button,
    Box,
    Typography,
    Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { colors } from "../../../constants/colors";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

    const zoneAPI = axios.create({
        baseURL: "http://localhost:8070/api/v1",
    });

    useEffect(() => {
        if (examId) {
            zoneAPI
                .get(`/exam/${examId}`)
                .then((response) => {
                    const {
                        examDateTime,
                        price,
                        numberOfPlaces,
                        location,
                        locationUrl,
                        details,
                        speakingDates,
                    } = response.data;
                    setExamDateTime(examDateTime);
                    setPrice(price);
                    setNumberOfPlaces(numberOfPlaces);
                    setLocation(location);
                    setLocationUrl(locationUrl);
                    setDetails(details);
                    setSpeakingDates(speakingDates);
                })
                .catch((error) => {
                    console.error("Error fetching exam details:", error);
                });
        }
    }, [examId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const examData = {
            examDateTime,
            price,
            numberOfPlaces,
            location,
            locationUrl,
            details,
            speakingDates, // Assuming this is correctly structured for your backend
        };

        try {
            const endpoint = examId ? `/exam/${examId}` : "/exam";
            // Use the appropriate method based on whether you have an examId
            if (examId) {
                await zoneAPI.put(endpoint, examData);
            } else {
                await zoneAPI.post(endpoint, examData);
            }

            alert("Exam data saved successfully!");
            navigate("/admin/exams");
        } catch (error) {
            console.error("Error saving exam data:", error);
            alert(
                `Error saving exam data: ${
                    error.response?.data?.message || "Please try again."
                }`
            );
        }
    };

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
                width: "70%",
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
                    flexDirection: "row",
                    gap: "2rem",
                    alignItems: "start",
                }}
            >
                <Box width={"60%"}>
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="location"
                        label="Location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
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
                <Box width={"40%"}>
                    <Box sx={{ width: "100%" }} my={2}>
                        {speakingDates.map((time, index) => (
                            <Stack
                                key={index} // Use index as key for simplicity
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
                                >
                                    <DeleteIcon />
                                </Button>
                            </Stack>
                        ))}
                        <Button
                            onClick={addSpeakingTime}
                            variant="contained"
                            color="primary"
                        >
                            Add Speaking Time
                        </Button>
                    </Box>
                    <Stack
                        direction={"row"}
                        justifyContent={"end"}
                        gap={"1rem"}
                    >
                        <Link to="/admin/exams">
                            <Button
                                type="submit"
                                fullWidth
                                sx={{
                                    fontWeight: "bold",
                                    my: "1rem",
                                    bgcolor: "red",
                                    color: "white",
                                    fontSize: "0.7rem",
                                    borderRadius: "0.5rem",
                                    p: "0.5rem 1rem",
                                    ":hover": { bgcolor: colors.primary },
                                }}
                            >
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            sx={{
                                fontWeight: "bold",
                                my: "1rem",
                                bgcolor: colors.primary,
                                color: "white",
                                fontSize: "0.7rem",
                                borderRadius: "0.5rem",
                                p: "0.5rem 1rem",
                                ":hover": { bgcolor: colors.primary },
                            }}
                        >
                            Save
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default ExamCreation;
