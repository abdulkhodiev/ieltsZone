import { Card, CardContent, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
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
                        padding: "5rem",
                    }}
                >
                    <Typography
                        variant={"h5"}
                        sx={{
                            marginBottom: "2rem",
                            fontWeight: "bold",
                            fontSize: {
                                xs: "1.4rem",
                                sm: "2.5rem",
                                md: "2.2rem",
                                lg: "3rem",
                            },
                        }}
                    >
                        404 Not Found
                    </Typography>

                    <Button
                        onClick={() => navigate("/")}
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
                        Back to Home
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotFound;
