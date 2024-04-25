import React, { useEffect, useState } from "react";
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
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { colors } from "../../../../constants/colors";
import {
    getAppliedUserPaymentCheck,
    updatePaymentCheck,
} from "../../../../utils/api/requests/applied-users";

const PaymentCheck = () => {
    const { examId, rowId } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

    useEffect(() => {
        const fetchPaymentCheck = async () => {
            try {
                const res = await getAppliedUserPaymentCheck(rowId);
                setStudentData({
                    firstName: res.student.firstName,
                    lastName: res.student.lastName,
                    ieltsZoneStudent: res.isStudent,
                });
                if (res.paymentPictureUrl !== null) {
                    setImage(res.paymentPictureUrl);
                }
            } catch (error) {
                setError("Failed to fetch payment check data.");
                console.error("Error fetching payment check:", error);
            }
        };
        fetchPaymentCheck();
    }, [rowId]);

    const handleStatusChange = (event) => {
        setStudentData({ ...studentData, status: event.target.value });
    };

    const handleDetailsChange = (event) => {
        setStudentData({ ...studentData, message: event.target.value });
    };

    const handleSave = async () => {
        try {
            await updatePaymentCheck(rowId, {
                status: studentData.status,
                message: studentData.message,
            });
            console.log("Payment check updated successfully.");
            navigate(`/admin/exams/${examId}/participants/applied`);
        } catch (error) {
            setError("Failed to update payment check.");
            console.error("Error updating payment check:", error);
        }
    };

    return (
        <Stack width={isMobile ? "100%" : "max-content"} m="auto" p="2rem">
            {error && <Typography color="error">{error}</Typography>}
            <Stack
                direction="row"
                mt={"2rem"}
                gap={"2rem"}
                justifyContent="space-between"
                pb="1rem"
            >
                <Typography
                    variant="h4"
                    sx={{ textAlign: { xs: "center", md: "left" } }}
                    fontWeight="bold"
                >
                    {studentData.firstName} {studentData.lastName}
                </Typography>
                <Typography
                    sx={{ display: { xs: "none", md: "block" } }}
                    variant="h4"
                    fontWeight="bold"
                >
                    Payment Check
                </Typography>
            </Stack>
            <Stack
                direction={isMobile ? "column" : "row"}
                gap={isMobile ? "1rem" : "5rem"}
                p="2rem"
                justifyContent="center"
                borderRadius="1rem"
                boxShadow="0px 4px 20px rgba(0,0,0,0.1)"
            >
                <Box>
                    <img
                        style={{
                            width: isMobile ? "100%" : "350px",
                            borderRadius: "1rem",
                        }}
                        src={img}
                        alt="Student Visual"
                    />
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-evenly"
                    width={isMobile ? "100%" : "auto"}
                >
                    <Typography variant="h6">
                        IELTSZONE STUDENT:{" "}
                        <span style={{ fontWeight: "bold" }}>
                            {studentData.ieltsZoneStudent ? "YES" : "NO"}
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
                            <MenuItem value="REJECTED">REJECTED</MenuItem>
                            <MenuItem value="ACCEPTED">ACCEPTED</MenuItem>
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
                        direction="row"
                        spacing={2}
                        mt={2}
                        justifyContent="end"
                    >
                        <Button
                            fullWidth
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
                            fullWidth
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
