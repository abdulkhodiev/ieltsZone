import * as React from "react";
import { useState, useEffect } from "react";
import Snackbar from "@mui/joy/Snackbar";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Close } from "@mui/icons-material";
import { registerForLesson } from "../../../utils/api/requests/exam-check-by-section";

export default function SuggestionModal({ message, examRegistrationId }) {
    const [open, setOpen] = useState(false);

    const handleRegistration = async () => {
        await registerForLesson(examRegistrationId);
        setOpen(false);
    };

    useEffect(() => {
        setTimeout(() => setOpen(true), 3000);
    }, []);

    console.log(message);

    return (
        <React.Fragment>
            <Snackbar
                variant="solid"
                color="primary"
                size="xl"
                invertedColors
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
                sx={{
                    bgcolor: "#FBFCFE",
                    p: 5,
                    width: "90%",
                    maxWidth: "500px",
                    background: "rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "1rem",
                }}
            >
                <div>
                    <div>
                        <Typography level="h3" fontWeight="lg">
                            Hey, Congratulations 🎉
                        </Typography>
                        <button
                            onClick={() => setOpen(false)}
                            style={{
                                position: "absolute",
                                right: "1rem",
                                top: "1rem",
                                border: "none",
                                background: "none",
                                pointerEvents: "auto",
                            }}
                        >
                            <Close />
                        </button>
                    </div>

                    <Typography sx={{ mt: 1, mb: 2 }}>{message}</Typography>
                    <Stack direction="row" spacing={1}>
                        <Button
                            onClick={handleRegistration}
                            className="w-100"
                            variant="solid"
                            color="primary"
                        >
                            Yes
                        </Button>
                    </Stack>
                </div>
            </Snackbar>
        </React.Fragment>
    );
}
