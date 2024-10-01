import React, { useRef } from "react";
import { Box, Grow, Typography } from "@mui/material";
import { feedback } from "../../../data/feedback";
import score from "../../assets/listeningResult.png";
const FeedbackFolder = () => {
    return (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={500}>
            <Box
                width={{
                    xs: "100%",
                    sm: "100%",
                    md: "70%",
                    lg: "50%",
                }}
                p={1}
                display={"flex"}
                flexDirection={"column"}
                gap={1}
            >
                <Typography
                    variant="h5"
                    bgcolor={"lightblue"}
                    p={1}
                    borderRadius={"1rem"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                >
                    Listening
                </Typography>
                <img src={score} />
                <Box
                    bgcolor={"yellow"}
                    borderRadius={"1rem"}
                    display={"flex"}
                    justifyContent={"space-evenly"}
                >
                    <Typography variant="h6">Part 1</Typography>
                    <Typography variant="h6">9/10</Typography>
                </Box>
                <Box
                    bgcolor={"purple"}
                    borderRadius={"1rem"}
                    display={"flex"}
                    p={1}
                    flexDirection={"column"}
                    justifyContent={"space-evenly"}
                >
                    <Typography
                        variant="h6"
                        textAlign={"center"}
                        color={"white"}
                    >
                        FeedBack
                    </Typography>
                    <p className="text-white">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Alias ut libero aut nisi quam molestiae, ad
                        impedit velit minus. Hic, error! Neque nobis quibusdam
                        ut repellat aut minima officia facilis.
                    </p>
                </Box>
                <Box
                    bgcolor={"grey"}
                    borderRadius={"1rem"}
                    display={"flex"}
                    p={1}
                    flexDirection={"column"}
                    justifyContent={"space-evenly"}
                >
                    <Typography
                        variant="h6"
                        textAlign={"center"}
                        color={"white"}
                    >
                        Suggetion
                    </Typography>
                    <p className="text-white">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Alias ut libero aut nisi quam molestiae, ad
                        impedit velit minus. Hic, error! Neque nobis quibusdam
                        ut repellat aut minima officia facilis.
                    </p>
                </Box>
            </Box>
        </Grow>
    );
};

export default FeedbackFolder;
