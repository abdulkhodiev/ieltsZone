import React from "react";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ExamCategory, ExamApplied, ExamAccepted } from "../index";
import { useParams } from "react-router-dom";

const ExamParticipants = () => {
    const { examId } = useParams();
    return (
        <Stack
            direction={"column"}
            width={"75%"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"0.5rem"}
            m={"auto"}
        >
            <ExamCategory />
            <Outlet />
        </Stack>
    );
};

export default ExamParticipants;
