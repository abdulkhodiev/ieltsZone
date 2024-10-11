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

            const firstName = name.firstName;
            const lastName = name.lastName;

            const fullnameLength = firstName.length + lastName.length;

            const getX = (fullnameLength) => {
                if (fullnameLength > 10 && fullnameLength < 13) {
                    return 480;
                } else if (fullnameLength > 13 && fullnameLength < 15) {
                    return 470;
                } else if (fullnameLength > 15 && fullnameLength < 17) {
                    return 460;
                } else if (fullnameLength > 17 && fullnameLength < 20) {
                    return 450;
                } else if (fullnameLength > 20 && fullnameLength < 23) {
                    return 440;
                } else {
                    return 430;
                }
            };

            image.onload = () => {
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "black";
                ctx.font = "30px Arial";

                ctx.fillText(
                    firstName + " " + lastName,
                    getX(fullnameLength),
                    345
                );

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
