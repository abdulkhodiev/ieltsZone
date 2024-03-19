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

    const navigate = useNavigate(); // Initialize useNavigate

    const [rows, setRows] = useState([
        {
            id: 1, // Assuming each row has a unique 'id' (add it if not present)
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "1234567890",
            status: "Accepted",
        },
        {
            id: 2, // Assuming each row has a unique 'id' (add it if not present)
            firstName: "Kate",
            lastName: "Paul",
            phoneNumber: "3456789012",
            status: "Accepted",
        },
        {
            id: 3, // Assuming each row has a unique 'id' (add it if not present)
            firstName: "Henry",
            lastName: "Lennon",
            phoneNumber: "5678901234",
            status: "Accepted",
        },
        // Add more rows as needed
    ]);

    // Function to handle row click, navigating to a dynamic route
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
