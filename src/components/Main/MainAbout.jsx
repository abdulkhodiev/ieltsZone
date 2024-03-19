import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { colors } from "../../constants/colors";
import { data } from "../../constants/cardContent";

const MainAbout = () => {
    return (
        <Box id={"about"} height={"100vh "}>
            <Typography variant="h4" fontWeight={"bold"} py={4}>
                🚀 Why Choose IELTSZONE for Mock IELTS? 🚀
            </Typography>

            <Grid container spacing={2}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                minWidth: 275,
                                bgcolor:
                                    index % 2 === 0
                                        ? colors.secondary
                                        : colors.cardColor,
                                borderRadius: 5,
                                minHeight: "100%",
                            }}
                            variant="outlined"
                        >
                            <CardContent sx>
                                <Typography
                                    variant="h6"
                                    fontWeight={"bold"}
                                    component="div"
                                >
                                    ✨ {item.title}
                                </Typography>
                                <Typography
                                    variant="body2"
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
