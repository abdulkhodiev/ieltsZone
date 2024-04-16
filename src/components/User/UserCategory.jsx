import React from "react";
import { Stack, Button } from "@mui/material";
import { colors } from "../../constants/colors";
import { Link, useLocation } from "react-router-dom";

const UserCategory = () => {
    const { pathname } = useLocation();

    return (
        <Stack
            direction={"row"}
            sx={{ gap: "0.5rem" }}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"0.3rem"}
            width={"max-content"}
            borderRadius={"1rem"}
            bgcolor={colors.secondary}
            mt={"3rem"}
            mb={"1rem"}
        >
            <Link to="/user/exams">
                <Button
                    variant="contained"
                    sx={{
                        fontWeight: "bold",
                        bgcolor:
                            pathname === "/user/exams"
                                ? colors.primary
                                : colors.secondary,
                        ":hover": {
                            bgcolor: colors.primary,
                            color: colors.secondary,
                        },
                        borderRadius: "0.8rem",
                        px: "2rem",
                        color: pathname === "/user/exams" ? "white" : "black",
                        boxShadow: "none",
                    }}
                >
                    Exams
                </Button>
            </Link>
            <Link to="/user/results">
                <Button
                    variant="contained"
                    sx={{
                        fontWeight: "bold",
                        bgcolor:
                            pathname === "/user/results"
                                ? colors.primary
                                : colors.secondary,
                        ":hover": {
                            bgcolor: colors.primary,
                            color: colors.secondary,
                        },
                        borderRadius: "0.8rem",
                        px: "2rem",
                        color:
                            pathname === "/user/results"
                                ? colors.secondary
                                : colors.primary,
                        boxShadow: "none",
                    }}
                >
                    Results
                </Button>
            </Link>
        </Stack>
    );
};

export default UserCategory;
