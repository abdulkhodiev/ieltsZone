import React, { useState } from "react";
import {
    Box,
    Stack,
    IconButton,
    Typography,
    Drawer,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { MyButton } from "../index";
import logo from "../../assets/editedLogo.jpg";
import { colors } from "../../constants/colors";

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Menu
            </Typography>
            <List
                component="nav"
                sx={{
                    flex: "none",
                    fontSize: "xl",
                    "& > div": { justifyContent: "center" },
                }}
            >
                <ListItem button component="a" href="#">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component="a" href="#about">
                    <ListItemText primary="About Us" />
                </ListItem>
                <ListItem button component={Link} to="/register">
                    <ListItemText primary="Sign Up" />
                </ListItem>
                <ListItem component={Link} to="/login">
                    <ListItemText primary="Log In" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Stack
                id="home"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    height: {
                        xs: "10vh",
                        sm: "10vh",
                        md: "15vh",
                        lg: "15vh",
                        xl: "15vh",
                    },
                    padding: "0 10px",
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                        mr: 2,
                        display: { sm: "none" },
                        bgcolor: colors.primary,
                        color: "white",
                        borderRadius: "0.6rem",
                        ":hover": { bgcolor: "black" },
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        gap: "1rem",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        width="100px"
                        style={{ borderRadius: "0.8rem" }}
                    />
                    <Link
                        to="#"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <Typography variant="h6">Home</Typography>
                    </Link>
                    <Link
                        to="#about"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <Typography variant="h6">About Us</Typography>
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: { sm: "none" },
                        bgcolor: colors.primary,
                        color: "white",
                        borderRadius: "0.6rem",
                    }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        width="70px"
                        style={{ borderRadius: "0.8rem" }}
                    />
                </Box>
                <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "1rem" }}>
                    <Link to="/register">
                        <MyButton>Sign Up</MyButton>
                    </Link>
                    <Link to="/login">
                        <MyButton>Log In</MyButton>
                    </Link>
                </Box>
            </Stack>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: 240,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Navbar;
