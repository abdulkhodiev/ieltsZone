import { Stack } from "@mui/material";
import { Table } from "./Table";
import { TableControl } from "./TableControl";
import { useState } from "react";

export const PaymentAnalysis = () => {
  const [payments, setPayments] = useState();
  const [loading, setLoading] = useState(true);

  return (
    <Stack
      direction="column"
      sx={{
        width: { xs: "100%", lg: "90%" },
        justifyContent: "center",
        padding: "1.5rem 0.5rem",
      }}
    >
      <TableControl setPayments={setPayments} setLoading={setLoading} />
      <Table data={payments} loading={loading} />
    </Stack>
  );
};
