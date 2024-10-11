import { Box, Typography, Grid } from "@mui/material";
import review1 from "../../assets/tommy2.png";
import review2 from "../../assets/laziz2.png";
import review3 from "../../assets/nigina2.png";
import review4 from "../../assets/shahzod.png";

const Comments = () => {
    return (
        <Box
            id="reviews"
            minheight="80vh"
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
                Reviews
            </Typography>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={3}
                    sx={{
                        cursor: "pointer",
                        transition: "all 0.3s ease-out",
                        ":hover": {
                            transform: "scale(1.1)",
                        },
                    }}
                >
                    <img
                        src={review1}
                        style={{
                            width: "100%",
                        }}
                        alt="review"
                    />
                </Grid>
                <Grid
                    sx={{
                        cursor: "pointer",
                        transition: "all 0.3s ease-out",
                        ":hover": {
                            transform: "scale(1.1)",
                        },
                    }}
                    item
                    xs={12}
                    md={6}
                    lg={3}
                >
                    <img src={review2} style={{ width: "100%" }} alt="review" />
                </Grid>
                <Grid
                    sx={{
                        cursor: "pointer",
                        transition: "all 0.3s ease-out",
                        ":hover": {
                            transform: "scale(1.1)",
                        },
                    }}
                    item
                    display={{ xs: "none", md: "block" }}
                    md={6}
                    lg={3}
                >
                    <img src={review3} style={{ width: "100%" }} alt="review" />
                </Grid>
                <Grid
                    sx={{
                        cursor: "pointer",
                        transition: "all 0.3s ease-out",
                        ":hover": {
                            transform: "scale(1.1)",
                        },
                    }}
                    item
                    display={{ xs: "none", md: "block" }}
                    md={6}
                    lg={3}
                >
                    <img src={review4} style={{ width: "100%" }} alt="review" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Comments;
