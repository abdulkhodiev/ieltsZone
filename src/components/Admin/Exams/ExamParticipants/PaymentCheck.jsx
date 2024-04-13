import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import {
    getAppliedUserPaymentCheck,
    updatePaymentCheck,
} from "../../../../utils/api/requests/applied-users";

const PaymentCheck = () => {
    const { examId, rowId } = useParams();
    const navigate = useNavigate();

    const [studentData, setStudentData] = useState({
        firstName: "Loading",
        lastName: "",
        ieltsZoneStudent: false,
        status: "REJECTED",
        message: "",
    });
    const [img, setImage] = useState(
        "https://images.pexels.com/photos/5428826/pexels-photo-5428826.jpeg?auto=compress&cs=tinysrgb&w=600"
    );
    const [error, setError] = useState(null);

    const getPaymentCheck = async () => {
        try {
            const res = await getAppliedUserPaymentCheck(rowId);
            setStudentData({
                firstName: res.student.firstName,
                lastName: res.student.lastName,
                ieltsZoneStudent: res.isStudent,
            });
            setImage(res.paymentPictureUrl);
        } catch (error) {
            setError("Failed to fetch payment check data.");
            console.error("Error fetching payment check:", error);
        }
    };

    const handleStatusChange = (event) => {
        setStudentData({ ...studentData, status: event.target.value });
    };

    const handleDetailsChange = (event) => {
        setStudentData({ ...studentData, message: event.target.value });
    };

    const handleSave = async () => {
        await updatePaymentCheck(rowId, {
            status: studentData.status,
            message: studentData.message,
        });
        console.log("Payment check updated successfully.");
        navigate(`/admin/exams/${examId}/participants/applied`);
    };

    useEffect(() => {
        getPaymentCheck();
    }, [rowId]);

    return (
        <Stack width={"65%"} m={"auto"} p={"2rem"}>
            {error && <Typography color="error">{error}</Typography>}
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                pb={"1rem"}
            >
                <Typography variant="h4" fontWeight={"bold"}>
                    {studentData.firstName} {studentData.lastName}
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
                            {studentData.ieltsZoneStudent === true
                                ? "YES"
                                : "NO"}
                        </span>
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            required
                            labelId="status-label"
                            id="status"
                            value={studentData.status}
                            label="Status"
                            onChange={handleStatusChange}
                        >
                            <MenuItem value={"REJECTED"}>REJECTED</MenuItem>
                            <MenuItem value={"ACCEPTED"}>ACCEPTED</MenuItem>
                        </Select>
                        <TextField
                            fullWidth
                            required
                            label="Details"
                            multiline
                            name="details"
                            value={studentData.message}
                            onChange={handleDetailsChange}
                            margin="normal"
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
                            type="button"
                            sx={{
                                bgcolor: colors.primary,
                                "&:hover": { bgcolor: colors.darkPrimary },
                                borderRadius: "0.6rem",
                                textTransform: "none",
                                fontSize: "1.1rem",
                            }}
                            onClick={handleSave}
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
