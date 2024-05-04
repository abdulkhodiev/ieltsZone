import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import Stack from "@mui/material/Stack";
import niners from "../../assets/niners.jpg";
import niners2 from "../../assets/niner2.jpg";
import niners3 from "../../assets/niner3.jpg";

const images = [niners, niners2, niners3]; // Array of images

const Carousel = () => {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setCurrent((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                ),
            5000
        );

        return () => {
            resetTimeout();
        };
    }, [current]);

    return (
        <Stack
            direction="row"
            gap={2}
            justifyContent="center"
            alignItems="center"
            sx={{
                overflow: "hidden",
                width: "100%",
                height: "480px",
                position: "relative",
            }}
        >
            {images.map((img, index) => {
                let style = {};
                if (index === current) {
                    style = {
                        transform: "translateX(0%) scale(1.1)",
                        opacity: 1,
                    };
                } else if (index === (current + 1) % images.length) {
                    style = {
                        transform: "translateX(100%) scale(0.8)",
                        opacity: 0.7,
                    };
                } else if (
                    index ===
                    (current - 1 + images.length) % images.length
                ) {
                    style = {
                        transform: "translateX(-100%) scale(0.8)",
                        opacity: 0.7,
                    };
                } else {
                    style = { display: "none" };
                }

                return (
                    <Card
                        key={index}
                        sx={{
                            minHeight: "440px",
                            width: "420px",
                            borderRadius: "2rem",
                            transition: "all 0.5s ease-in-out",
                            position: "absolute",
                            zIndex: index === current ? 2 : 1,
                            ...style,
                        }}
                    >
                        <CardCover>
                            <img src={img} loading="lazy" alt="" />
                        </CardCover>
                        <CardCover
                            sx={{
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                            }}
                        />
                        <CardContent sx={{ justifyContent: "flex-end" }}>
                            <Typography level="title-lg" textColor="#fff">
                                Yosemite National Park
                            </Typography>
                            <Typography
                                startDecorator={<LocationOnRoundedIcon />}
                                textColor="neutral.300"
                            >
                                California, USA
                            </Typography>
                        </CardContent>
                    </Card>
                );
            })}
        </Stack>
    );
};

export default Carousel;
