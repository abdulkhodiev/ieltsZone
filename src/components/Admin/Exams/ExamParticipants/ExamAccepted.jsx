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
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate

const ExamAccepted = () => {
    const { examId, rowId } = useParams();

    const navigate = useNavigate();

    const handleRowClick = (rowId, participant) => {
        navigate(`/admin/exams/${examId}/participants/accepted/${rowId}`, {
            state: { participant },
        });
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
                            hover // Optional: adds hover effect
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

export default ExamAccepted;
