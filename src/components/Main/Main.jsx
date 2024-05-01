import { Stack, Grow } from "@mui/material";
import { Navbar } from "../index";
import MainHeader from "./MainHeader";
import MainAbout from "./MainAbout";
import MainContact from "./MainContact";
import { colors } from "../../constants/colors";
import MainNiners from "./MainNiners";
import Cookies from "js-cookie";

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
                    <div
                        style={{
                            overflowX: "hidden",
                            width: "400px",
                            height: "400px",
                            backgroundColor: colors.secondary,
                            position: "absolute",
                            borderRadius: "50%",
                            right: "0%",
                            zIndex: -1,
                            boxShadow: `0px 0px 0px 250px ${colors.secondary}`,
                        }}
                    ></div>
                    <Navbar role={role} />
                    <MainHeader />
                    <MainNiners />
                    <MainAbout />
                </Stack>
                <MainContact />
            </Stack>
        </Grow>
    );
};

export default Main;
