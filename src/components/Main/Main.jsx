import React from "react";
import { Container } from "@mui/material";
import { Navbar } from "../index";
import MainHeader from "./MainHeader";
import MainAbout from "./MainAbout";
import MainContact from "./MainContact";

const Main = () => {
    return (
        <>
            <Container width={"90%"} mx={"auto"}>
                <Navbar />
                <MainHeader />
                <MainAbout />
            </Container>
            <MainContact />
        </>
    );
};

export default Main;
