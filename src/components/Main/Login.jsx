import { useState, useContext } from "react";
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Link,
    Alert,
} from "@mui/material";
import { postLogin } from "../../utils/api/requests/login";

import MyTelInput from "../UI/MyTelInput";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        phoneNumber: "",
        password: "",
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

        try {
            const userData = await postLogin(
                credentials.phoneNumber,
                credentials.password
            );

            if (userData && userData.role) {
                const { role } = userData;
                if (role === "ADMIN") {
                    navigate("/admin/mentors");
                } else if (role === "USER") {
                    navigate("/user/exams");
                } else {
                    navigate("/");
                }
            }
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
                        sm: "75%",
                        md: "50%",
                        lg: "50%",
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
                        Log In
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
                            label="Password"
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
                            Log In
                        </Button>
                    </form>
                    <Typography variant="body2">
                        I do not have an account?{" "}
                        <Link
                            component={RouterLink}
                            to="/register"
                            style={{ color: "#330140" }}
                        >
                            Sign Up
                        </Link>
                    </Typography>

                    {error && (
                        <Typography variant="body2">
                            <Link component={RouterLink} to="/forget-password">
                                Forgot Password?
                            </Link>
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
