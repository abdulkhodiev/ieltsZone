import { colors } from "../../constants/colors";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import lady from "../../assets/ielts-coaching.png";
import PromoModal from "../UI/promoModal";

const MainHeader = () => {
    const navigate = useNavigate();

    return (
        <Box
            height={"80vh"}
            sx={{
                borderRadius: "2rem",
                display: "flex",
                justifyContent: "space-between",
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
                    alignItems: {
                        xs: "center",
                        sm: "center",
                        md: "flex-start",
                        lg: "flex-start",
                    },
                    height: "100%",
                    justifyContent: "center",
                    gap: "2rem",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: {
                            xs: "1rem",
                            sm: "1rem",
                            md: "2rem",
                            lg: "2rem",
                        },
                        fontWeight: "bold",

                        color: colors.primary,
                    }}
                >
                    Welcome to IELTS ZONE
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: {
                            xs: "2.5rem",
                            sm: "3rem",
                            md: "4rem",
                            lg: "4rem",
                        },
                        fontWeight: "bold",
                        textAlign: {
                            xs: "center",
                            sm: "center",
                            md: "left",
                            lg: "left",
                        },
                        color: colors.primary,
                    }}
                >
                    Elevate Your Success with Mock IELTS!
                </Typography>
                <Typography
                    variant="subtitle1"
                    textAlign={{
                        xs: "center",
                        sm: "center",
                        md: "left",
                        lg: "left",
                    }}
                    py={2}
                >
                    Step into a realm of unparalleled preparation and triumph at
                    IELTS ZONE, your premier destination for mastering the IELTS
                    exam through the power of Mock Tests. Our specialized focus
                    on Mock IELTS sets us apart, ensuring you are not just
                    prepared but confident to face the challenges of the real
                    exam.
                </Typography>

                <Stack gap={2} direction={"row"}>
                    <Button
                        onClick={() => navigate("/register")}
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
                                lg: "1.2rem",
                            },
                            padding: "0.8rem 1.5rem",
                        }}
                    >
                        📜 Register For Mock IELTS
                    </Button>
                    <PromoModal />
                </Stack>
            </Box>
            <Box
                sx={{
                    display: {
                        xs: "none",
                        sm: "none",
                        md: "none ",
                        lg: "block",
                    },
                }}
            >
                <img
                    src={lady}
                    style={{
                        width: "475px",

                        borderRadius: "2rem",
                    }}
                    alt=""
                />
            </Box>
        </Box>
    );
};

export default MainHeader;
