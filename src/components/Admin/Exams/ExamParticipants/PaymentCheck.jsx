import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
    Button,
    Stack,
    Typography,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { colors } from "../../../../constants/colors";

// Mock function to simulate fetching data from the backend
const fetchStudentData = async (studentName) => {
    return {
        ieltsZoneStudent: "True",
        status: "pending",
        details: "",
    };
};

// Replace this URL with your actual backend endpoint
const SAVE_ENDPOINT = "/path/to/your/backend/endpoint";

const PaymentCheck = () => {
    const { examId } = useParams();
    const location = useLocation();
    const studentName = location.state
        ? `${location.state.firstName} ${location.state.lastName}`
        : "Unknown";
    const [studentData, setStudentData] = useState({
        ieltsZoneStudent: "False",
        status: "",
        details: "",
    });
    const [img, setImage] = useState(
        "https://images.pexels.com/photos/5428826/pexels-photo-5428826.jpeg?auto=compress&cs=tinysrgb&w=600"
    );

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchStudentData(studentName);
            setStudentData((prev) => ({ ...prev, ...data }));
        };
        fetchData();
    }, [studentName]);

    const handleStatusChange = (event) => {
        setStudentData({ ...studentData, status: event.target.value });
    };

    const handleDetailsChange = (event) => {
        setStudentData({ ...studentData, details: event.target.value });
    };

    // Function to handle save action
    const handleSave = async () => {
        const payload = {
            studentName,
            ...studentData,
        };

        try {
            const response = await fetch(SAVE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Handle successful save here (e.g., show a success message)
                console.log("Save successful");
            } else {
                // Handle error response from your backend
                console.error("Save failed");
            }
        } catch (error) {
            // Handle network or other errors here
            console.error("Error saving data:", error);
        }
    };
    return (
        <Stack width={"65%"} m={"auto"} p={"2rem"}>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                pb={"1rem"}
            >
                <Typography variant="h4" fontWeight={"bold"}>
                    {studentName}
                </Typography>
                <Typography variant="h4" fontWeight={"bold"}>
                    Payment Check
                </Typography>
            </Stack>
            <Stack
                direction={"row"}
                gap={"5rem"}
                bgcolor={colors.secondary}
                p={"2rem"}
                justifyContent={"center"}
                borderRadius={"1rem"}
            >
                <Box>
                    <img
                        style={{ width: "350px", borderRadius: "1rem" }}
                        src={img}
                        alt="Student Visual"
                    />
                </Box>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-evenly"}
                >
                    <Typography variant="h6">
                        IELTSZONE STUDENT:{" "}
                        <span style={{ fontWeight: "bold" }}>
                            {studentData.ieltsZoneStudent === "True"
                                ? "YES"
                                : "NO"}
                        </span>
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            value={studentData.status}
                            label="Status"
                            onChange={handleStatusChange}
                        >
                            <MenuItem value={"Rejected"}>Rejected</MenuItem>
                            <MenuItem value={"Accepted"}>Accepted</MenuItem>
                        </Select>
                        <TextField
                            fullWidth
                            label="Details"
                            multiline
                            name="details"
                            value={studentData.details}
                            onChange={handleDetailsChange}
                            margin="normal" // Added for spacing
                        />
                    </FormControl>
                    <Stack
                        direction={"row"}
                        spacing={2}
                        mt={2}
                        justifyContent={"end"}
                    >
                        <Button
                            component={Link}
                            to={`/admin/exams/${examId}/participants/applied`}
                            sx={{
                                bgcolor: "red",
                                "&:hover": { bgcolor: "darkred" },
                                borderRadius: "0.6rem",
                                textTransform: "none",
                                fontSize: "1.1rem",
                                color: "white",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            type="button" // Change to "button" to prevent form submission if inside a form
                            sx={{
                                bgcolor: colors.primary,
                                "&:hover": { bgcolor: colors.darkPrimary },
                                borderRadius: "0.6rem",
                                textTransform: "none",
                                fontSize: "1.1rem",
                            }}
                            onClick={handleSave} // Add the onClick handler here
                        >
                            Save
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    );
};

export default PaymentCheck;
