import { useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { MyButton } from "../index";
import logo from "../../assets/Zonelogo14.png";
import { colors } from "../../constants/colors";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CloseIcon from "@mui/icons-material/Close";
import Groups2Icon from "@mui/icons-material/Groups2";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Cookies from "js-cookie";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MessageIcon from "@mui/icons-material/Message";

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const token = Cookies.get("token");
    const role = Cookies.get("role");

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
                                Atmosphere
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem button component="a" href="#reviews">
                    <ListItemIcon>
                        <MessageIcon sx={{ color: colors.primary }} />
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
                                Reviews
                            </Typography>
                        }
                    />
                </ListItem>
                {token ? (
                    role === "ADMIN" ? (
                        <ListItem button component={Link} to="/admin/mentors">
                            <ListItemIcon>
                                <MeetingRoomIcon
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
                                        Enter
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ) : (
                        <ListItem button component={Link} to="/user/exams">
                            <ListItemIcon>
                                <MeetingRoomIcon
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
                                        Enter
                                    </Typography>
                                }
                            />
                        </ListItem>
                    )
                ) : (
                    <>
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
                        <ListItem button component={Link} to="/login">
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
                    </>
                )}
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
                    height: "70px",
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                        ml: "0.1rem",
                        display: { sm: "flex", md: "flex", lg: "none" },
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
                            md: "block",
                            lg: "none",
                        },
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ color: `${colors.primary}`, fontWeight: "bold" }}
                    >
                        IELTS ZONE
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: { sm: "flex", md: "flex", lg: "none" },
                        color: "white",
                    }}
                >
                    <img src={logo} alt="Logo" width="70px" />
                </Box>

                <Box
                    sx={{
                        display: {
                            xs: "none",
                            sm: "none",
                            md: "none",
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
                </Box>

                <Box
                    sx={{
                        display: {
                            xs: "none",
                            sm: "none",
                            md: "none",
                            lg: "flex",
                        },
                        gap: "3rem",
                        alignItems: "center",
                    }}
                >
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
                        <Typography variant="h6">Atmosphere</Typography>
                    </a>
                    <a
                        href="#reviews"
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <Typography variant="h6">Reviews</Typography>
                    </a>
                </Box>

                {token ? (
                    <Box
                        sx={{
                            display: { xs: "none", lg: "flex" },
                            gap: "1rem",
                        }}
                    >
                        {role === "ADMIN" ? (
                            <Link to="/admin/mentors">
                                <MyButton>ENTER</MyButton>
                            </Link>
                        ) : (
                            <Link to="/user/exams">
                                <MyButton>ENTER</MyButton>
                            </Link>
                        )}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: { xs: "none", lg: "flex" },
                            gap: "1rem",
                        }}
                    >
                        <Link to="/register">
                            <MyButton>Sign Up</MyButton>
                        </Link>
                        <Link to="/login">
                            <MyButton>Log In</MyButton>
                        </Link>
                    </Box>
                )}
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
