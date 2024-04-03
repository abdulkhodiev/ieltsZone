import { AdminCategory } from "../index";
import { Stack } from "@mui/material";
import { globalContext } from "../../hooks/hook";
import { Outlet } from "react-router-dom";

const AdminMain = () => {
    const { category } = globalContext();

    return (
        <Stack
            direction={"column"}
            width={"75%"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"0.5rem"}
            m={"auto"}
        >
            <AdminCategory />
            <Outlet />
        </Stack>
    );
};

export default AdminMain;
