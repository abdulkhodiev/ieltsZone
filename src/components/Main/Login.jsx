import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { postLogin } from "../../utils/api/requests/login";
import { colors } from "../../constants/colors";

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userData = await postLogin(phoneNumber, password);
            if (userData && userData.role) {
                const { role } = userData;
                if (role === "ADMIN") {
                    navigate("/admin/mentors");
                } else if (role === "USER") {
                    navigate("/user/exams");
                } else {
                    navigate("/");
                }
            } else {
                console.error("Unexpected response structure:", userData);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Paper
                style={{
                    marginTop: "8%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "20px",
                    backgroundColor: colors.cardColor,
                    borderRadius: "10px",
                }}
            >
                <Typography
                    component="h1"
                    variant="h5"
                    style={{
                        color: colors.primary,
                        marginBottom: "20px",
                    }}
                >
                    Log In
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        autoFocus
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{ marginBottom: "20px" }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: "20px" }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{
                            margin: "30px 0 20px",
                            backgroundColor: colors.primary,
                            color: "#FFFFFF",
                            "&:hover": {
                                backgroundColor: colors.secondary,
                                color: colors.primary,
                            },
                        }}
                    >
                        Log In
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
