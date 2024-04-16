import React from "react";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ExamCategory, ExamApplied, ExamAccepted } from "../../../index";
import { useParams } from "react-router-dom";

const ExamParticipants = () => {
    const { examId } = useParams();
    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"0.5rem"}
            m={"auto"}
            sx={{
                width: {
                    xs: "100%",
                    sm: "90%",
                    md: "90%",
                    lg: "75%",
                    xl: "75%",
                },
            }}
        >
            <ExamCategory />
            <Outlet />
        </Stack>
    );
};

export default ExamParticipants;
