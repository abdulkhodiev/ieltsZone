import React, { useEffect } from "react";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Paper,
    Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../../../constants/colors";
import {
    getAcceptedUsers,
    excelDownload,
} from "../../../../utils/api/requests/accepted-user";

const ExamAccepted = () => {
    const { examId, rowId } = useParams();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const fetchAcceptedUsers = async () => {
        const res = await getAcceptedUsers(examId);
        setRows(res);
    };

    const excelExport = async () => {
        const res = await excelDownload(examId);
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "accepted-users.xlsx");
        document.body.appendChild(link);
        link.click();
    };

    useEffect(() => {
        fetchAcceptedUsers();
    }, [examId]);

    const handleRowClick = (rowId, participant) => {
        navigate(`/admin/exams/${examId}/participants/accepted/${rowId}`, {
            state: { participant },
        });
    };
    return (
        <>
            <Button
                onClick={excelExport}
                sx={{
                    my: "1rem",
                    ml: "auto",
                    bgcolor: colors.primary,
                    color: "white",
                    borderRadius: "0.7rem",
                    ":hover": { bgcolor: colors.primary },
                }}
                variant="contained"
            >
                Excel Export
            </Button>
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
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    cursor: "pointer", // Change cursor on hover
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.04)", // Optional: hover background color
                                    },
                                }}
                                onClick={() =>
                                    handleRowClick(row.id, {
                                        firstName: row.firstName,
                                        lastName: row.lastName,
                                    })
                                }
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.user.firstName}</TableCell>
                                <TableCell>{row.user.lastName}</TableCell>
                                <TableCell>{row.user.phoneNumber}</TableCell>
                                <TableCell
                                    sx={{
                                        color:
                                            row.status === "ACCEPTED"
                                                ? "green"
                                                : "inherit",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {row.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ExamAccepted;
