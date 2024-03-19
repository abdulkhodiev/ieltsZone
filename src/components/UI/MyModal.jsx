import React from "react";
import { Button, Modal, Box } from "@mui/material";
import { colors } from "../../constants/colors";
import { MyButton } from "../index";

const MyModal = ({ children, onSubmit }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (onSubmit) {
            onSubmit();
            handleClose(); // Optionally close the modal after submit
        }
    };

    return (
        <Box>
            <Button
                sx={{
                    my: "1rem",
                    bgcolor: colors.primary,
                    color: "white",
                    borderRadius: "0.7rem",
                    ":hover": { bgcolor: colors.primary },
                }}
                variant="contained"
                onClick={handleOpen}
                alignSelf={"flex-start"}
            >
                + Add User
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    className="addAdminModal"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        padding: "2rem",
                        width: "45%",

                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <form className="addAdminForm" onSubmit={handleSubmit}>
                        {children}
                        <Button
                            sx={{
                                my: "1rem",
                                bgcolor: colors.primary,
                                color: "white",
                                borderRadius: "0.7rem",
                                ":hover": { bgcolor: colors.primary },
                            }}
                            variant="contained"
                            onClick={handleOpen}
                            alignSelf={"flex-start"}
                            type="submit"
                        >
                            Add Admin
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default MyModal;
