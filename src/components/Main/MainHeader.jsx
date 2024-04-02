import React from "react";
import { colors } from "../../constants/colors";
import { Box, Typography, Button } from "@mui/material";

const MainHeader = () => {
    return (
        <Box
            height={"80vh"}
            my={"2.5vh"}
            sx={{
                borderRadius: "1rem",
                bgcolor: colors.secondary,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "87%",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
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
                        textAlign: "center",
                        width: "80%",
                        fontSize: "1.1rem",
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
                    fontSize: "1.4rem",
                    padding: "0.8rem 1.5rem",
                }}
            >
                Register For Mock IELTS 📜
            </Button>
        </Box>
    );
};

export default MainHeader;
