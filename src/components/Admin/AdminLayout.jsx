import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import Sidebar from "../UI/Sidebar";
import Sheet from "../UI/Drawer";
import AdminNavbar from "../UI/AdminNavbar";

const AdminLayout = () => {
    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                width: "100%",
                bgcolor: "#FBFCFE",
                overflow: "auto",
            }}
        >
            <Box
                sx={{
                    width: { xs: "0%", sm: "0%", md: "0%", lg: "300px" },
                    flexShrink: { md: 0 },
                    height: "100%",
                }}
            >
                <Sheet />
                <Sidebar />
            </Box>

            <Stack
                sx={{
                    flexGrow: 1,
                    width: "100%",
                    overflow: "auto",
                    mt: { xs: "3rem", sm: "3rem", md: "0", lg: "0" },
                }}
            >
                <AdminNavbar />
                <Outlet />
            </Stack>
        </Box>
    );
};

export default AdminLayout;
