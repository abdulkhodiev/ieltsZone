import React from "react";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { UserCategory } from "../index";

const UserMain = () => {
    return (
        <Stack
            direction={"column"}
            width={"75%"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"0.5rem"}
            m={"auto"}
        >
            <UserCategory />
            <Outlet />
        </Stack>
    );
};

export default UserMain;
