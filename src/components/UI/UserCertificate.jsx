import React, { useRef, useEffect } from "react";
import certificate from "../../assets/certificate.jpg"; // Make sure the path is correct
import { Button } from "@mui/material";
import { colors } from "../../constants/colors";

const UserCertificate = ({ name, sectionResults, bandScore, dateTime }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const image = new Image();

            image.onload = () => {
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "black";
                ctx.font = "30px Arial";

                ctx.fillText(name.firstName + " " + name.lastName, 520, 345); // Example position (center of width and specific height)

                sectionResults.forEach((result, index) => {
                    ctx.fillText(result.score, 200 + index * 152, 525);
                });

                ctx.fillText(bandScore, 840, 525);

                ctx.font = "18px Arial";

                ctx.fillText(dateTime, 643, 434);
            };

            image.src = certificate;
        }
    }, [name, sectionResults]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.download = "certificate.jpg"; // Set the default filename for the download
        link.href = image;
        document.body.appendChild(link); // Append link to body
        link.click();
        document.body.removeChild(link); // Clean up
    };

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{ display: "none" }}
                width="1087"
                height="768"
            />
            <Button
                sx={{
                    bgcolor: colors.primary,
                    ":hover": { bgcolor: colors.primary },
                    borderRadius: "0.6rem",
                    textTransform: "none",
                    fontSize: "1.1rem",
                    padding: "0.3rem 1rem",
                    marginBottom: {
                        xs: "1rem",
                        sm: "1rem",
                        md: "0",
                        lg: "0",
                        xl: "0",
                    },
                    color: "white",
                }}
                onClick={handleDownload}
            >
                IELTSZONE Certificate
            </Button>
        </>
    );
};

export default UserCertificate;
