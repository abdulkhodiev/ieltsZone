import React from "react";
import { Container, Stack } from "@mui/material";
import { Navbar } from "../index";
import MainHeader from "./MainHeader";
import MainAbout from "./MainAbout";
import MainContact from "./MainContact";

const Main = () => {
    return (
        <>
            <Stack
                sx={{
                    mx: "auto",
                    width: "90%",
                    height: "100%",
                }}
            >
                <Navbar />
                <MainHeader />
                <MainAbout />
            </Stack>
            <MainContact />
        </>
    );
};

export default Main;
