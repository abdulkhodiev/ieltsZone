import React, { useState, useRef, useContext } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Box, Typography, Button, TextField } from "@mui/material";
import { colors } from "../../../constants/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link, useParams, useNavigate } from "react-router-dom";
import Context from "../../../context/Context";

const SectionCheck = () => {
    const { section } = useParams();
    const navigate = useNavigate();
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const saveData = (data) => {
        console.log("Sending data to the backend...", data);
        // Update scores in context
        setScores((prevScores) => ({
            ...prevScores,
            [section]: formData.score,
        }));
        navigate("/path-to-redirect-after-saving"); // Adjust this path as necessary
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const file = fileInputRef.current.files[0];
        const dataToSend = {
            ...formData,
            file,
        };
        saveData(dataToSend);
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
                        Abdulkhodiev Jobirkhon
                    </Typography>
                    <Typography
                        color={colors.primary}
                        variant="h4"
                        fontWeight={"bold"}
                    >
                        Listening
                    </Typography>
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
                                    to="/admin/exams/:examId"
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

// import React, { useState, useContext } from "react";
// import { Box, Stack, Typography, Button, TextField } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { useNavigate, useParams } from "react-router-dom";
// import Context from "../../../context/Context"; // Correct the path as necessary
// import { styled } from "@mui/material/styles";

// // Move styled component outside of the main component to avoid re-creation on each render
// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   whiteSpace: "nowrap",
//   width: 1,
// });

// const SectionCheck = () => {
//   const { section } = useParams();
//   const navigate = useNavigate();
//   const { scores, setScores } = useContext(Context);

//   const [formData, setFormData] = useState({
//     score: scores[section] || "",
//     details: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const dataToSend = {
//       ...formData,
//       // Assuming file upload is optional
//       file: event.target.file?.files[0],
//     };
//     console.log("Sending data to the backend...", dataToSend);
//     setScores((prevScores) => ({
//       ...prevScores,
//       [section]: formData.score,
//     }));
//     navigate("/admin/exams/:examId"); // Adjust this path as necessary
//   };

//   return (
//     <Box
//       width="65%"
//       height="100vh"
//       m="auto"
//       p={2}
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//     >
//       <Typography variant="h4" fontWeight="bold" mb={4}>
//         Section Check - {section.charAt(0).toUpperCase() + section.slice(1)}
//       </Typography>
//       <form onSubmit={handleSubmit} style={{ width: "100%" }}>
//         <Stack spacing={2}>
//           <TextField
//             fullWidth
//             required
//             label="Score"
//             type="number"
//             inputProps={{ step: 0.5, min: 0, max: 9 }}
//             name="score"
//             value={formData.score}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             label="Details and Comments"
//             multiline
//             name="details"
//             value={formData.details}
//             onChange={handleChange}
//           />
//           <Button
//             component="label"
//             variant="contained"
//             color="primary"
//             startIcon={<CloudUploadIcon />}
//           >
//             Upload file
//             <VisuallyHiddenInput name="file" type="file" />
//           </Button>
//           <Stack direction="row" spacing={2} justifyContent="flex-end">
//             <Button
//               variant="outlined"
//               color="error"
//               onClick={() => navigate("/admin/exams/:examId")} // Use onClick for better control
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" color="primary">
//               Save
//             </Button>
//           </Stack>
//         </Stack>
//       </form>
//     </Box>
//   );
// };

// export default SectionCheck;
