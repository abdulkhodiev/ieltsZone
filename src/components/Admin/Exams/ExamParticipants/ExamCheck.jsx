import React, { useContext } from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import { colors } from "../../../../constants/colors";
import { Link, useParams, useLocation } from "react-router-dom";
import Context from "../../../../context/Context";

const ExamCheck = () => {
    const location = useLocation();
    const { examId, rowId } = useParams();
    const participant = location.state?.participant;
    const { scores } = useContext(Context);
    const sections = [
        "listening",
        "reading",
        "writing",
        "speaking",
        "Band Score",
    ];

    return (
        <Stack
            width={"70%"}
            height={"100vh"}
            m={"auto"}
            p={"1em"}
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
                    <Typography
                        variant="h6"
                        textAlign={section === "Band Score" ? "right" : "left"}
                        fontWeight={"bold"}
                        py={"0.5rem"}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Typography>
                    <Stack
                        direction={"row"}
                        justifyContent={
                            section === "Band Score"
                                ? "flex-end"
                                : "space-between"
                        }
                        alignItems={"center"}
                        bgcolor={
                            section === "Band Score"
                                ? colors.cardColor
                                : colors.secondary
                        }
                        ml={section === "Band Score" ? "auto" : "0"}
                        width={
                            section === "Band Score" ? "max-content" : "100%"
                        }
                        p={section === "Band Score" ? "0.5rem 2rem" : "0.5rem"}
                        borderRadius={"1rem"}
                    >
                        <Typography
                            variant={"h6"}
                            textAlign={"left"}
                            fontWeight={section === "Band Score" ? "bold" : ""}
                        >
                            {section === "Band Score"
                                ? scores.BandScore
                                : scores[section.toLowerCase()]}
                        </Typography>
                        {section !== "Band Score" && (
                            <Button
                                component={Link}
                                variant="contained"
                                to={`/admin/exams/${examId}/participants/accepted/${rowId}/${section.toLowerCase()}`}
                                state={{ participant }}
                                sx={{
                                    bgcolor: colors.primary,
                                    ":hover": { bgcolor: colors.primary },
                                    borderRadius: "0.6rem",
                                    textTransform: "none",
                                }}
                            >
                                Details
                            </Button>
                        )}
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
};

export default ExamCheck;
