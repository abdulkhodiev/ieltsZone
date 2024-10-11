import { useEffect, useState } from "react";
import { Box, Grow, Typography } from "@mui/material";
import { Feedbacks } from "../../../data/feedback";
import { getExamResults } from "../../utils/api/requests/exam-check-by-section";
import { useParams } from "react-router-dom";

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
                width={{
                    xs: "100%",
                    sm: "100%",
                    md: "70%",
                    lg: "50%",
                }}
                p={1}
                display={"flex"}
                flexDirection={"column"}
                gap={5}
            >
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={1}
                    p={1}
                    border={"2px solid grey"}
                    borderRadius={"1rem"}
                >
                    <Typography
                        variant="h5"
                        bgcolor={"lightblue"}
                        p={1}
                        borderRadius={"1rem"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                    >
                        Listening
                    </Typography>
                    {sections.listening?.files?.map((file, index) => (
                        <img key={index} src={file.url} alt={file} />
                    ))}
                    <Box
                        bgcolor={"yellow"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography variant="h6">Part 1</Typography>
                        <Typography variant="h6">
                            {sections.listening?.sectionOne}/10
                        </Typography>
                    </Box>
                    <Box
                        bgcolor={"purple"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Feedback
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.listening.part1[
                                sections.listening?.sectionOne
                            ]?.feedback || "Feedback not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"grey"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Suggestion
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.listening.part1[
                                sections.listening?.sectionOne
                            ]?.suggestions?.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            )) || "Suggestion not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"yellow"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography variant="h6">Part 2</Typography>
                        <Typography variant="h6">
                            {sections.listening?.sectionTwo}/10
                        </Typography>
                    </Box>
                    <Box
                        bgcolor={"purple"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Feedback
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.listening.part2[
                                sections.listening?.sectionTwo
                            ]?.feedback || "Feedback not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"grey"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Suggestion
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.listening.part2[
                                sections.listening?.sectionTwo
                            ]?.suggestions?.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            )) || "Suggestion not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"yellow"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography variant="h6">Part 3</Typography>
                        <Typography variant="h6">
                            {sections.listening?.sectionThree}/10
                        </Typography>
                    </Box>
                    <Box
                        bgcolor={"purple"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Feedback
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.listening.part3[
                                sections.listening?.sectionThree
                            ]?.feedback || "Feedback not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"grey"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Suggestion
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.listening.part3[
                                sections.listening?.sectionThree
                            ]?.suggestions?.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            )) || "Suggestion not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"yellow"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography variant="h6">Part 4</Typography>
                        <Typography variant="h6">
                            {sections.listening?.sectionThree}/10
                        </Typography>
                    </Box>
                    <Box
                        bgcolor={"purple"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Feedback
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.listening.part4[
                                sections.listening?.sectionFour
                            ]?.feedback || "Feedback not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"grey"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Suggestion
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.listening.part4[
                                sections.listening?.sectionFour
                            ]?.suggestions?.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            )) || "Suggestion not available"}
                        </p>
                    </Box>
                </Box>

                {/* Reading */}
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={1}
                    p={1}
                    border={"2px solid grey"}
                    borderRadius={"1rem"}
                >
                    <Typography
                        variant="h5"
                        bgcolor={"lightblue"}
                        p={1}
                        borderRadius={"1rem"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                    >
                        Reading
                    </Typography>
                    {sections.reading?.files?.map((file, index) => (
                        <img key={index} src={file.url} alt={file} />
                    ))}
                    <Box
                        bgcolor={"yellow"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography variant="h6">Passage 1</Typography>
                        <Typography variant="h6">
                            {sections.reading?.sectionOne}/13
                        </Typography>
                    </Box>
                    <Box
                        bgcolor={"purple"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Feedback
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.reading.passage1[
                                sections.reading?.sectionOne
                            ]?.feedback || "Feedback not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"grey"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Suggestion
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.reading.passage1[
                                sections.reading?.sectionOne
                            ]?.suggestions?.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            )) || "Suggestion not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"yellow"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography variant="h6">Passage 2</Typography>
                        <Typography variant="h6">
                            {sections.reading?.sectionTwo}/14
                        </Typography>
                    </Box>
                    <Box
                        bgcolor={"purple"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Feedback
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.reading.passage2[
                                sections.reading?.sectionTwo
                            ]?.feedback || "Feedback not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"grey"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Suggestion
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.reading.passage2[
                                sections.reading?.sectionTwo
                            ]?.suggestions?.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            )) || "Suggestion not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"yellow"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography variant="h6">Passage 3</Typography>
                        <Typography variant="h6">
                            {sections.reading?.sectionThree}/10
                        </Typography>
                    </Box>
                    <Box
                        bgcolor={"purple"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Feedback
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.reading?.passage3[
                                sections.reading?.sectionThree
                            ]?.feedback || "Feedback not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"grey"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Suggestion
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.reading?.passage3[
                                sections.reading?.sectionThree
                            ]?.suggestions?.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            )) || "Suggestion not available"}
                        </p>
                    </Box>
                </Box>

                {/* Writing */}
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={2}
                    p={1}
                    border={"2px solid grey"}
                    borderRadius={"1rem"}
                >
                    <Typography
                        variant="h5"
                        bgcolor={"lightblue"}
                        p={1}
                        borderRadius={"1rem"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                    >
                        Writing
                    </Typography>
                    {sections.writing?.files?.map((file, index) => (
                        <img key={index} src={file.url} alt={file} />
                    ))}
                    {/* Task 1 */}
                    <Box display={"flex"} flexDirection={"column"} gap={1}>
                        <Typography
                            variant="h6"
                            bgcolor={"lightgrey"}
                            p={1}
                            borderRadius={"1rem"}
                            fontWeight={"bold"}
                            textAlign={"center"}
                        >
                            Task 1
                        </Typography>
                        <Box
                            bgcolor={"yellow"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography variant="h6">
                                Task Achievment
                            </Typography>
                            <Typography variant="h6">
                                {sections.writing?.sectionOne}/9
                            </Typography>
                        </Box>
                        <Box
                            bgcolor={"purple"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Feedback
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task1.taskAchievement[
                                    sections.writing?.sectionOne
                                ]?.feedback || "Feedback not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"grey"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Suggestion
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task1.taskAchievement[
                                    sections.writing?.sectionOne
                                ]?.suggestion || "Suggestion not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"yellow"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography variant="h6">Coherence</Typography>
                            <Typography variant="h6">
                                {sections.writing?.sectionTwo}/9
                            </Typography>
                        </Box>
                        <Box
                            bgcolor={"purple"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Feedback
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task1.coherence[
                                    sections.writing?.sectionTwo
                                ]?.feedback || "Feedback not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"grey"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Suggestion
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task1.coherence[
                                    sections.writing?.sectionTwo
                                ]?.suggestion || "Suggestion not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"yellow"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography variant="h6">
                                Lexical Resource
                            </Typography>
                            <Typography variant="h6">
                                {sections.writing?.sectionThree}/9
                            </Typography>
                        </Box>
                        <Box
                            bgcolor={"purple"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Feedback
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task1.lexicalResource[
                                    sections.writing?.sectionThree
                                ]?.feedback || "Feedback not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"grey"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Suggestion
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task1.lexicalResource[
                                    sections.writing?.sectionThree
                                ]?.suggestion || "Suggestion not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"yellow"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography variant="h6">
                                Grammatical Range
                            </Typography>
                            <Typography variant="h6">
                                {sections.writing?.sectionFour}/9
                            </Typography>
                        </Box>
                        <Box
                            bgcolor={"purple"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                FeedBack
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task1.grammaticalRange[
                                    sections.writing?.sectionFour
                                ]?.feedback || "Feedback not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"grey"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Suggestion
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task1.grammaticalRange[
                                    sections.writing?.sectionFour
                                ]?.suggestion || "Suggestion not available"}
                            </p>
                        </Box>
                    </Box>

                    {/* Task 2 */}
                    <Box display={"flex"} flexDirection={"column"} gap={1}>
                        <Typography
                            variant="h6"
                            bgcolor={"lightgrey"}
                            p={1}
                            borderRadius={"1rem"}
                            fontWeight={"bold"}
                            textAlign={"center"}
                        >
                            Task 2
                        </Typography>
                        <Box
                            bgcolor={"yellow"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography variant="h6">Task Response</Typography>
                            <Typography variant="h6">
                                {sections.writing?.sectionFive}/9
                            </Typography>
                        </Box>
                        <Box
                            bgcolor={"purple"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Feedback
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task2.taskResponse[
                                    sections.writing?.sectionFive
                                ]?.feedback || "Feedback not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"grey"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Suggestion
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task2.taskResponse[
                                    sections.writing?.sectionFive
                                ]?.suggestion || "Suggestion not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"yellow"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography variant="h6">Coherence</Typography>
                            <Typography variant="h6">
                                {sections.writing?.sectionSix}/9
                            </Typography>
                        </Box>
                        <Box
                            bgcolor={"purple"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Feedback
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task2.coherence[
                                    sections.writing?.sectionSix
                                ]?.feedback || "Feedback not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"grey"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Suggestion
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task2.coherence[
                                    sections.writing?.sectionSix
                                ]?.suggestion || "Suggestion not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"yellow"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography variant="h6">
                                Lexical Resource
                            </Typography>
                            <Typography variant="h6">
                                {sections.writing?.sectionSeven}/9
                            </Typography>
                        </Box>
                        <Box
                            bgcolor={"purple"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Feedback
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task2.lexicalResource[
                                    sections.writing?.sectionSeven
                                ]?.feedback || "Feedback not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"grey"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Suggestion
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task2.lexicalResource[
                                    sections.writing?.sectionSeven
                                ]?.suggestion || "Suggestion not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"yellow"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography variant="h6">
                                Grammatical Range Accuracy
                            </Typography>
                            <Typography variant="h6">
                                {sections.writing?.sectionEight}/9
                            </Typography>
                        </Box>
                        <Box
                            bgcolor={"purple"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Feedback
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task2
                                    .grammaticalRangeAccuracy[
                                    sections.writing?.sectionEight
                                ]?.feedback || "Feedback not available"}
                            </p>
                        </Box>
                        <Box
                            bgcolor={"grey"}
                            borderRadius={"1rem"}
                            display={"flex"}
                            p={1}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Typography
                                variant="h6"
                                textAlign={"center"}
                                color={"white"}
                            >
                                Suggestion
                            </Typography>
                            <p className="text-white">
                                {Feedbacks.writing.task2
                                    .grammaticalRangeAccuracy[
                                    sections.writing?.sectionEight
                                ]?.suggestion || "Suggestion not available"}
                            </p>
                        </Box>
                    </Box>
                </Box>

                {/* Speaking */}
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={1}
                    p={1}
                    border={"2px solid grey"}
                    borderRadius={"1rem"}
                >
                    <Typography
                        variant="h5"
                        bgcolor={"lightblue"}
                        p={1}
                        borderRadius={"1rem"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                    >
                        Speaking
                    </Typography>
                    {sections.speaking?.audio?.url && (
                        <audio
                            src={sections.speaking?.audio?.url}
                            className="w-100"
                            controls
                        ></audio>
                    )}
                    <Box
                        bgcolor={"yellow"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography variant="h6">
                            Fluency and coherence
                        </Typography>
                        <Typography variant="h6">
                            {sections.speaking?.sectionOne}/9
                        </Typography>
                    </Box>
                    <Box
                        bgcolor={"purple"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Feedback
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.speaking.fluenceCoherence[
                                sections.speaking?.sectionOne
                            ]?.feedback || "Feedback not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"grey"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Suggestion
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.speaking.fluenceCoherence[
                                sections.speaking?.sectionOne
                            ]?.suggestion || "Suggestion not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"yellow"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography variant="h6">Lexical Resource</Typography>
                        <Typography variant="h6">
                            {sections.speaking?.sectionTwo}/9
                        </Typography>
                    </Box>
                    <Box
                        bgcolor={"purple"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Feedback
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.speaking.lexicalResource[
                                sections.speaking?.sectionTwo
                            ]?.feedback || "Feedback not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"grey"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Suggestion
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.speaking.lexicalResource[
                                sections.speaking?.sectionTwo
                            ]?.suggestion || "Suggestion not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"yellow"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        px={2}
                        justifyContent={"space-evenly"}
                    >
                        <Typography variant="h6">
                            Grammatical range and accuracy
                        </Typography>
                        <Typography variant="h6">
                            {sections.speaking?.sectionThree}/9
                        </Typography>
                    </Box>
                    <Box
                        bgcolor={"purple"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Feedback
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.speaking?.grammaticalRange[
                                sections.speaking?.sectionThree
                            ]?.feedback || "Feedback not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"grey"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Suggestion
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.speaking.lexicalResource[
                                sections.speaking?.sectionThree
                            ]?.suggestion || "Suggestion not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"yellow"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography variant="h6">Pronunciation</Typography>
                        <Typography variant="h6">
                            {sections.speaking?.sectionFour}/9
                        </Typography>
                    </Box>
                    <Box
                        bgcolor={"purple"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Feedback
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.speaking?.pronunciation[
                                sections.speaking?.sectionFour
                            ]?.feedback || "Feedback not available"}
                        </p>
                    </Box>
                    <Box
                        bgcolor={"grey"}
                        borderRadius={"1rem"}
                        display={"flex"}
                        p={1}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                    >
                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"white"}
                        >
                            Suggestion
                        </Typography>
                        <p className="text-white">
                            {Feedbacks.speaking.pronunciation[
                                sections.speaking?.sectionFour
                            ]?.suggestion || "Suggestion not available"}
                        </p>
                    </Box>
                </Box>
            </Box>
        </Grow>
    );
};

export default FeedbackFolder;
