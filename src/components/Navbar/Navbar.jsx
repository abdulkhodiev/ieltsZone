import React from "react";
import { Box, Stack, Button } from "@mui/material";
import logo from "../../assets/editedLogo.jpg";
import { MyButton } from "../index";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Stack
            id={"home"}
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
            height={"15vh"}
        >
            <Box sx={{ display: "flex", gap: "1rem" }} alignItems={"center"}>
                <img
                    src={logo}
                    alt="Logo"
                    width={"100px"}
                    style={{ borderRadius: "0.8rem" }}
                />
                <a
                    className="navbarLinks"
                    style={{ marginLeft: "3rem" }}
                    href="#"
                >
                    Home
                </a>
                <a
                    className="navbarLinks"
                    style={{ marginLeft: "3rem" }}
                    href="#about"
                >
                    About Us
                </a>
            </Box>
            <Box sx={{ display: "flex", gap: "1rem" }}>
                <Link>
                    <MyButton>Sign Up</MyButton>
                </Link>
                <Link to="/admin/mentors">
                    <MyButton>Log In</MyButton>
                </Link>
            </Box>
        </Stack>
    );
};

export default Navbar;
