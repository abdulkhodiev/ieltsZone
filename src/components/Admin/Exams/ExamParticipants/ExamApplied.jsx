import { useEffect } from "react";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Paper,
    Grow,
    Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getAppliedUsers } from "../../../../utils/api/requests/applied-users";
import Input from "@mui/joy/Input";
import dayjs from "dayjs";

const ExamApplied = () => {
    const navigate = useNavigate();
    const { examId } = useParams();
    const [rows, setRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async () => {
        const data = await getAppliedUsers(examId);
        setRows(data);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [examId]);

    function statusColor(status) {
        switch (status) {
            case "ACCEPTED":
                return "green";
            case "REJECTED":
                return "red";
            case "MARKED":
                return "blue";
            case "P_MARKED":
                return "yellow";
            case "NEW":
                return "orange";
            default:
                return "black";
        }
    }

    const handleRowClick = (row) => {
        navigate(`/admin/exams/${examId}/participants/applied/${row.id}`, {
            state: {
                firstName: row.user.firstName,
                lastName: row.user.lastName,
            },
        });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRows = rows.filter((row) =>
        `${row.user.firstName} ${row.user.lastName} ${row.user.phoneNumber}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={500}>
            <Stack
                width={"100%"}
                alignItems={{
                    xs: "none",
                    sm: "baseline",
                }}
            >
                <Input
                    placeholder="Search..."
                    variant="outlined"
                    width={{
                        xs: "100%",
                        md: "50%",
                        lg: "50%",
                    }}
                    sx={{
                        borderRadius: "5rem",
                    }}
                    value={searchQuery}
                    onChange={handleSearch}
                />

                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: "none",
                        marginTop: "1.2rem",
                        padding: 0,
                        border: `1px solid #EEEEEE`,
                        borderRadius: "1rem",
                    }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Full Name</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Telegram</TableCell>
                                <TableCell>Speaking Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.04)",
                                        },
                                    }}
                                    onClick={() => handleRowClick(row)}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {row.user.firstName} {row.user.lastName}
                                    </TableCell>
                                    <TableCell>
                                        {row.user.phoneNumber}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            maxWidth: "200px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {row.user.telegramUsername ||
                                            "Not Given"}
                                    </TableCell>
                                    <TableCell>
                                        {dayjs(row.speakingDateTime).format(
                                            "HH:mm | DD MMM YYYY"
                                        ) || "Not Chosen"}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: statusColor(row.status),
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {row.status === "P_MARKED"
                                            ? "In Progress"
                                            : row.status}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Grow>
    );
};

export default ExamApplied;
