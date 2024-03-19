import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Box,
    Typography,
    Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { colors } from "../../constants/colors";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ExamCreation = () => {
    const [dateTime, setDateTime] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [details, setDetails] = useState("");
    const [speakingTimes, setSpeakingTimes] = useState([
        { id: Date.now(), time: "" },
    ]);
    const { examId } = useParams();

    // useEffect(() => {
    //     if (examId) {
    //         // Fetch the exam data from your backend or state management store
    //         const fetchExamData = async () => {
    //             const response = await yourAPI.get(`/exams/${examId}`);
    //             const examData = response.data;
    //             // Set the state with the fetched exam data
    //             setDateTime(examData.dateTime);
    //             setPrice(examData.price);
    //             setLocation(examData.location);
    //             setDetails(examData.details);
    //             // Do the same for speaking times if needed
    //         };

    //         fetchExamData();
    //     }
    // }, [examId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ dateTime, price, location, details, speakingTimes });
    };

    const handleSpeakingTimeChange = (id, value) => {
        setSpeakingTimes((currentTimes) =>
            currentTimes.map((time) =>
                time.id === id ? { ...time, time: value } : time
            )
        );
    };

    const addSpeakingTime = () => {
        setSpeakingTimes((currentTimes) => [
            ...currentTimes,
            { id: Date.now(), time: "" },
        ]);
    };

    const removeSpeakingTime = (id) => {
        setSpeakingTimes((currentTimes) =>
            currentTimes.filter((time) => time.id !== id)
        );
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
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
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
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
                        {speakingTimes.map((speakingTime, index) => (
                            <Stack
                                key={speakingTime.id}
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                sx={{ mb: 2 }}
                            >
                                <TextField
                                    fullWidth
                                    required
                                    id="dateTime"
                                    name="dateTime"
                                    label={`Speaking Time ${index + 1}`}
                                    type="datetime-local"
                                    value={speakingTime.time}
                                    onChange={(e) =>
                                        handleSpeakingTimeChange(
                                            speakingTime.id,
                                            e.target.value
                                        )
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Button
                                    onClick={() =>
                                        removeSpeakingTime(speakingTime.id)
                                    }
                                    edge="end"
                                    variant="contained"
                                    sx={{
                                        borderRadius: "1rem",
                                        padding: "1rem 1rem",

                                        bgcolor: "red",
                                        ":hover": { bgcolor: "red" },
                                    }}
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </Button>
                            </Stack>
                        ))}
                        <Button
                            onClick={addSpeakingTime}
                            variant="contained"
                            sx={{
                                fontWeight: "bold",
                                my: "1rem",
                                bgcolor: colors.primary,
                                color: "white",
                                borderRadius: "0.7rem",
                                ":hover": { bgcolor: colors.primary },
                            }}
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
                                    borderRadius: "0.7rem",
                                    ":hover": { bgcolor: colors.primary },
                                }}
                            >
                                Chancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            sx={{
                                my: "1rem",
                                fontWeight: "bold",
                                bgcolor: colors.primary,
                                color: "white",
                                borderRadius: "0.7rem",
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
