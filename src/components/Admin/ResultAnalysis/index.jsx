import { Stack } from "@mui/material";
import { useState } from "react";
import { Table } from "./Table";
import { TableControl } from "./TableControl";

const ResultAnalysis = () => {
	const [scores, setScores] = useState();
	const [markIeltsZoneStudents, setMarkIeltsZoneStudents] = useState();
	const [loading, setLoading] = useState(true);

	return (
		<Stack
			direction='column'
			sx={{
				width: { xs: "100%", lg: "90%" },
				justifyContent: "center",
				padding: "1.5rem 0.5rem",
			}}
		>
			<TableControl
				setScores={setScores}
				setLoading={setLoading}
				markIeltsZoneStudents={markIeltsZoneStudents}
				setMarkIeltsZoneStudents={setMarkIeltsZoneStudents}
			/>
			<Table
				data={scores}
				loading={loading}
				markIeltsZoneStudents={markIeltsZoneStudents}
			/>
		</Stack>
	);
};

export default ResultAnalysis;
