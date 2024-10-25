import * as React from "react";
import { useState, useEffect } from "react";
import Snackbar from "@mui/joy/Snackbar";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function SuggestionModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => setOpen(true), 3000);
    }, []);

    return (
        <React.Fragment>
            <Snackbar
                autoHideDuration={10000}
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
                    width: {
                        xs: "90%",
                        sm: "90%",
                        md: "max-content",
                        lg: "max-content",
                    },
                    background: "rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "1rem",
                }}
            >
                <div>
                    <Typography level="h3" fontWeight="lg">
                        Hey, Congratulations 🎉
                    </Typography>
                    <Typography sx={{ mt: 1, mb: 2 }}>
                        Are you sure, you want to leave this page without
                        confirming your order?
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="solid"
                            color="primary"
                            onClick={() => setOpen(false)}
                        >
                            Yes, Maybe later
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setOpen(false)}
                        >
                            No, I want to stay
                        </Button>
                    </Stack>
                </div>
            </Snackbar>
        </React.Fragment>
    );
}
