import React, { useState, useEffect } from "react";
import {
    Table,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Paper,
    Box,
    TextField,
} from "@mui/material";

import axios from "axios";
import MyModal from "../UI/MyModal";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PersonIcon from "@mui/icons-material/Person";

const AdmainMentors = () => {
    const zoneAPI = axios.create({
        baseURL: "http://localhost:8070/api/v1",
    });

    const [rows, setRows] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const fetchExamData = async () => {
        try {
            const response = await zoneAPI.get("/users/admins");
            setRows(response.data);
        } catch (error) {
            console.error("Failed to fetch exam data:", error);
        }
    };

    const addAdmin = async () => {
        try {
            await zoneAPI.post("/users", {
                firstName,
                lastName,
                phoneNumber,
                password,
                role: "ADMIN",
            });

            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            setPassword("");

            fetchExamData();

            alert("Admin added successfully.");
        } catch (error) {
            console.error("Failed to add admin:", error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.phoneNumber
            ) {
                alert(`Error: ${error.response.data.phoneNumber}`);
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    useEffect(() => {
        fetchExamData();
    }, []);

    return (
        <Stack
            direction={"column"}
            width={"75%"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"0.5rem"}
        >
            <Box sx={{ width: "100%" }}>
                <MyModal onSubmit={addAdmin}>
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
                </MyModal>
                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: "none",
                        margin: 0,
                        padding: 0,
                        border: `1px solid #EEEEEE`,
                        borderRadius: "1rem",
                    }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>
                                    Role <VerifiedUserIcon />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.firstName}</TableCell>
                                    <TableCell>{row.lastName}</TableCell>
                                    <TableCell>{row.phoneNumber}</TableCell>
                                    <TableCell>{row.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Stack>
    );
};

export default AdmainMentors;
