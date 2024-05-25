import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { colors } from "../../constants/colors";
import { data } from "../../constants/cardContent";

const MainAbout = () => {
    return (
        <Box
            id="about"
            minHeight={{
                xs: "100vh",
                md: "calc(720px - 70px)",
            }}
            maxHeight={{
                md: "1080px",
            }}
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
                🚀 Why Choose IELTSZONE for Mock IELTS? 🚀
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                {data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                minWidth: 250,
                                bgcolor:
                                    index % 2 === 0
                                        ? colors.secondary
                                        : colors.cardColor,
                                borderRadius: 5,
                                minHeight: "100%",
                            }}
                            variant="outlined"
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    component="div"
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ my: 1.2, mx: 0.5 }}
                                    color="text.secondary"
                                >
                                    {item.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MainAbout;
