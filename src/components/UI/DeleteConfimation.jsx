import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Delete } from "@mui/icons-material";
import { colors } from "../../constants/colors";
import { deleteExams } from "../../utils/api/requests/add-exams";
import { useState } from "react";
import Alert from "@mui/material/Alert";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: "90%",
        sm: "50%",
        md: "30%",
    },

    bgcolor: "background.paper",
    border: "0px solid #000",
    borderRadius: "0.6rem",
    boxShadow: 24,
    p: 4,
};

export default function DeleteConfirmation({ id, fetchExams }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [message, setMessage] = useState("");

    const handleDelete = async (examId) => {
        try {
            const res = await deleteExams(examId);
            console.log(res);
            if (res.success) {
                fetchExams();
            } else {
                setMessage(res.message);
            }
        } catch (error) {
            console.error("Failed to delete exam:", error);
        }
    };

    return (
        <div>
            <Button
                sx={{
                    display: "flex",
                    gap: "0.5rem",
                    padding: "0.5rem 3.5rem 0.5rem 1rem",
                    alignItems: "center",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "400",
                    color: "black",
                }}
                onClick={handleOpen}
            >
                <Delete /> Delete
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {message && (
                            <Alert sx={{ mb: "1rem" }} severity="error">
                                {message}
                            </Alert>
                        )}
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{
                                mb: "1.5rem",
                                fontWeight: "600",
                                fontSize: "1.2rem",
                                color: colors.primary,
                            }}
                        >
                            Do you want to delete this exam?
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleClose}
                                sx={{
                                    bgcolor: colors.primary,
                                    color: "white",
                                    ":hover": {
                                        bgcolor: colors.primary,
                                    },
                                    fontWeight: "600",
                                    borderRadius: "0.6rem",
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    borderRadius: "0.6rem",
                                    fontWeight: "600",
                                }}
                                color="error"
                                onClick={() => handleDelete(id)}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
