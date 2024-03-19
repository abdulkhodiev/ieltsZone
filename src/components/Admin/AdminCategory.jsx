import React from "react";
import { Stack, Button } from "@mui/material";
import { colors } from "../../constants/colors";
import { Link, useLocation } from "react-router-dom";

const AdminCategory = () => {
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
            my={"2rem"}
        >
            <Link to="/admin/mentors">
                <Button
                    variant="contained"
                    sx={{
                        fontWeight: "bold",
                        bgcolor:
                            pathname === "/admin/mentors"
                                ? colors.primary
                                : colors.secondary,
                        ":hover": {
                            bgcolor: colors.primary,
                            color: colors.secondary,
                        },
                        borderRadius: "0.8rem",
                        px: "2rem",
                        color:
                            pathname === "/admin/mentors" ? "white" : "black",
                        boxShadow: "none",
                    }}
                >
                    Admins
                </Button>
            </Link>
            <Link to="/admin/exams">
                <Button
                    variant="contained"
                    sx={{
                        fontWeight: "bold",
                        bgcolor:
                            pathname === "/admin/exams"
                                ? colors.primary
                                : colors.secondary,
                        ":hover": {
                            bgcolor: colors.primary,
                            color: colors.secondary,
                        },
                        borderRadius: "0.8rem",
                        px: "2rem",
                        color:
                            pathname === "/admin/exams"
                                ? colors.secondary
                                : colors.primary,
                        boxShadow: "none",
                    }}
                >
                    Exams
                </Button>
            </Link>
        </Stack>
    );
};

export default AdminCategory;
