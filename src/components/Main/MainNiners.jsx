import { Box } from "@mui/material";
import Carousel from "../UI/Carousel";
import { Typography } from "@mui/material";

const MainNiners = () => {
    return (
        <Box
            id="niners"
            minHeight="80vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={5}
            alignItems="center"
            py={{ xs: 5, sm: 4, md: 4, lg: 0 }}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                textAlign={{ xs: "center", sm: "center", md: "left" }}
                sx={{ width: "100%" }}
            >
                Our Niners and Also Your Examiners
            </Typography>
            <Carousel />
        </Box>
    );
};

export default MainNiners;
