import { useEffect, useState } from "react";
import {
    Box,
    Grow,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import { Feedbacks } from "../../../data/feedback";
import { getExamResults } from "../../utils/api/requests/exam-check-by-section";
import { useParams } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FeedbackFolder = () => {
    const { examRegistrationId } = useParams();

    const [sections, setSections] = useState({});

    const getUserScore = async () => {
        try {
            const res = await getExamResults(examRegistrationId);
            setSections(res);
        } catch (error) {
            console.error("Failed to fetch exam results:", error);
        }
    };

    useEffect(() => {
        getUserScore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examRegistrationId]);
    return (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={500}>
            <Box
                margin={"auto"}
                width={{
                    xs: "100%",
                    sm: "100%",
                    md: "70%",
                    lg: "50%",
                }}
                p={1}
            >
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                    {/* Listening */}
                    <Accordion
                        sx={{
                            borderRadius: "1rem !important",
                            width: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography
                                variant="h5"
                                fontWeight={"bold"}
                                textAlign={"center"}
                            >
                                Listening
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Images
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {sections.listening?.files?.map(
                                        (file, index) => (
                                            <img
                                                key={index}
                                                src={file.url}
                                                alt={file}
                                                width={"100%"}
                                            />
                                        )
                                    )}
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Part 1
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="h6">
                                            Score
                                        </Typography>
                                        <Typography variant="h6">
                                            {sections.listening?.sectionOne}/10
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Feedback
                                        </Typography>
                                        <p>
                                            {Feedbacks.listening.part1[
                                                sections.listening?.sectionOne
                                            ]?.feedback ||
                                                "Feedback not available"}
                                        </p>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Suggestion
                                        </Typography>
                                        <p>
                                            {Feedbacks.listening.part1[
                                                sections.listening?.sectionOne
                                            ]?.suggestions?.map(
                                                (suggestion, index) => (
                                                    <li key={index}>
                                                        {suggestion}
                                                    </li>
                                                )
                                            ) || "Suggestion not available"}
                                        </p>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Part 2
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="h6">
                                            Score
                                        </Typography>
                                        <Typography variant="h6">
                                            {sections.listening?.sectionTwo}/10
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Feedback
                                        </Typography>
                                        <p>
                                            {Feedbacks.listening.part2[
                                                sections.listening?.sectionTwo
                                            ]?.feedback ||
                                                "Feedback not available"}
                                        </p>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Suggestion
                                        </Typography>
                                        <p>
                                            {Feedbacks.listening.part2[
                                                sections.listening?.sectionOne
                                            ]?.suggestions?.map(
                                                (suggestion, index) => (
                                                    <li key={index}>
                                                        {suggestion}
                                                    </li>
                                                )
                                            ) || "Suggestion not available"}
                                        </p>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Part 3
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="h6">
                                            Score
                                        </Typography>
                                        <Typography variant="h6">
                                            {sections.listening?.sectionThree}
                                            /10
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Feedback
                                        </Typography>
                                        <p>
                                            {Feedbacks.listening.part3[
                                                sections.listening?.sectionThree
                                            ]?.feedback ||
                                                "Feedback not available"}
                                        </p>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Suggestion
                                        </Typography>
                                        <p>
                                            {Feedbacks.listening.part3[
                                                sections.listening?.sectionThree
                                            ]?.suggestions?.map(
                                                (suggestion, index) => (
                                                    <li key={index}>
                                                        {suggestion}
                                                    </li>
                                                )
                                            ) || "Suggestion not available"}
                                        </p>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Part 4
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="h6">
                                            Score
                                        </Typography>
                                        <Typography variant="h6">
                                            {sections.listening?.sectionFour}/10
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Feedback
                                        </Typography>
                                        <p>
                                            {Feedbacks.listening.part4[
                                                sections.listening?.sectionFour
                                            ]?.feedback ||
                                                "Feedback not available"}
                                        </p>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Suggestion
                                        </Typography>
                                        <p>
                                            {Feedbacks.listening.part4[
                                                sections.listening?.sectionFour
                                            ]?.suggestions?.map(
                                                (suggestion, index) => (
                                                    <li key={index}>
                                                        {suggestion}
                                                    </li>
                                                )
                                            ) || "Suggestion not available"}
                                        </p>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>

                    {/* Reading */}
                    <Accordion
                        sx={{
                            borderRadius: "1rem !important",
                            width: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography
                                variant="h5"
                                fontWeight={"bold"}
                                textAlign={"center"}
                            >
                                Reading
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Images
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {sections.reading?.files?.map(
                                        (file, index) => (
                                            <img
                                                key={index}
                                                src={file.url}
                                                alt={file}
                                                width={"100%"}
                                            />
                                        )
                                    )}
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Passage 1
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="h6">
                                            Score
                                        </Typography>
                                        <Typography variant="h6">
                                            {sections.reading?.sectionOne}/13
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Feedback
                                        </Typography>
                                        <p>
                                            {Feedbacks.reading.passage1[
                                                sections.reading?.sectionOne
                                            ]?.feedback ||
                                                "Feedback not available"}
                                        </p>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Suggestion
                                        </Typography>
                                        <p>
                                            {Feedbacks.reading.passage1[
                                                sections.reading?.sectionOne
                                            ]?.suggestions?.map(
                                                (suggestion, index) => (
                                                    <li key={index}>
                                                        {suggestion}
                                                    </li>
                                                )
                                            ) || "Suggestion not available"}
                                        </p>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Passage 2
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="h6">
                                            Score
                                        </Typography>
                                        <Typography variant="h6">
                                            {sections.reading?.sectionTwo}/13
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Feedback
                                        </Typography>
                                        <p>
                                            {Feedbacks.reading.passage2[
                                                sections.reading?.sectionTwo
                                            ]?.feedback ||
                                                "Feedback not available"}
                                        </p>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Suggestion
                                        </Typography>
                                        <p>
                                            {Feedbacks.reading.passage2[
                                                sections.reading?.sectionTwo
                                            ]?.suggestions?.map(
                                                (suggestion, index) => (
                                                    <li key={index}>
                                                        {suggestion}
                                                    </li>
                                                )
                                            ) || "Suggestion not available"}
                                        </p>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Passage 3
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="h6">
                                            Score
                                        </Typography>
                                        <Typography variant="h6">
                                            {sections.reading?.sectionThree}/14
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Feedback
                                        </Typography>
                                        <p>
                                            {Feedbacks.reading?.passage3[
                                                sections.reading?.sectionThree
                                            ]?.feedback ||
                                                "Feedback not available"}
                                        </p>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Suggestion
                                        </Typography>
                                        <p>
                                            {Feedbacks.reading?.passage3[
                                                sections.reading?.sectionThree
                                            ]?.suggestions?.map(
                                                (suggestion, index) => (
                                                    <li key={index}>
                                                        {suggestion}
                                                    </li>
                                                )
                                            ) || "Suggestion not available"}
                                        </p>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>

                    {/* Writing */}
                    <Accordion
                        sx={{
                            borderRadius: "1rem !important",
                            width: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography
                                variant="h5"
                                fontWeight={"bold"}
                                textAlign={"center"}
                            >
                                Writing
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Images
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {sections.writing?.files?.map(
                                        (file, index) => (
                                            <img
                                                key={index}
                                                src={file.url}
                                                alt={file}
                                                width={"100%"}
                                            />
                                        )
                                    )}
                                </AccordionDetails>
                            </Accordion>

                            {/* Task 1 */}
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Task 1
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Accordion sx={{ boxShadow: "none" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={"semiBold"}
                                            >
                                                Task Achievment
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                            >
                                                <Typography variant="h6">
                                                    Score
                                                </Typography>
                                                <Typography variant="h6">
                                                    {
                                                        sections.writing
                                                            ?.sectionOne
                                                    }
                                                    /9
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Feedback
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task1
                                                        .taskAchievement[
                                                        sections.writing
                                                            ?.sectionOne
                                                    ]?.feedback ||
                                                        "Feedback not available"}
                                                </p>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Suggestion
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task1
                                                        .taskAchievement[
                                                        sections.writing
                                                            ?.sectionOne
                                                    ]?.suggestion ||
                                                        "Suggestion not available"}
                                                </p>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{ boxShadow: "none" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={"semiBold"}
                                            >
                                                Coherence & Cohesion
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                            >
                                                <Typography variant="h6">
                                                    Score
                                                </Typography>
                                                <Typography variant="h6">
                                                    {
                                                        sections.writing
                                                            ?.sectionTwo
                                                    }
                                                    /9
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Feedback
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task1
                                                        .coherence[
                                                        sections.writing
                                                            ?.sectionTwo
                                                    ]?.feedback ||
                                                        "Feedback not available"}
                                                </p>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Suggestion
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task1
                                                        .coherence[
                                                        sections.writing
                                                            ?.sectionTwo
                                                    ]?.suggestion ||
                                                        "Suggestion not available"}
                                                </p>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{ boxShadow: "none" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={"semiBold"}
                                            >
                                                Lexical Resource
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                            >
                                                <Typography variant="h6">
                                                    Score
                                                </Typography>
                                                <Typography variant="h6">
                                                    {
                                                        sections.writing
                                                            ?.sectionThree
                                                    }
                                                    /9
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Feedback
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task1
                                                        .lexicalResource[
                                                        sections.writing
                                                            ?.sectionThree
                                                    ]?.feedback ||
                                                        "Feedback not available"}
                                                </p>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Suggestion
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task1
                                                        .lexicalResource[
                                                        sections.writing
                                                            ?.sectionThree
                                                    ]?.suggestion ||
                                                        "Suggestion not available"}
                                                </p>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{ boxShadow: "none" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={"semiBold"}
                                            >
                                                Grammatical Range & Accuracy
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                            >
                                                <Typography variant="h6">
                                                    Score
                                                </Typography>
                                                <Typography variant="h6">
                                                    {
                                                        sections.writing
                                                            ?.sectionFour
                                                    }
                                                    /9
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Feedback
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task1
                                                        .grammaticalRange[
                                                        sections.writing
                                                            ?.sectionFour
                                                    ]?.feedback ||
                                                        "Feedback not available"}
                                                </p>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Suggestion
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task1
                                                        .grammaticalRange[
                                                        sections.writing
                                                            ?.sectionFour
                                                    ]?.suggestion ||
                                                        "Suggestion not available"}
                                                </p>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </AccordionDetails>
                            </Accordion>

                            {/* Task 2 */}
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Task 2
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Accordion sx={{ boxShadow: "none" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={"semiBold"}
                                            >
                                                Task Response
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                            >
                                                <Typography variant="h6">
                                                    Score
                                                </Typography>
                                                <Typography variant="h6">
                                                    {
                                                        sections.writing
                                                            ?.sectionFive
                                                    }
                                                    /9
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Feedback
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task2
                                                        .taskResponse[
                                                        sections.writing
                                                            ?.sectionFive
                                                    ]?.feedback ||
                                                        "Feedback not available"}
                                                </p>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Suggestion
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task2
                                                        .taskResponse[
                                                        sections.writing
                                                            ?.sectionFive
                                                    ]?.suggestion ||
                                                        "Suggestion not available"}
                                                </p>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{ boxShadow: "none" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={"semiBold"}
                                            >
                                                Coherence & Cohesion
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                            >
                                                <Typography variant="h6">
                                                    Score
                                                </Typography>
                                                <Typography variant="h6">
                                                    {
                                                        sections.writing
                                                            ?.sectionSix
                                                    }
                                                    /9
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Feedback
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task2
                                                        .coherence[
                                                        sections.writing
                                                            ?.sectionSix
                                                    ]?.feedback ||
                                                        "Feedback not available"}
                                                </p>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Suggestion
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task2
                                                        .coherence[
                                                        sections.writing
                                                            ?.sectionSix
                                                    ]?.suggestion ||
                                                        "Suggestion not available"}
                                                </p>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{ boxShadow: "none" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={"semiBold"}
                                            >
                                                Lexical Resource
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                            >
                                                <Typography variant="h6">
                                                    Score
                                                </Typography>
                                                <Typography variant="h6">
                                                    {
                                                        sections.writing
                                                            ?.sectionSeven
                                                    }
                                                    /9
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Feedback
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task2
                                                        .lexicalResource[
                                                        sections.writing
                                                            ?.sectionSeven
                                                    ]?.feedback ||
                                                        "Feedback not available"}
                                                </p>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Suggestion
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task2
                                                        .lexicalResource[
                                                        sections.writing
                                                            ?.sectionSeven
                                                    ]?.suggestion ||
                                                        "Suggestion not available"}
                                                </p>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{ boxShadow: "none" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight={"semiBold"}
                                            >
                                                Grammatical Range & Accuracy
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                            >
                                                <Typography variant="h6">
                                                    Score
                                                </Typography>
                                                <Typography variant="h6">
                                                    {
                                                        sections.writing
                                                            ?.sectionEight
                                                    }
                                                    /9
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Feedback
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task2
                                                        .grammaticalRangeAccuracy[
                                                        sections.writing
                                                            ?.sectionEight
                                                    ]?.feedback ||
                                                        "Feedback not available"}
                                                </p>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"center"}
                                                >
                                                    Suggestion
                                                </Typography>
                                                <p>
                                                    {Feedbacks.writing.task2
                                                        .grammaticalRangeAccuracy[
                                                        sections.writing
                                                            ?.sectionEight
                                                    ]?.suggestion ||
                                                        "Suggestion not available"}
                                                </p>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>

                    {/* Speaking */}
                    <Accordion
                        sx={{
                            borderRadius: "1rem !important",
                            width: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography
                                variant="h5"
                                fontWeight={"bold"}
                                textAlign={"center"}
                            >
                                Speaking
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Audio
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {sections.speaking?.audio?.url && (
                                        <audio
                                            src={sections.speaking?.audio?.url}
                                            className="w-100"
                                            controls
                                        ></audio>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Fluency and coherence
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="h6">
                                            Score
                                        </Typography>
                                        <Typography variant="h6">
                                            {sections.speaking?.sectionOne}/9
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Feedback
                                        </Typography>
                                        <p>
                                            {Feedbacks.speaking
                                                .fluenceCoherence[
                                                sections.speaking?.sectionOne
                                            ]?.feedback ||
                                                "Feedback not available"}
                                        </p>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Suggestion
                                        </Typography>
                                        <p>
                                            {Feedbacks.speaking
                                                .fluenceCoherence[
                                                sections.speaking?.sectionOne
                                            ]?.suggestion ||
                                                "Suggestion not available"}
                                        </p>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Lexical Resource
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="h6">
                                            Score
                                        </Typography>
                                        <Typography variant="h6">
                                            {sections.speaking?.sectionTwo}/9
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Feedback
                                        </Typography>
                                        <p>
                                            {Feedbacks.speaking.lexicalResource[
                                                sections.speaking?.sectionTwo
                                            ]?.feedback ||
                                                "Feedback not available"}
                                        </p>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Suggestion
                                        </Typography>
                                        <p>
                                            {Feedbacks.speaking.lexicalResource[
                                                sections.speaking?.sectionTwo
                                            ]?.suggestion ||
                                                "Suggestion not available"}
                                        </p>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Grammatical range and accuracy
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="h6">
                                            Score
                                        </Typography>
                                        <Typography variant="h6">
                                            {sections.speaking?.sectionThree}/9
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Feedback
                                        </Typography>
                                        <p>
                                            {Feedbacks.speaking
                                                ?.grammaticalRange[
                                                sections.speaking?.sectionThree
                                            ]?.feedback ||
                                                "Feedback not available"}
                                        </p>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Suggestion
                                        </Typography>
                                        <p>
                                            {Feedbacks.speaking.lexicalResource[
                                                sections.speaking?.sectionThree
                                            ]?.suggestion ||
                                                "Suggestion not available"}
                                        </p>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ boxShadow: "none" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={"semiBold"}
                                    >
                                        Pronunciation
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="h6">
                                            Score
                                        </Typography>
                                        <Typography variant="h6">
                                            {sections.speaking?.sectionFour}/9
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Feedback
                                        </Typography>
                                        <p>
                                            {Feedbacks.speaking?.pronunciation[
                                                sections.speaking?.sectionFour
                                            ]?.feedback ||
                                                "Feedback not available"}
                                        </p>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            Suggestion
                                        </Typography>
                                        <p>
                                            {Feedbacks.speaking.pronunciation[
                                                sections.speaking?.sectionFour
                                            ]?.suggestion ||
                                                "Suggestion not available"}
                                        </p>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </Grow>
    );
};

export default FeedbackFolder;
