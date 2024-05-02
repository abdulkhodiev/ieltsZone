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
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Groups2Icon from "@mui/icons-material/Groups2";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const Navbar = ({ role }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                pl={2}
            >
                <Typography variant="h6" sx={{ my: 2 }}>
                    Menu
                </Typography>
                <Button
                    padding="0 !important"
                    onClick={handleDrawerToggle}
                    border={"none"}
                >
                    <CloseIcon
                        sx={{ color: colors.primary, padding: "0 !important" }}
                    />
                </Button>
            </Stack>

            <List
                component="nav"
                sx={{
                    flex: "none",
                    fontSize: "xl",
                    "& > div": { justifyContent: "center" },
                }}
            >
                <ListItem button component="a" href="#">
                    <ListItemIcon>
                        <HomeIcon sx={{ color: colors.primary }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: colors.primary,
                                    fontWeight: "500",
                                }}
                            >
                                Home
                            </Typography>
                        }
                    />
                </ListItem>

                <ListItem button component="a" href="#about">
                    <ListItemIcon>
                        <PeopleIcon sx={{ color: colors.primary }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: colors.primary,
                                    fontWeight: "500",
                                }}
                            >
                                About Us
                            </Typography>
                        }
                    />
                    {role === "ADMIN" ||
                        (role === "" && (
                            <ListItem button component={Link} to="/admin/exams">
                                <ListItemIcon>
                                    <AssignmentIcon
                                        sx={{ color: colors.primary }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                color: colors.primary,
                                                fontWeight: "500",
                                            }}
                                        >
                                            Exams
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                </ListItem>
                <ListItem button component="a" href="#niners">
                    <ListItemIcon>
                        <Groups2Icon sx={{ color: colors.primary }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: colors.primary,
                                    fontWeight: "500",
                                }}
                            >
                                Examiners
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem button component="a" href="#facilities">
                    <ListItemIcon>
                        <AccountBalanceIcon sx={{ color: colors.primary }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: colors.primary,
                                    fontWeight: "500",
                                }}
                            >
                                Facilities
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem button component={Link} to="/register">
                    <ListItemIcon>
                        <HowToRegIcon sx={{ color: colors.primary }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: colors.primary,
                                    fontWeight: "500",
                                }}
                            >
                                Sign Up
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem component={Link} to="/login">
                    <ListItemIcon>
                        <LoginIcon sx={{ color: colors.primary }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: colors.primary,
                                    fontWeight: "500",
                                }}
                            >
                                Log In
                            </Typography>
                        }
                    />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box
            sx={{
                flexGrow: 1,
                position: "sticky",
                top: "0",
                background: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                px: "1rem",
                my: "1rem",
                borderRadius: "1rem",
                zIndex: 999,
            }}
        >
            <Stack
                id="home"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    height: "10vh",
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                        ml: "0.1rem",
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
                        display: {
                            xs: "block",
                            sm: "block",
                            md: "none",
                            lg: "none",
                        },
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ color: `${colors.primary}`, fontWeight: "bold" }}
                    >
                        IELTSZONE
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: {
                            xs: "none",
                            sm: "none",
                            md: "flex",
                            lg: "flex",
                        },
                        gap: "2rem",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        width="100px"
                        style={{ borderRadius: "0.8rem" }}
                    />
                    <a
                        href="#"
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <Typography variant="h6">Home</Typography>
                    </a>

                    <a
                        href="#about"
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <Typography variant="h6">About Us</Typography>
                    </a>
                    <a
                        href="#niners"
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <Typography variant="h6">Examiners</Typography>
                    </a>
                    <a
                        href="#facilities"
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <Typography variant="h6">Facilities</Typography>
                    </a>
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
                    display: {
                        xs: "block",
                        sm: "block",
                        md: "block",
                        lg: "none",
                    },
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
