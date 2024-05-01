import { Box } from "@mui/material";

const MainNiners = () => {
    return (
        <Box
            height={"80vh"}
            sx={{
                borderRadius: "2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: {
                    xs: "1.5rem",
                    sm: "2rem",
                    md: "2rem",
                    lg: "2rem",
                },
            }}
        ></Box>
    );
};

export default MainNiners;
