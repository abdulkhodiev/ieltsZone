import { AdminCategory } from "../index";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

const AdminMain = () => {
    return (
        <Stack
            direction={"column"}
            alignItems={"center"}
            display={"flex"}
            sx={{
                width: "100%",
            }}
        >
            <AdminCategory />
            <Outlet />
        </Stack>
    );
};

export default AdminMain;
