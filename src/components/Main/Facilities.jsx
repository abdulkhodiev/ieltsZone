import { Box, Typography } from "@mui/material";

import DarkVariantExample from "../UI/FacilitiesCarousel";

const Facilities = () => {
    return (
        <Box
            id="facilities"
            minheight="80vh"
            maxHeight={"100vh"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={5}
            my={"2rem"}
            alignItems="center"
            py={{ xs: 5, sm: 4, md: 4, lg: 0 }}
            sx={{}}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                textAlign={{
                    xs: "center",
                    sm: "center",
                    md: "left",
                    zIndex: 100,
                }}
                sx={{ width: "100%" }}
            >
                Mock Exam Atmosphere
            </Typography>

            <DarkVariantExample />
        </Box>
    );
};

export default Facilities;
