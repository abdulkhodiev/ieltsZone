import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Button,
    Stack,
    Typography,
    Box,
    useTheme,
    useMediaQuery,
    Grow,
} from "@mui/material";
import { Select, Option, FormControl, FormLabel, Textarea } from "@mui/joy";
import { colors } from "../../../../constants/colors";
import {
    getAppliedUserPaymentCheck,
    updatePaymentCheck,
} from "../../../../utils/api/requests/applied-users";
import TransitionsModal from "../../../UI/ContentPreviewModal";
import DropdownSpeakingDates from "../../../UI/DropdownSpeakingDates";
import { getAvailableSpeakingTimes } from "../../../../utils/api/requests/get-availableSpeakingTimes";
import {
    connectWebSocket,
    disconnectWebSocket,
} from "../../../../utils/websocket/websocket";
import dayjs from "dayjs";

const PaymentCheck = () => {
    const { examId, rowId } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [speakingDateId, setSpeakingDateId] = useState("");
    const [availableSpeakingTimes, setAvailableSpeakingTimes] = useState([]);

    const [studentData, setStudentData] = useState({
        firstName: "Loading",
        lastName: "",
        ieltsZoneStudent: false,
        status: "",
        message: "",
        phoneNumber: "",
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
                    status: res.status,
                    message: res.message,
                    phoneNumber: res.student.phoneNumber,
                    paymentPictureUrl: res.paymentPictureUrl,
                    speakingDate: res.speakingDate,
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

    const fetchAvailableSpeakingTimes = async () => {
        try {
            const response = await getAvailableSpeakingTimes(examId);
            setAvailableSpeakingTimes(response);
        } catch (error) {
            console.error("Error fetching available speaking times:", error);
        }
    };

    const removeSpeakingDateFromUI = (speakingDateId) => {
        setAvailableSpeakingTimes((prevTimes) =>
            prevTimes.filter((time) => time.id !== parseInt(speakingDateId))
        );
    };

    useEffect(() => {
        fetchAvailableSpeakingTimes();

        connectWebSocket(examId, (speakingDateId) => {
            if (speakingDateId) {
                removeSpeakingDateFromUI(speakingDateId);
            } else {
                console.error("speakingDateId is undefined");
            }
        });

        return () => {
            disconnectWebSocket();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examId]);

    const handleStatusChange = (event, newValue) => {
        if (newValue) {
            setStudentData({ ...studentData, status: newValue });
        }
    };

    const handleDetailsChange = (event) => {
        setStudentData({ ...studentData, message: event.target.value });
    };

    const handleSave = async () => {
        try {
            await updatePaymentCheck(rowId, {
                status: studentData.status,
                message: studentData.message,
                speakingDateId:
                    speakingDateId === "" ? undefined : speakingDateId,
            });
            console.log("Payment check updated successfully.");
            navigate(`/admin/exams/${examId}/participants/applied`);
        } catch (error) {
            setError("Failed to update payment check.");
            console.error("Error updating payment check:", error);
        }
    };

    return (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={500}>
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
                        <TransitionsModal
                            isMobile={isMobile}
                            img={img}
                            setImage={setImage}
                            examId={examId}
                            rowId={rowId}
                        />
                        <a href={studentData.paymentPictureUrl} target="_blank">
                            <Button
                                sx={{
                                    my: "1rem",
                                    bgcolor: colors.primary,
                                    color: "white",
                                    borderRadius: "0.7rem",
                                    ":hover": { bgcolor: colors.primary },
                                }}
                                variant="contained"
                            >
                                View Payment Check
                            </Button>
                        </a>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-evenly"
                        width={isMobile ? "100%" : "auto"}
                    >
                        <Typography variant="h6" sx={{ mb: "0.5rem" }}>
                            IELTSZONE STUDENT:{" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                    backgroundColor: `${
                                        studentData.ieltsZoneStudent
                                            ? "green"
                                            : "red"
                                    }`,
                                    color: "white",
                                    padding: "0.2rem 0.5rem",
                                    borderRadius: "0.5rem",
                                }}
                            >
                                {studentData.ieltsZoneStudent ? "YES" : "NO"}
                            </span>
                        </Typography>
                        <Typography variant="h7" sx={{ mb: "0.5rem" }}>
                            Phone Number: {studentData.phoneNumber}
                        </Typography>
                        <Typography variant="h7" sx={{ mb: "1rem" }}>
                            Speaking Time:{" "}
                            {dayjs(studentData.speakingDate).format(
                                "HH:mm | DD MMM YYYY"
                            ) || "Not Chosen"}
                        </Typography>

                        <FormControl fullWidth>
                            <FormLabel sx={{ fontWeight: "bold" }}>
                                Available Speaking Times
                            </FormLabel>
                            <DropdownSpeakingDates
                                placeholder={dayjs(
                                    studentData.speakingDate
                                ).format("HH:mm | DD MMM YYYY")}
                                setSpeakingDateId={setSpeakingDateId}
                                availableSpeakingTimes={availableSpeakingTimes}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel sx={{ fontWeight: "bold" }}>
                                Status
                            </FormLabel>
                            <Select
                                required
                                defaultValue={studentData.status}
                                onChange={handleStatusChange}
                                placeholder={studentData.status}
                            >
                                <Option value="REJECTED">REJECTED</Option>
                                <Option value="ACCEPTED">ACCEPTED</Option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel sx={{ fontWeight: "bold", mt: "1rem" }}>
                                Details
                            </FormLabel>
                            <Textarea
                                fullWidth
                                minRows={3}
                                required
                                onChange={handleDetailsChange}
                                margin="normal"
                                value={studentData.message}
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
        </Grow>
    );
};

export default PaymentCheck;
