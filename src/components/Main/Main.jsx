import { Stack } from "@mui/material";
import { Navbar } from "../index";
import MainHeader from "./MainHeader";
import MainAbout from "./MainAbout";
import MainContact from "./MainContact";
import Cookies from "js-cookie";

const Main = () => {
    const role = Cookies.get("role");

    return (
        <>
            <Stack
                sx={{
                    mx: "auto",
                    width: "90%",
                    height: "100%",
                }}
            >
                <Navbar role={role} />
                <MainHeader />
                <MainAbout />
            </Stack>
            <MainContact />
        </>
    );
};

export default Main;
