import React from "react";
import { colors } from "../../constants/colors";
import { Box, Typography, Button } from "@mui/material";

const MainHeader = () => {
    return (
        <Box
            height={"80vh"}
            sx={{
                borderRadius: "1rem",
                bgcolor: colors.secondary,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: {
                    xs: "1.5rem",
                    sm: "2rem",
                    md: "2rem",
                    lg: "2rem",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: {
                        xs: "95%",
                        sm: "90%",
                        md: "87%",
                        lg: "87%",
                    },
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: {
                            xs: "1.5rem",
                            sm: "2rem",
                            md: "2.5rem",
                            lg: "3rem",
                        },
                        fontWeight: "bold",
                        textAlign: "center",
                        color: colors.primary,
                    }}
                >
                    🌟 Welcome to IELTSZONE - Elevate Your Success with Mock
                    IELTS! 🌟
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: {
                            xs: "1rem",
                            sm: "1.2rem",
                            md: "1.5rem",
                            lg: "1.8rem",
                        },
                        textAlign: "center",
                        width: "80%",
                    }}
                    py={2}
                >
                    Step into a realm of unparalleled preparation and triumph at
                    IELTSZONE, your premier destination for mastering the IELTS
                    exam through the power of Mock Tests. Our specialized focus
                    on Mock IELTS sets us apart, ensuring you are not just
                    prepared but confident to face the challenges of the real
                    exam.
                </Typography>
            </Box>
            <Button
                variant="contained"
                sx={{
                    bgcolor: colors.primary,
                    ":hover": { bgcolor: colors.primary },
                    borderRadius: "1rem",
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "none",
                    fontSize: {
                        xs: "0.8rem",
                        sm: "1rem",
                        md: "1.2rem",
                        lg: "1.5rem",
                    },
                    padding: "0.8rem 1.5rem",
                }}
            >
                Register For Mock IELTS 📜
            </Button>
        </Box>
    );
};

export default MainHeader;
