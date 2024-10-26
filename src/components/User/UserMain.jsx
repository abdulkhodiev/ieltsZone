import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { UserCategory } from "../index";

const UserMain = () => {
    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"0.5rem"}
            m={{
                sm: "1rem",
                md: "1rem",
                lg: "1rem",
                xl: "1rem",
            }}
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
            <UserCategory />
            <Outlet />
        </Stack>
    );
};

export default UserMain;
