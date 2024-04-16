import { AdminCategory } from "../index";
import { Stack } from "@mui/material";
import { globalContext } from "../../hooks/hook";
import { Outlet } from "react-router-dom";

const AdminMain = () => {
    const { category } = globalContext();

    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"0.5rem"}
            m={"auto"}
            sx={{
                width: {
                    xs: "100%",
                    sm: "95%",
                    md: "90%",
                    lg: "75%",
                    xl: "75%",
                },
            }}
        >
            <AdminCategory />
            <Outlet />
        </Stack>
    );
};

export default AdminMain;
