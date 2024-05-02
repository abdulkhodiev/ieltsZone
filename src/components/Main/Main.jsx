import { Stack, Grow, Box } from "@mui/material";
import { Navbar } from "../index";
import MainHeader from "./MainHeader";
import MainAbout from "./MainAbout";
import MainContact from "./MainContact";
import { colors } from "../../constants/colors";
import MainNiners from "./MainNiners";
import Cookies from "js-cookie";
import Facilities from "./Facilities";

const Main = () => {
    const role = Cookies.get("role");

    return (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={500}>
            <Stack sx={{ position: "relative" }}>
                <Stack
                    sx={{
                        mx: "auto",
                        width: "90%",
                        maxWidth: "1280px",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            overflowX: "hidden",
                            display: {
                                xs: "none",
                                sm: "none",
                                md: "block",
                                lg: "block",
                            },
                            width: "400px",
                            height: "400px",
                            backgroundColor: colors.secondary,
                            position: "absolute",
                            borderRadius: "50%",
                            right: "0%",
                            zIndex: -1,
                            boxShadow: `0px 0px 0px 250px ${colors.secondary}`,
                        }}
                    ></Box>
                    <Navbar role={role} />
                    <MainHeader />
                    <MainAbout />
                    <MainNiners />
                    <Facilities />
                </Stack>
                <MainContact />
            </Stack>
        </Grow>
    );
};

export default Main;
