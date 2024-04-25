import React, { useState } from "react";
import { Button, Modal, Box, Alert, TextField } from "@mui/material";
import { colors } from "../../constants/colors";
import { AddAdminJs } from "../../utils/api/requests/add-admins";

const MyModal = ({ refreshAdmins }) => {
    const [open, setOpen] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AddAdminJs(
                firstName,
                lastName,
                phoneNumber,
                password,
                "ADMIN"
            );
            refreshAdmins();
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            setPassword("");
            setError("");
            handleClose();
        } catch (error) {
            setError(
                error.response?.data.message ||
                    error.response?.data.password ||
                    error.response?.data.phoneNumber ||
                    "Failed to add admin"
            );
            console.log(error);
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
            >
                + Add User
            </Button>
            <Modal
                error={error}
                open={open}
                onClose={() => {
                    setError("");
                    handleClose();
                }}
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
                        width: { xs: "90%", sm: "70%", md: "50%", lg: "45%" },
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <form className="addAdminForm" onSubmit={handleSubmit}>
                        {error && (
                            <Alert
                                severity="error"
                                style={{ width: "100%", marginBottom: "1rem" }}
                            >
                                {error}
                            </Alert>
                        )}
                        <TextField
                            label="Name"
                            variant="outlined"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                        <Button
                            sx={{
                                my: "1rem",
                                bgcolor: colors.primary,
                                color: "white",
                                borderRadius: "0.7rem",
                                ":hover": { bgcolor: colors.primary },
                            }}
                            variant="contained"
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
