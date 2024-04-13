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
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getAppliedUsers } from "../../../../utils/api/requests/applied-users";

const ExamApplied = () => {
    const navigate = useNavigate();
    const { examId } = useParams();
    const [rows, setRows] = useState([]);

    const fetchData = async () => {
        const data = await getAppliedUsers(examId);
        setRows(data);
    };

    useEffect(() => {
        fetchData();
    }, [examId]);

    const handleRowClick = (row) => {
        navigate(`/admin/exams/${examId}/participants/applied/${row.id}`, {
            state: {
                firstName: row.user.firstName,
                lastName: row.user.lastName,
            },
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
                            hover
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                                },
                            }}
                            onClick={() => handleRowClick(row)}
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
                                            : "red",
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
