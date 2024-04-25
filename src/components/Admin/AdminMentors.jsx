import React, { useState, useEffect } from "react";
import {
    Stack,
    Box,
    TextField,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Paper,
} from "@mui/material";

import { getAdmins } from "../../utils/api/requests/get-admins";
import MyModal from "../UI/MyModal";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const AdminMentors = () => {
    const [rows, setRows] = useState([]);

    const refreshAdmins = async () => {
        try {
            const admins = await getAdmins();
            setRows(admins);
        } catch (error) {
            setError("Failed to fetch admins");
        }
    };

    useEffect(() => {
        refreshAdmins();
    }, []);

    return (
        <Stack
            direction="column"
            sx={{
                width: { xs: "100%", lg: "75%" },
                justifyContent: "center",
                alignItems: "center",
                padding: "0.5rem",
            }}
        >
            <Box sx={{ width: "100%" }}>
                <MyModal refreshAdmins={refreshAdmins} />
                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: "none",
                        margin: 0,
                        padding: 0,
                        border: "1px solid #EEEEEE",
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

export default AdminMentors;
