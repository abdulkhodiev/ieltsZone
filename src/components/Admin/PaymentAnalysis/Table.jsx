import {
    CircularProgress,
    Table as MTable,
    TableRow as MTableRow,
    Paper,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
} from "@mui/material";
import { TableRow } from "./TableRow";

export const Table = ({ data, loading }) => {
    if (loading)
        return (
            <Stack alignItems={"center"}>
                <CircularProgress />
            </Stack>
        );

    return (
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
            <MTable aria-label="simple table">
                <TableHead>
                    <MTableRow>
                        <TableCell align="right">#</TableCell>
                        <TableCell align="right">Registrations</TableCell>
                        <TableCell align="right">
                            Accepted Registrations
                        </TableCell>
                        <TableCell align="right">Exams count</TableCell>
                        <TableCell align="right">IELTS ZONE Students</TableCell>
                        <TableCell align="right">Payment</TableCell>
                    </MTableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row, index) => (
                        <TableRow key={row.index} row={row} index={index} />
                    ))}
                </TableBody>
            </MTable>
        </TableContainer>
    );
};
