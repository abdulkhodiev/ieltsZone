import React, { useState } from "react";
import {
    Box,
    TextField,
    Stack,
    Alert,
    InputAdornment,
    Button,
} from "@mui/material";

import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import KeyIcon from "@mui/icons-material/Key";
import { colors } from "../../constants/colors";
import { AddAdminJs } from "../../utils/api/requests/add-admins";
import MyTelInput from "./MyTelInput";

const MyModal = ({ refreshAdmins }) => {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalStyle = {
        transition: "all 0.5s ease-out",
        opacity: open ? 1 : 0,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const cleanedPhoneNumber = phoneNumber.replace(/\s+/g, "");
            const trimmedPassword = password.trim();

            await AddAdminJs(
                firstName,
                lastName,
                cleanedPhoneNumber,
                trimmedPassword,
                "ADMIN"
            );
            refreshAdmins();
            handleClose();
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            setPassword("");
        } catch (error) {
            setError(
                error.response?.data.message ||
                    error.response?.data.password ||
                    error.response?.data.phoneNumber ||
                    "Failed to add admin"
            );
        }
    };

    return (
        <React.Fragment>
            <Button
                sx={{
                    ml: "auto",
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
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={modalStyle}
            >
                <ModalDialog
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: "60%",
                            lg: "40%",
                            xl: "40%",
                        },
                    }}
                >
                    <DialogTitle
                        sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    >
                        Add Admin Information
                    </DialogTitle>
                    <ModalClose onClick={handleClose} />
                    <DialogContent sx={({ gap: 2 }, { paddingTop: "1rem" })}>
                        <form onSubmit={handleSubmit}>
                            <Box
                                noValidate
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                {error && (
                                    <Alert
                                        severity="error"
                                        sx={{ width: "100%" }}
                                    >
                                        {error}
                                    </Alert>
                                )}
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    required
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    required
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                                <MyTelInput
                                    value={phoneNumber}
                                    onChange={setPhoneNumber}
                                    required
                                />
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    helperText="Password must be at least 8 characters long"
                                    inputProps={{ minLength: 8 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <KeyIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="space-between"
                                >
                                    <Button
                                        sx={{
                                            bgcolor: "red",
                                            color: "white",
                                            borderRadius: "0.7rem",
                                        }}
                                        fullWidth
                                        onClick={handleClose}
                                        variant="contained"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        sx={{
                                            bgcolor: colors.primary,
                                            color: "white",
                                            borderRadius: "0.7rem",
                                            ":hover": {
                                                bgcolor: colors.primary,
                                            },
                                        }}
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                    >
                                        Add Admin
                                    </Button>
                                </Stack>
                            </Box>
                        </form>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
};

export default MyModal;
