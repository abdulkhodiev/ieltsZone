import React, { useState } from "react";
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Link,
    Alert,
    InputAdornment,
} from "@mui/material";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { register } from "../../utils/api/requests/register";
import MyTelInput from "../UI/MyTelInput";
import KeyIcon from "@mui/icons-material/Key";

const Register = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        telegramUsername: "",
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (credentials.password !== credentials.confirmPassword) {
            setError("Passwords do not match.");
            return;
        } else if (credentials.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        try {
            await register({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                phoneNumber: credentials.phoneNumber,
                password: credentials.password,
                telegramUsername: credentials.telegramUsername,
            });
            navigate("/sms");
        } catch (err) {
            setError(
                err.response.data.password ||
                    err.response.data.phoneNumber ||
                    err.response.data.message ||
                    "Failed to register."
            );
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
                        sm: "90%",
                        md: "50%",
                        lg: "40%",
                    },
                    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.2)",
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
                        Sign Up
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
                        <TextField
                            label="First Name"
                            variant="outlined"
                            name="firstName"
                            value={credentials.firstName}
                            onChange={handleChange}
                            fullWidth
                            required
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            name="lastName"
                            value={credentials.lastName}
                            onChange={handleChange}
                            fullWidth
                            required
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            label="Telegram Username"
                            variant="outlined"
                            name="telegramUsername"
                            value={credentials.telegramUsername}
                            onChange={handleChange}
                            fullWidth
                            style={{ marginBottom: "1rem" }}
                        />
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
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            style={{ marginBottom: "1rem" }}
                            placeholder="Password must be at least 8 characters long."
                            inputProps={{
                                minLength: 8,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            name="confirmPassword"
                            value={credentials.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                            required
                            placeholder="Passwords must match."
                            style={{ marginBottom: "1rem" }}
                            inputProps={{
                                minLength: 8,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon />
                                    </InputAdornment>
                                ),
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
                            Sign Up
                        </Button>
                    </form>
                    <Typography variant="body2">
                        Already have an account?{" "}
                        <Link
                            component={RouterLink}
                            to="/login"
                            style={{ color: "#330140" }}
                        >
                            Log in
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
