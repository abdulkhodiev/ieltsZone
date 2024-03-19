import React from "react";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const ExamApplied = () => {
    const navigate = useNavigate();
    const { examId, rowId } = useParams();
    const [rows, setRows] = useState([
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "1234567890",
            status: "Pending",
        },
        {
            id: 2,
            firstName: "Kate",
            lastName: "Paul",
            phoneNumber: "3456789012",
            status: "Pending",
        },
        {
            id: 3,
            firstName: "Henry",
            lastName: "Lennon",
            phoneNumber: "5678901234",
            status: "Pending",
        },
    ]);

    const handleRowClick = (rowId) => {
        navigate(`/admin/exams/${examId}/participants/applied/${rowId}`);
    };

    return (
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
                            hover
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                                },
                            }}
                            onClick={() => handleRowClick(row.id)}
                        >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.firstName}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell>{row.phoneNumber}</TableCell>
                            <TableCell
                                sx={{
                                    color:
                                        row.status === "Accepted"
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
    );
};

export default ExamApplied;
