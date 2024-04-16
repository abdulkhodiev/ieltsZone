import React, { useContext, useEffect, useState } from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import { colors } from "../../../../constants/colors";
import { Link, useParams } from "react-router-dom";
import Context from "../../../../context/Context";
import {
    getStudentInfo,
    getSectionResults,
} from "../../../../utils/api/requests/exam-check-by-section";

const ExamCheck = () => {
    const { examId, rowId } = useParams();

    const sections = [
        "listening",
        "reading",
        "writing",
        "speaking",
        "Band Score",
    ];

    const [name, setName] = useState({ firstName: "", lastName: "" });
    const [sectionResults, setSectionResults] = useState([]);

    const fetchName = async () => {
        const data = await getStudentInfo(rowId);
        setName(data.student);
    };

    const fetchSectionResults = async () => {
        const data = await getSectionResults(rowId);
        setSectionResults(data.sectionResults);
    };

    useEffect(() => {
        fetchName();
        fetchSectionResults();
    }, [rowId]);

    const calculateBandScore = () => {
        let totalScore = 0;
        sections.forEach((section) => {
            if (section !== "Band Score") {
                const result = sectionResults.find(
                    (result) => result.sectionName.toLowerCase() === section
                );
                if (result && result.score !== null) {
                    totalScore += result.score;
                }
            }
        });
        const bandScore = Math.round((totalScore / 4) * 2) / 2; // Round to the nearest 0.5
        return bandScore;
    };

    const bandScore = calculateBandScore();

    return (
        <Stack
            height={"100vh"}
            m={"auto"}
            p={"1em"}
            justifyContent={"center"}
            sx={{
                width: {
                    xs: "100%",
                    sm: "90%",
                    md: "80%",
                    lg: "70%",
                    xl: "70%",
                },
            }}
        >
            <Box>
                <Typography
                    variant="h4"
                    fontWeight={"bold"}
                    py={"2rem"}
                    textAlign={"center"}
                >
                    {name.firstName} {name.lastName}
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
                        {section === "Band Score"
                            ? "Band Score"
                            : section.charAt(0).toUpperCase() +
                              section.slice(1)}
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
                                ? bandScore
                                : sectionResults.length > 0
                                ? sectionResults.find(
                                      (result) =>
                                          result.sectionName.toLowerCase() ===
                                          section.toLowerCase()
                                  ) !== undefined &&
                                  sectionResults.find(
                                      (result) =>
                                          result.sectionName.toLowerCase() ===
                                          section.toLowerCase()
                                  ).score !== null
                                    ? sectionResults.find(
                                          (result) =>
                                              result.sectionName.toLowerCase() ===
                                              section.toLowerCase()
                                      ).score
                                    : "N/A"
                                : "N/A"}
                        </Typography>
                        {section !== "Band Score" && (
                            <Button
                                component={Link}
                                variant="contained"
                                to={`/admin/exams/${examId}/participants/accepted/${rowId}/${section.toLowerCase()}`}
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
