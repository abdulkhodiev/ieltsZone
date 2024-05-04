import { Stack, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/Context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { colors } from "../../constants/colors";
import { useLocation } from "react-router-dom";

const AdminNavbar = () => {
    const { userData } = useContext(DataContext);
    const location = useLocation();
    const [sectionName, setSectionName] = useState("ADMIN DASHBOARD");

    useEffect(() => {
        if (location.pathname.includes("mentors")) {
            setSectionName("Admins");
        } else if (location.pathname.includes("exams")) {
            setSectionName("Exams");
        } else if (location.pathname.includes("result")) {
            setSectionName("Result Analysis");
        } else if (location.pathname.includes("payment")) {
            setSectionName("Payment Analysis");
        } else {
            setSectionName("ADMIN DASHBOARD");
        }
    }, [location.pathname]);

    return (
        <Stack
            direction={"row"}
            sx={{
                display: {
                    xs: "none",
                    sm: "none",
                    md: "none",
                    lg: "flex",
                },
                top: 0,
                bgcolor: "white",
                minHeight: "9vh !important",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                px: 8,
                borderBottom: "1px solid #E5E5E5",
                position: "sticky",
                zIndex: 100,
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: "500" }}>
                {sectionName}
            </Typography>
            <Stack
                sx={{ display: "flex", alignItems: "center" }}
                direction={"row"}
                gap={1}
            >
                <AccountCircleIcon
                    fontSize={"large"}
                    sx={{ color: colors.primary }}
                />
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "600",
                        fontSize: "1.2rem",
                        color: colors.primary,
                    }}
                >
                    {userData.firstName} {userData.lastName}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default AdminNavbar;
