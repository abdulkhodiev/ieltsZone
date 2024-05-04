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
    Button,
    Grow,
    Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../../../constants/colors";
import { getAcceptedUsers } from "../../../../utils/api/requests/accepted-user";
import dayjs from "dayjs";

const ExamAccepted = () => {
    const { examId, rowId } = useParams();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const fetchAcceptedUsers = async () => {
        const res = await getAcceptedUsers(examId);
        setRows(res);
    };

    const csvDonwload = `http://localhost:8080/api/v1/registration/download-excel?examId=${examId}`;

    const excelExport = (url) => {
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    };

    useEffect(() => {
        fetchAcceptedUsers();
    }, [examId]);

    function statusColor(status) {
        switch (status) {
            case "ACCEPTED":
                return "green";
            case "REJECTED":
                return "red";
            case "MARKED":
                return "blue";
            case "NEW":
                return "orange";
            default:
                return "black";
        }
    }

    const handleRowClick = (rowId, firstName, lastName) => {
        navigate(`/admin/exams/${examId}/participants/accepted/${rowId}`, {
            state: { firstName: firstName, lastName: lastName },
        });
    };

    return (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={500}>
            <Stack width={"100%"}>
                <Button
                    onClick={() => excelExport(csvDonwload)}
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
                                <TableCell>Full Name</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Telegram</TableCell>
                                <TableCell>Speaking Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.04)",
                                        },
                                    }}
                                    onClick={() =>
                                        handleRowClick(
                                            row.id,
                                            row.user.firstName,
                                            row.user.lastName
                                        )
                                    }
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
                                        {row.status}
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

export default ExamAccepted;
