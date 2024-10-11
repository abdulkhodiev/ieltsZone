import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import promoVideo from "../../assets/promo2.mp4";
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    borderRadius: "1rem",
    border: "0px solid #000",
    boxShadow: 24,
    p: 2,
};

export default function PromoModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                onClick={handleOpen}
                variant="contained"
                sx={{
                    bgcolor: "#DF6951",
                    ":hover": { bgcolor: "#DF6951" },
                    borderRadius: "1rem",
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "none",
                    fontSize: {
                        xs: "0.8rem",
                        sm: "1rem",
                        md: "1.2rem",
                        lg: "1.2rem",
                    },
                    padding: "0.8rem 1.5rem",
                }}
            >
                <PlayCircleIcon sx={{ marginRight: "0.5rem" }} /> Promo Video
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
                        <button
                            onClick={handleClose}
                            style={{
                                position: "absolute",
                                right: 10,
                                top: 10,
                                backgroundColor: "purple",
                                padding: "0.4rem",
                                border: "none",
                                borderRadius: "50%",
                                zIndex: 10,
                            }}
                        >
                            <CloseIcon sx={{ color: "white", padding: "0" }} />
                        </button>
                        <video
                            width="100%"
                            style={{ borderRadius: "1rem" }}
                            controls
                        >
                            <source src={promoVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
