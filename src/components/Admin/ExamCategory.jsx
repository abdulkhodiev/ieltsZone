import React from "react";
import { Stack, Button } from "@mui/material";
import { colors } from "../../constants/colors";
import { Link, useLocation, useParams } from "react-router-dom";

const ExamCategory = () => {
    const { examId } = useParams();
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
            <Button
                component={Link}
                to={`/admin/exams/${examId}/participants/applied`}
                variant="contained"
                sx={{
                    fontWeight: "bold",
                    bgcolor:
                        pathname ===
                        `/admin/exams/${examId}/participants/applied`
                            ? colors.primary
                            : colors.secondary,
                    ":hover": {
                        bgcolor: colors.primary,
                        color: colors.secondary,
                    },
                    borderRadius: "0.8rem",
                    px: "2rem",
                    color:
                        pathname ===
                        `/admin/exams/${examId}/participants/applied`
                            ? "white"
                            : "black",
                    boxShadow: "none",
                }}
            >
                Applied
            </Button>

            <Button
                component={Link}
                to={`/admin/exams/${examId}/participants/accepted`}
                variant="contained"
                sx={{
                    fontWeight: "bold",
                    bgcolor:
                        pathname ===
                        `/admin/exams/${examId}/participants/accepted`
                            ? colors.primary
                            : colors.secondary,
                    ":hover": {
                        bgcolor: colors.primary,
                        color: colors.secondary,
                    },
                    borderRadius: "0.8rem",
                    px: "2rem",
                    color:
                        pathname ===
                        `/admin/exams/${examId}/participants/accepted`
                            ? colors.secondary
                            : colors.primary,
                    boxShadow: "none",
                }}
            >
                Accepted
            </Button>
        </Stack>
    );
};

export default ExamCategory;
