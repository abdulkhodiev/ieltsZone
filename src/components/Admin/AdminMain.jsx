import { AdminCategory } from "../index";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

const AdminMain = () => {
    return (
        <Stack
            direction={"column"}
            alignItems={"center"}
            display={"flex"}
            mx={"auto"}
            sx={{
                width: {
                    xs: "100%",
                    sm: "95%",
                    md: "75%",
                    lg: "100%",
                    xl: "100%",
                },
            }}
        >
            <AdminCategory />
            <Outlet />
        </Stack>
    );
};

export default AdminMain;
