import { Stack } from "@mui/material";
import Navigation from "./Navigation";

const Sidebar = () => {
    return (
        <Stack
            sx={{
                display: { xs: "none", sm: "none", md: "none", lg: "block" },
                height: "100vh",
                width: "100%",
                position: "sticky",
                top: 0,
                zIndex: 100,
                borderRight: "1px solid #E5E5E5",
            }}
        >
            <Navigation />
        </Stack>
    );
};

export default Sidebar;
