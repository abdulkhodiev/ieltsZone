import React, { useState, useEffect } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Stack,
    Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { colors } from "../../constants/colors"; // Assuming this path is correct

const UserApply = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const zoneAPI = axios.create({
        baseURL: "http://localhost:8070/api/v1/",
    });

    const examId = pathname.split("/").pop();
    console.log(examId);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isTestzoneStudent, setIsTestzoneStudent] = useState("no");
    const [speakingTime, setSpeakingTime] = useState("");
    const [availableSpeakingTimes, setAvailableSpeakingTimes] = useState([]);
    const [paymentScreenshot, setPaymentScreenshot] = useState(null);

    useEffect(() => {
        fetchAvailableTimes();
    }, [examId]);

    const fetchAvailableTimes = async () => {
        try {
            const response = await zoneAPI.get(`exam/${examId}`);

            console.log(response.data.speakingDates);
            setAvailableSpeakingTimes(response.data.speakingDates);
        } catch (error) {
            console.error("Error fetching available speaking times:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("surname", surname);
        formData.append("phoneNumber", phoneNumber);
        formData.append("isTestzoneStudent", isTestzoneStudent);
        formData.append("speakingTime", speakingTime);
        formData.append("paymentScreenshot", paymentScreenshot);

        try {
            await zoneAPI.post(`registration/register/${examId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Application submitted successfully!");
            navigate("/user/exams"); // Adjust the route as needed
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Failed to submit application. Please try again.");
        }
    };

    const handlePaymentScreenshotChange = (event) => {
        setPaymentScreenshot(event.target.files[0]);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                fontWeight={"bold"}
                color={colors.primary}
                textAlign={"center"}
            >
                Seat Reservation
            </Typography>
            <Box p={3} bgcolor={colors.secondary} borderRadius={"1rem"}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Phone Number"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <FormControl component="fieldset" margin="normal" fullWidth>
                        <FormLabel component="legend">
                            Are you an IELTSZONE student?
                        </FormLabel>
                        <RadioGroup
                            row
                            value={isTestzoneStudent}
                            onChange={(e) =>
                                setIsTestzoneStudent(e.target.value)
                            }
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel component="legend">Speaking Time</FormLabel>
                        <RadioGroup
                            row
                            value={speakingTime}
                            onChange={(e) => setSpeakingTime(e.target.value)}
                        >
                            {Array.isArray(availableSpeakingTimes) &&
                                availableSpeakingTimes.map((time, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={time}
                                        control={<Radio />}
                                        label={new Date(time).toLocaleString()}
                                    />
                                ))}
                        </RadioGroup>
                    </FormControl>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            bgcolor: colors.primary,
                            ":hover": { bgcolor: colors.primary },
                            borderRadius: "0.6rem",
                            textTransform: "none",
                            fontSize: "1.1rem",
                        }}
                        startIcon={<CloudUploadIcon />}
                    >
                        Payment Screenshot
                        <input
                            type="file"
                            hidden
                            onChange={handlePaymentScreenshotChange}
                        />
                    </Button>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="end"
                        mt={2}
                        p={2}
                        bgcolor={colors.cardColor}
                        borderRadius={"0.6rem"}
                        width={"max-content"}
                        ml={"auto"}
                    >
                        <Button
                            component={Link}
                            to={`/user/exams`}
                            sx={{
                                bgcolor: "red",
                                ":hover": { bgcolor: "red" },
                                borderRadius: "0.6rem",
                                textTransform: "none",
                                fontSize: "1.1rem",
                                color: "white",
                            }}
                        >
                            Chancel
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                bgcolor: colors.primary,
                                ":hover": { bgcolor: colors.primary },
                                borderRadius: "0.6rem",
                                textTransform: "none",
                                fontSize: "1.1rem",
                            }}
                        >
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Container>
    );
};

export default UserApply;
