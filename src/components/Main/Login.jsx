import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const colors = {
    primary: "#330140",
    secondary: "#DEF1FF",
    cardColor: "#FDEDE4",
};

const zoneAPI = axios.create({
    baseURL: "http://localhost:8070/api/v1/",
});

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await zoneAPI.post("auth/signin", {
                phoneNumber,
                password,
            });

            console.log("Login successful:", response.data);
            const { token } = response.data;
            Cookies.set("authToken", token, { expires: 7 });
    }

    // const updateAxiosToken = () => {
    //     const token = Cookies.get("authToken");
    //     if (token) {
    //         zoneAPI.defaults.headers.common[
    //             "Authorization"
    //         ] = `Bearer ${token}`;
    //     } else {
    //         delete zoneAPI.defaults.headers.common["Authorization"];
    //     }
    // };

    // useEffect(() => {
    //     // Ensure axios has the correct token on initial load
    //     updateAxiosToken();
    // }, []);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await zoneAPI.post("auth/signin", {
    //             phoneNumber,
    //             password,
    //         });

    //         console.log("Login successful:", response.data);
    //         const { token } = response.data;

    //         // Store the token in cookies
    //         Cookies.set("authToken", token, { expires: 7 });

    //         // Update axios headers with the new token
    //         updateAxiosToken();

    //         // Navigate to the next page
    //         navigate("/admin/mentors");
    //     } catch (error) {
    //         console.error(
    //             "Login error:",
    //             error.response ? error.response.data : error
    //         );
    //     }
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
