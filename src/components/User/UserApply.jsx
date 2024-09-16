import { useState, useEffect } from "react";
import {
    Container,
    Button,
    Typography,
    FormControl,
    FormLabel,
    Stack,
    Grid,
    IconButton,
    Paper,
    Box,
    CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
    userInfo,
    paymentPic,
    speakingDates,
    cancelReservation,
} from "../../utils/api/requests/user-apply";
import { colors } from "../../constants/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { reserveExamTemporariy } from "../../utils/api/requests/add-exams";
import TransitionsModal from "../UI/ContentPreviewModal";
import Snackbar from "@mui/joy/Snackbar";
import DropdownSpeakingDates from "../UI/DropdownSpeakingDates";
import { getAvailableSpeakingTimes } from "../../utils/api/requests/get-availableSpeakingTimes";
import {
    connectWebSocket,
    disconnectWebSocket,
} from "../../utils/websocket/websocket";
import Cookie from "js-cookie";

const UserApply = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const [isStudent, setIsStudent] = useState(false);
    const [speakingDateId, setSpeakingDateId] = useState("");
    const [paymentPictureId, setPaymentPictureId] = useState(0);
    const [availableSpeakingTimes, setAvailableSpeakingTimes] = useState([]);
    const [paymentImagePreview, setPaymentImagePreview] = useState(null);
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchExamInfo = async () => {
        try {
            const response = await speakingDates(examId);
            setCardHolderName(response.cardHolderName);
            setCardNumber(response.cardNumber);
        } catch (error) {
            console.error("Error fetching exam info:", error);
        }
    };

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
        const handleReserveExam = async (examId) => {
            await reserveExamTemporariy(examId);
        };

        handleReserveExam(examId);
        fetchExamInfo();
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
    }, [examId]);

    const handleLeave = () => {
        navigate("/user/exams");
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevTime) => {
                const newTime = prevTime - 1;

                if (newTime <= 0) {
                    handleLeave();
                }

                return newTime;
            });
        }, 1000);

        setOpen(true);

        return () => clearInterval(timer);
    }, []);

    const handleCancel = () => {
        cancelReservation(examId);
        navigate("/user/exams");
    };

    const formatTime = () => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        return `${minutes} : ${String(seconds).padStart(2, "0")}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userData = {
                isStudent,
                speakingDateId,
                paymentPictureId,
            };
            await userInfo(examId, userData);

            Cookie.remove("countdown");
            navigate("/user/exams");
        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };

    const handlePaymentScreenshotChange = async (event) => {
        const file = event.target.files[0];
        setLoading(true);
        setPaymentImagePreview(URL.createObjectURL(file));

        try {
            const paymentRes = await paymentPic(file);
            setPaymentPictureId(paymentRes);
            setLoading(false);
        } catch (error) {
            console.error("Error uploading payment image:", error);
        }
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                my: "1rem",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Stack
                sx={{
                    padding: {
                        xs: "0.5rem",
                        sm: "0.5rem",
                    },
                    margin: {
                        xs: "0.5rem",
                        sm: "1rem",
                        md: "1.5rem",
                    },
                    width: {
                        xs: "100%",
                        sm: "80%",
                        md: "50%",
                    },
                    position: "sticky",
                    top: 0,
                    left: 0,
                    boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
                    zIndex: 1,
                    backgroundColor: "white",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="h6"
                    gutterBottom
                    fontWeight="bold"
                    color={colors.primary}
                    textAlign="center"
                    className="mb-0"
                >
                    {formatTime()}
                </Typography>
            </Stack>

            <Paper
                marginY={{
                    xs: "3rem",
                }}
                elevation={3}
                sx={{
                    padding: {
                        xs: "1rem",
                        sm: "2rem",
                    },
                    width: {
                        xs: "100%",
                        sm: "80%",
                        md: "50%",
                    },
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    fontWeight="bold"
                    color={colors.primary}
                    textAlign="center"
                    mb={4}
                >
                    Seat Reservation
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        spacing={2}
                        alignItems="baseline"
                        display="flex"
                    >
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <FormControl required component="fieldset">
                                <FormLabel
                                    component="legend"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Available Speaking Times
                                </FormLabel>
                                <DropdownSpeakingDates
                                    setSpeakingDateId={setSpeakingDateId}
                                    availableSpeakingTimes={
                                        availableSpeakingTimes
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color={colors.primary}
                            >
                                Card Number:{" "}
                                {cardNumber.replace(/(.{4})/g, "$1 ")}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color={colors.primary}
                            >
                                Card Holder Name: {cardHolderName}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <input
                                style={{ display: "none" }}
                                id="payment-screenshot"
                                type="file"
                                required
                                onChange={handlePaymentScreenshotChange}
                            />
                            <label htmlFor="payment-screenshot">
                                <IconButton
                                    component="span"
                                    sx={{
                                        border: `2px solid ${colors.primary}`,
                                        borderRadius: "1rem",
                                        color: colors.primary,
                                        width: "100%",
                                        fontSize: "1rem",
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
                            {paymentImagePreview && (
                                <Box
                                    overflow={"hidden"}
                                    sx={{
                                        width: {
                                            xs: "95%",
                                            md: "100%",
                                        },
                                        m: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        borderRadius: "1rem",
                                        justifyContent: "center",
                                    }}
                                >
                                    <TransitionsModal
                                        img={paymentImagePreview}
                                    />
                                </Box>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                                <Button
                                    onClick={handleCancel}
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        bgcolor: "red",
                                        color: "white",
                                        "&:hover": { bgcolor: "red" },
                                        borderRadius: "0.6rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={loading}
                                    sx={{
                                        bgcolor: colors.primary,
                                        color: "white",
                                        "&:hover": {
                                            bgcolor: colors.primary,
                                        },
                                        fontWeight: "bold",
                                        borderRadius: "0.6rem",
                                    }}
                                >
                                    {loading && (
                                        <CircularProgress
                                            sx={{
                                                color: "white",
                                            }}
                                        />
                                    )}
                                    Submit
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>

                <Snackbar
                    open={open}
                    color="success"
                    variant="solid"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    onClose={() => setOpen(false)}
                    autoHideDuration={8000}
                    size="sm"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "min-content",
                        alignItems: "center",
                    }}
                    x
                >
                    You have {formatTime()} minutes to apply.
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default UserApply;
