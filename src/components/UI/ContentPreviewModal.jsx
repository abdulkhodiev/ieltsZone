import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    maxHeight: "90vh",
    maxWidth: "90vw",
    p: 2,
    border: "none !important",
    borderRadius: "1rem !important",
    overflow: "hidden",
};

export default function TransitionsModal({ img, isMobile }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <img
                src={img}
                onClick={handleOpen}
                style={{
                    width: isMobile ? "100%" : "350px",
                    borderRadius: "1rem",
                    maxHeight: "350px",
                    cursor: "pointer",
                    objectFit: "cover",
                }}
                alt="Couldn't load image"
            />
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
                        <Stack
                            sx={{ pb: "1rem" }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems={"center"}
                        >
                            <Typography variant="h6">Preview</Typography>
                            <Button
                                onClick={handleClose}
                                sx={{
                                    color: "black",
                                }}
                            >
                                <CloseIcon />
                            </Button>
                        </Stack>
                        <img
                            src={img}
                            style={{
                                width: "100%",
                                height: "auto", // Maintain aspect ratio
                                maxWidth: "100%",
                                maxHeight: "80vh", // Ensure it doesn't exceed the viewport height
                                objectFit: "contain",
                                objectPosition: "center",
                            }}
                            alt="Couldn't load image"
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
