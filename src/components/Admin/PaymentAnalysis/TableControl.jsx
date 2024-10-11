import { useEffect, useState } from "react";
import { getExams } from "../../../utils/api/requests/get-exams";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { getPayments } from "../../../utils/api/requests/get-payments";

export const TableControl = ({ setLoading, setPayments }) => {
  const [exams, setExams] = useState();

  const fetchPayments = async (params) => {
    setLoading(true);
    try {
      const res = await getPayments(params);
      setPayments([res.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchExams = async (params) => {
    try {
      const res = await getExams(params);
      setExams(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExamChange = (e) => {
    const value = e.target.value;
    console.log(value)
    if (value && value !== "all") {
      fetchPayments({ examId: value });
    } else {
      fetchPayments();
    }
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"start"}
      alignItems={"center"}
      marginBottom={"1rem"}
      gap={"1rem"}
      flexWrap={"wrap"}
    >
      <FormControl fullWidth sx={{ width: 200, marginRight: "1rem" }}>
        <InputLabel>Exams</InputLabel>
        <Select
          defaultValue={"all"}
          label="Exams"
          onChange={(e) => handleExamChange(e)}
          sx={{
            "& .MuiSelect-select": {
              paddingRight: 4,
              paddingLeft: 2,
              paddingTop: 1,
              paddingBottom: 1,
            },
          }}
        >
          <MenuItem value={"all"}>All</MenuItem>
          {exams?.map((exam) => (
            <MenuItem key={exam.id} value={exam.id}>
              {dayjs(exam.examDateTime).format("DD.MM.YYYY")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};
