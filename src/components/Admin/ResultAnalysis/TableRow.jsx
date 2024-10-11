import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { TableRowDetails } from "./TableRowDetails";

function Row(props) {
	const { row, markIeltsZoneStudents, index } = props;
	const [open, setOpen] = useState(false);

	return (
		<>
			<TableRow
				key={row.studentId}
				sx={{
					backgroundColor:
						row.isIeltsZoneStudent && markIeltsZoneStudents
							? "#dcffe6"
							: "#fff",
					"&:last-child td, &:last-child th": {
						border: 0,
					},
				}}
			>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
					</IconButton>
				</TableCell>
				<TableCell align='right'>{index + 1}</TableCell>
				<TableCell align='right' component='th' scope='row'>
					{row.listening}
				</TableCell>
				<TableCell align='right'>{row.reading}</TableCell>
				<TableCell align='right'>{row.writing}</TableCell>
				<TableCell align='right'>{row.speaking}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<TableRowDetails id={row.candidateId} />
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

export default Row;
