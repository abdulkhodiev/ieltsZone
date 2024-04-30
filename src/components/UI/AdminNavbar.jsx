import { Stack, Typography } from "@mui/material";

const AdminNavbar = () => {
    return (
        <Stack
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
                justifyContent: "center",
                px: 8,
                borderBottom: "1px solid #E5E5E5",
                position: "sticky",
                zIndex: 100,
            }}
        >
            <Typography variant="h4">Hello</Typography>
        </Stack>
    );
};

export default AdminNavbar;
