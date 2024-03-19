import React, { useContext } from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import { colors } from "../../constants/colors";
import { Link, useParams, useLocation } from "react-router-dom";
import Context from "../../context/Context"; // Adjust the import path as necessary

const ExamCheck = () => {
    const location = useLocation();
    const participant = location.state?.participant;
    const { scores } = useContext(Context);
    const sections = ["listening", "reading", "writing", "speaking"];

    return (
        <Stack
            width={"70%"}
            height={"100vh"}
            m={"auto"}
            p={"2rem"}
            justifyContent={"center"}
        >
            <Box>
                <Typography
                    variant="h4"
                    fontWeight={"bold"}
                    py={"1rem"}
                    textAlign={"center"}
                >
                    {participant
                        ? `${participant.firstName} ${participant.lastName}`
                        : "Participant"}
                </Typography>
            </Box>
            {sections.map((section) => (
                <Box key={section}>
                    <Typography variant="h6" fontWeight={"bold"} py={"0.5rem"}>
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Typography>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        p={"0.5rem"}
                        alignItems={"center"}
                        bgcolor={colors.secondary}
                        borderRadius={"1rem"}
                    >
                        <Typography variant={"h6"}>
                            {scores[section]}
                        </Typography>
                        <Button
                            component={Link}
                            variant="contained"
                            to={`/admin/exams/:examId/participants/accepted/:rowId/${section}`}
                            sx={{
                                bgcolor: colors.primary,
                                ":hover": { bgcolor: colors.primary },
                                borderRadius: "0.6rem",
                                textTransform: "none",
                            }}
                        >
                            Details
                        </Button>
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
};

export default ExamCheck;
