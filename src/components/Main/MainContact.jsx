import React from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import { colors } from "../../constants/colors";
import logo from "../../assets/logo.jpg";
import { Instagram, Facebook, Telegram } from "@mui/icons-material";

const MainContact = () => {
    return (
        <Stack height={"40vh"} sx={{ bgcolor: colors.primary }}>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                width={"90%"}
                m={"auto"}
            >
                <Box width={"20%"}>
                    <img
                        src={logo}
                        alt="Logo"
                        width={"100px"}
                        style={{
                            marginBottom: "1rem",
                            border: `2px solid ${colors.secondary}`,
                            padding: "0.5rem",
                            borderRadius: "1rem",
                        }}
                    />
                    <Typography
                        variant="body2"
                        fontSize={"0.7rem"}
                        color={colors.secondary}
                    >
                        IELTSZONE is a specialized teaching center that prepares
                        individuals for the IELTS exam, with a focus on Mock
                        IELTS tests for effective and targeted preparation.
                    </Typography>
                </Box>
                <Stack>
                    <Typography
                        color={colors.secondary}
                        variant="h6"
                        style={{
                            border: `2px solid ${colors.secondary}`,
                            padding: "0.5rem",
                            borderRadius: "1rem",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Information
                    </Typography>
                    <Stack mx={"auto"} alignItems={"center"}>
                        <a
                            style={{
                                color: colors.secondary,
                                textDecoration: "none",
                            }}
                            href="#"
                        >
                            Home
                        </a>
                        <a
                            style={{
                                color: colors.secondary,
                                textDecoration: "none",
                            }}
                            href="#about"
                        >
                            About Us
                        </a>
                        <a
                            style={{
                                color: colors.secondary,
                                textDecoration: "none",
                            }}
                            href="#"
                        >
                            Sign Up
                        </a>
                        <a
                            style={{
                                color: colors.secondary,
                                textDecoration: "none",
                            }}
                            href="#"
                        >
                            Log In
                        </a>
                    </Stack>
                </Stack>
                <Box>
                    <Typography
                        color={colors.secondary}
                        variant="h6"
                        style={{
                            border: `2px solid ${colors.secondary}`,
                            padding: "0.5rem",
                            borderRadius: "1rem",
                            marginBottom: "0.5rem",
                            textAlign: "center",
                        }}
                    >
                        Contact Us
                    </Typography>
                    <Typography color={colors.secondary} variant="h6">
                        +998 00 000 00 00
                    </Typography>
                    <Typography color={colors.secondary} variant="body2">
                        info@ieltszone.uz
                    </Typography>
                    <Typography color={colors.secondary} variant="body2">
                        Tashkent, Uzbekistan, Bla 123
                    </Typography>
                    <Box py={2}>
                        <Button>
                            <Telegram />
                        </Button>
                        <Button>
                            <Instagram />
                        </Button>
                        <Button>
                            <Facebook />
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default MainContact;
