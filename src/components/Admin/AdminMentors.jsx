import { useState, useEffect } from "react";
import {
    Stack,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Paper,
    Grow,
} from "@mui/material";

import { getAdmins } from "../../utils/api/requests/get-admins";
import MyModal from "../UI/MyModal";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const AdminMentors = () => {
    const [rows, setRows] = useState([]);

    const refreshAdmins = async () => {
        const admins = await getAdmins();
        setRows(admins);
    };

    useEffect(() => {
        refreshAdmins();
    }, []);

    return (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={500}>
            <Stack
                direction="column"
                sx={{
                    width: { xs: "100%", lg: "90%" },
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.5rem",
                }}
            >
                <Box
                    sx={{ width: "100%" }}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                >
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
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        Role{" "}
                                        <VerifiedUserIcon
                                            sx={{ fontSize: "1rem !important" }}
                                        />
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
        </Grow>
    );
};

export default AdminMentors;
