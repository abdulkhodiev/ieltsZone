import { useState, useEffect } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { colors } from "../../constants/colors";
import LocationOn from "@mui/icons-material/LocationOn";
const Accordion = ({
    children,
    regionName,
    price,
    examDate,
    examTime,
    details,
    locationUrl,
    fullRegionName,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [fontSize, setFontSize] = useState("1.2rem");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 368) {
                setFontSize(".6rem");
            } else if (window.innerWidth <= 488) {
                setFontSize(".7rem");
            } else if (window.innerWidth <= 600) {
                setFontSize("1rem");
            } else if (window.innerWidth <= 626) {
                setFontSize("1.1rem");
            } else {
                setFontSize("1.2rem");
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const accordionStyle = {
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: "0.6rem",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
    };

    const titleStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "10vh",
        borderBottom: expanded ? "1px solid #ddd" : "none",
        padding: "0 1rem",
        cursor: "pointer",
        backgroundColor: expanded ? "#f9f9f9" : "white",
        transition: "background-color 0.3s ease",
        color: colors.primary,
    };

    const contentStyle = {
        maxHeight: expanded ? "100vh" : "0",
        overflow: "hidden",
        transition: "max-height 0.3s ease-in-out",
        color: colors.primary,
    };

    const buttonStyle = {
        padding: "0 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        height: "10vh",
        borderTop: "1px solid #ddd",
        backgroundColor: "#f9f9f9",
    };

    const buttonItemStyle = {
        backgroundColor: colors.secondary,
        border: "1px solid #ddd",
        borderRadius: "0.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease",
        cursor: "pointer",
        color: colors.primary,
        fontWeight: "bold",
    };

    const handleOpen = () => setExpanded(!expanded);

    return (
        <div className="accordion" style={accordionStyle}>
            <div className="title" style={titleStyle} onClick={handleOpen}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        color: colors.primary,
                    }}
                >
                    <button style={buttonItemStyle}>
                        <KeyboardArrowRightIcon
                            style={{
                                transform: expanded
                                    ? "rotate(90deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                                fontSize,
                            }}
                        />
                    </button>
                    <h3 className="mb-0 fw-bold" style={{ fontSize }}>
                        {regionName}
                    </h3>
                </div>
                <div>
                    <h4 className="mb-0 fw-bold" style={{ fontSize }}>
                        {examTime}, {examDate}
                    </h4>
                </div>
            </div>
            <div style={contentStyle}>
                <div style={{ padding: "1rem" }}>
                    <a
                        target="_blank"
                        href={locationUrl}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginBottom: "1rem",
                            color: `${colors.primary}`,
                            fontWeight: "bold",
                            borderRadius: "0.6rem",
                        }}
                    >
                        <LocationOn />
                        {fullRegionName}
                    </a>

                    <pre style={{ whiteSpace: "pre-wrap" }}>{details}</pre>
                </div>
            </div>
            <div style={buttonStyle}>
                <div>
                    <span
                        style={{
                            color: colors.primary,
                            fontWeight: "bold",
                            fontSize,
                        }}
                    >
                        {price} so&lsquo;m
                    </span>
                </div>

                <div>{children}</div>
            </div>
        </div>
    );
};

export default Accordion;
