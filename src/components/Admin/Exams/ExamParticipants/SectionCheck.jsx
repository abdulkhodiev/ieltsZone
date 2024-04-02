import React, { useState, useRef, useContext } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Box, Typography, Button, TextField } from "@mui/material";
import { colors } from "../../../../constants/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Context from "../../../../context/Context";

const SectionCheck = () => {
    const location = useLocation();
    const { examId, rowId, section } = useParams();
    const navigate = useNavigate();
    const participant = location.state?.participant;
    const { scores, setScores } = useContext(Context);
    const [formData, setFormData] = useState({
        score: scores[section] || "",
        details: "",
    });
    const fileInputRef = useRef(null);

    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        whiteSpace: "nowrap",
        width: 1,
    });

    // Capitalize the first letter of the section name for display
    const displaySectionName =
        section.charAt(0).toUpperCase() + section.slice(1);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const file = fileInputRef.current.files[0];
        // Assuming file handling logic here
        const dataToSend = {
            ...formData,
            file,
        };
        // Here you would handle the file upload and form data submission logic
        console.log("Data to send:", dataToSend);
        // Update the scores context after handling the data
        setScores((prevScores) => ({
            ...prevScores,
            [section]: formData.score,
        }));
        // Navigate to the desired path after submission
        navigate("/path-to-redirect-after-saving");
    };

    return (
        <Box
            width={"65%"}
            height={"100vh"}
            m={"auto"}
            p={"2rem"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Stack spacing={4} width="100%">
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems="center"
                >
                    <Typography variant="h4" fontWeight={"bold"}>
                        {participant
                            ? `${participant.firstName} ${participant.lastName}`
                            : "Participant"}
                    </Typography>
                    <Typography
                        color={colors.primary}
                        variant="h4"
                        fontWeight={"bold"}
                    >
                        {displaySectionName} {/* Dynamic section name */}
                    </Typography>{" "}
                </Stack>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            required
                            label="Score"
                            type="number"
                            inputProps={{
                                step: 0.5,
                                min: 0,
                                max: 9,
                                type: "number",
                            }}
                            name="score"
                            value={formData.score}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            label="Details and Comments"
                            multiline
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                        />
                        <Stack direction="row" justifyContent="space-between">
                            <Button
                                component="label"
                                variant="contained"
                                sx={{
                                    bgcolor: colors.primary,
                                    ":hover": { bgcolor: colors.primary },
                                    borderRadius: "0.6rem",
                                    textTransform: "none",
                                    fontSize: "1.1rem",
                                }}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload file
                                <VisuallyHiddenInput
                                    ref={fileInputRef}
                                    type="file"
                                />
                            </Button>
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                                <Button
                                    component={Link}
                                    to={`/admin/exams/${examId}/participants/accepted/${rowId}`}
                                    sx={{
                                        bgcolor: "red",
                                        ":hover": { bgcolor: "red" },
                                        borderRadius: "0.6rem",
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                        color: "white",
                                    }}
                                >
                                    Chancel
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        bgcolor: colors.primary,
                                        ":hover": { bgcolor: colors.primary },
                                        borderRadius: "0.6rem",
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                    }}
                                >
                                    Save
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </Box>
    );
};

export default SectionCheck;
