import React, { useState, useEffect } from "react";
import {
    Container,
    Button,
    Typography,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Stack,
    Grid,
    IconButton,
    Paper,
    CardMedia,
} from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    userInfo,
    paymentPic,
    speakingDates,
    cancelReservation,
} from "../../utils/api/requests/user-apply";
import { colors } from "../../constants/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import dayjs from "dayjs";
import qrCode from "../../assets/qrcode.jpg";
const UserApply = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const [isStudent, setIsStudent] = useState(true);
    const [speakingDate, setSpeakingDate] = useState("");
    const [paymentPictureId, setPaymentPictureId] = useState(0);
    const [availableSpeakingTimes, setAvailableSpeakingTimes] = useState([]);
    const [paymentImagePreview, setPaymentImagePreview] = useState(null);
    const [cardNumber, setCardNumber] = useState("7777 7777 7777 7777");
    const [cardHolderName, setCardHolderName] = useState("John Smith");

    useEffect(() => {
        fetchAvailableTimes();
    }, [examId]);

    const fetchAvailableTimes = async () => {
        try {
            const response = await speakingDates(examId);

            setAvailableSpeakingTimes(response.speakingDates);
        } catch (error) {
            console.error("Error fetching available speaking times:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userData = {
                isStudent,
                speakingDate: speakingDate,
                paymentPictureId,
            };
            await userInfo(examId, userData);

            navigate("/user/exams");
        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };

    const handlePaymentScreenshotChange = async (event) => {
        const file = event.target.files[0];
        setPaymentImagePreview(URL.createObjectURL(file));

        try {
            const paymentRes = await paymentPic(file);
            setPaymentPictureId(paymentRes);
        } catch (error) {
            console.error("Error uploading payment image:", error);
        }
    };

    const handleCancel = () => {
        cancelReservation(examId);
        navigate("/user/exams");
    };
    return (
        <Container
            maxWidth="md"
            sx={{
                my: "1rem",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: "2rem",
                    width: "100%",
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
                        <Grid item xs={12} md={6}>
                            <Grid item xs={12} sx={{ textAlign: "center" }}>
                                <FormControl required component="fieldset">
                                    <FormLabel
                                        component="legend"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Are you an IELTSZONE student?
                                    </FormLabel>
                                    <RadioGroup
                                        required
                                        row
                                        sx={{ justifyContent: "center" }}
                                        value={isStudent}
                                        onChange={(e) =>
                                            setIsStudent(
                                                e.target.value === "true"
                                                    ? true
                                                    : (prevState) => !prevState
                                            )
                                        }
                                    >
                                        <FormControlLabel
                                            value={true}
                                            control={<Radio />}
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio />}
                                            label="No"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: "center" }}>
                                <FormControl required component="fieldset">
                                    <FormLabel
                                        component="legend"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Available Speaking Times
                                    </FormLabel>
                                    <RadioGroup
                                        sx={{ justifyContent: "center" }}
                                        row
                                        value={speakingDate}
                                        onChange={(e) =>
                                            setSpeakingDate(e.target.value)
                                        }
                                    >
                                        {availableSpeakingTimes.map((date) => (
                                            <FormControlLabel
                                                required
                                                key={date}
                                                value={date}
                                                control={<Radio />}
                                                label={dayjs(date).format(
                                                    "HH:mm | DD MMM YYYY"
                                                )}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <img
                                    src={qrCode}
                                    style={{ width: "50%" }}
                                    alt=""
                                />
                                <img
                                    src={qrCode}
                                    style={{ width: "50%" }}
                                    alt=""
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: "center" }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    Card Number: {cardNumber}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    Card Holder Name: {cardHolderName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            display="flex"
                            flexDirection="column"
                            gap={2}
                        >
                            <Grid item xs={12} sx={{ textAlign: "center" }}>
                                <input
                                    style={{ display: "none" }}
                                    id="payment-screenshot"
                                    type="file"
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
                                    <CardMedia
                                        component="img"
                                        sx={{ borderRadius: "1rem" }}
                                        image={paymentImagePreview}
                                        alt="Payment Screenshot"
                                    />
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
                                        Submit
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default UserApply;
