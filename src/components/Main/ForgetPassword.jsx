import { useState } from "react";
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Alert,
} from "@mui/material";
import MyTelInput from "../UI/MyTelInput";
import { forgetPassword } from "../../utils/api/requests/forgetPassword";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "phoneNumber") {
            const phoneNumberWithoutSpaces = value.replace(/\s/g, "");
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: phoneNumberWithoutSpaces,
            }));
        } else {
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.confirmPassword) {
            setError("Passwords do not match.");
            return;
        } else if (credentials.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        const payload = {
            password: credentials.password,
            phoneNumber: credentials.phoneNumber,
        };
        try {
            await forgetPassword(payload);
            navigate("/reset-password");
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card
                sx={{
                    minWidth: 275,
                    maxWidth: {
                        xs: "90%",
                        sm: "65%",
                        md: "40%",
                        lg: "40%",
                    },
                    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.2)",
                    borderRadius: "1rem",
                }}
            >
                <CardContent
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "2rem",
                    }}
                >
                    <Typography variant="h5" style={{ marginBottom: "2rem" }}>
                        Forget Password?
                    </Typography>
                    {error && (
                        <Alert
                            severity="error"
                            style={{ width: "100%", marginBottom: "1rem" }}
                        >
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <MyTelInput
                            value={credentials.phoneNumber}
                            onChange={(newValue) =>
                                handleChange({
                                    target: {
                                        name: "phoneNumber",
                                        value: newValue,
                                    },
                                })
                            }
                        />
                        <TextField
                            label="New Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            style={{ marginBottom: "1rem" }}
                            inputProps={{
                                minLength: 8,
                            }}
                        />
                        <TextField
                            label="Confirm New Password"
                            variant="outlined"
                            type="password"
                            name="confirmPassword"
                            value={credentials.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                            required
                            style={{ marginBottom: "1rem" }}
                            inputProps={{
                                minLength: 8,
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            style={{
                                backgroundColor: "#330140",
                                color: "white",
                                padding: "10px 0",
                                borderRadius: "15px",
                                marginBottom: "1rem",
                            }}
                        >
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgetPassword;
