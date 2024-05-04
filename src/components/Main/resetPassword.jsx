import * as React from "react";
import PropTypes from "prop-types";
import { Input as BaseInput } from "@mui/base/Input";
import { Box, styled } from "@mui/system";
import { Typography } from "@mui/material";
import { colors } from "../../constants/colors";
import { resetPasswordVerify } from "../../utils/api/requests/verify";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

function OTP({ separator, length, value, onChange, setError }) {
    const inputRefs = React.useRef(new Array(length).fill(null));
    const location = useNavigate();

    const focusInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.focus();
    };

    const selectInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.select();
    };

    const handleKeyDown = (event, currentIndex) => {
        if (event.key >= 0 && event.key <= 9) {
            return; // Allow number input
        }

        switch (event.key) {
            case "ArrowLeft":
            case "ArrowRight":
                event.preventDefault();
                const direction = event.key === "ArrowLeft" ? -1 : 1;
                const newIndex = currentIndex + direction;
                if (newIndex >= 0 && newIndex < length) {
                    focusInput(newIndex);
                    selectInput(newIndex);
                }
                break;
            case "Delete":
            case "Backspace":
                event.preventDefault();
                if (currentIndex > 0 && event.key === "Backspace") {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }
                onChange((prevOtp) => {
                    const otpArray = prevOtp.split("");
                    otpArray[currentIndex] = "";
                    return otpArray.join("");
                });
                break;
            default:
                event.preventDefault();
                break;
        }
    };

    const handleChange = (event, currentIndex) => {
        const newValue = event.target.value;
        if (!/^\d$/.test(newValue)) {
            // Only allow single digit
            return;
        }

        onChange((prev) => {
            const otpArray = prev.split("");
            otpArray[currentIndex] = newValue;
            const newOtp = otpArray.join("");
            if (newOtp.length === length) {
                verifyOtp(newOtp);
            }
            return newOtp;
        });

        if (currentIndex < length - 1) {
            focusInput(currentIndex + 1);
        }
    };

    const verifyOtp = async (otp) => {
        try {
            await resetPasswordVerify(otp);
            console.log("OTP Verified:", otp);
            location("/login");
        } catch (err) {
            console.error("Verification Error:", err);
            console.log("$", err);
            setError(err.response.data.message || "Invalid Code");
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {new Array(length).fill(null).map((_, index) => (
                <React.Fragment key={index}>
                    <BaseInput
                        slots={{
                            input: InputElement,
                        }}
                        aria-label={`Digit ${index + 1} of OTP`}
                        slotProps={{
                            input: {
                                ref: (ele) => {
                                    inputRefs.current[index] = ele;
                                },
                                onKeyDown: (event) =>
                                    handleKeyDown(event, index),
                                onChange: (event) => handleChange(event, index),
                                onClick: (event) => handleClick(event, index),
                                onPaste: (event) => handlePaste(event, index),
                                value: value[index] ?? "",
                                type: "tel",
                            },
                        }}
                    />
                    {index === length - 1 ? null : separator}
                </React.Fragment>
            ))}
        </Box>
    );
}

OTP.propTypes = {
    length: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    separator: PropTypes.node,
    value: PropTypes.string.isRequired,
};

export default function ResetInput() {
    const [otp, setOtp] = React.useState("");
    const [error, setError] = React.useState("");
    console.log(error);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    bgcolor: "white",
                    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.2)",
                    padding: {
                        xs: "1rem",
                        sm: "2rem",
                        md: "2rem",
                        lg: "2rem",
                    },

                    borderRadius: "1rem",
                }}
            >
                <Typography variant="subtitle1" sx={{ color: colors.primary }}>
                    <h1>Enter message:</h1>
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <OTP
                        separator={<span> </span>}
                        value={otp}
                        onChange={setOtp}
                        length={6}
                        type="number"
                        setError={setError}
                    />
                    <Typography variant="body2" alii>
                        You have 5 minutes
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}

const blue = {
    100: "#DAECFF",
    200: "#80BFFF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0059B2",
};

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};

const InputElement = styled("input")(
    ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
