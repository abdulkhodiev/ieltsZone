import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { colors } from "../../../constants/colors";
import LocationOn from "@mui/icons-material/LocationOn";
const MobileAccordion = ({
    children,
    regionName,
    speakingDate,
    status,
    examDate,
    examTime,
    details,
    locationUrl,
    fullRegionName,
    speakingTime,
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
        height: "max-content",
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
        height: "max-content",
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
                        width: "100%",
                        justifyContent: "space-between",
                        gap: "1rem",
                        color: colors.primary,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            gap: "0.7rem",
                            padding: "1rem 0",
                        }}
                    >
                        <h2 className="mb-0 fw-bold" style={{ fontSize }}>
                            {regionName}
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                gap: "0.7rem",

                                borderRadius: "0.6rem",
                            }}
                        >
                            <h4 className="mb-0" style={{ fontSize }}>
                                Exam Date:{" "}
                                <span className="black fw-bold">
                                    {examTime} {examDate}
                                </span>
                            </h4>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                gap: "0.7rem",

                                borderRadius: "0.6rem",
                            }}
                        >
                            <h4 className="mb-0" style={{ fontSize }}>
                                Speaking Date:{" "}
                                <span className="black fw-bold">
                                    {speakingTime} {speakingDate}
                                </span>
                            </h4>
                        </div>

                        <a
                            target="_blank"
                            href={locationUrl}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: `${colors.primary}`,
                                fontWeight: "bold",
                                borderRadius: "0.6rem",
                            }}
                        >
                            <span style={{ fontSize }}>
                                <LocationOn fontSize="inherit" />
                                {fullRegionName}
                            </span>
                        </a>
                    </div>

                    <button style={buttonItemStyle}>
                        <KeyboardArrowDownIcon
                            style={{
                                transform: expanded
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                                fontSize,
                            }}
                        />
                    </button>
                </div>
            </div>
            <div style={contentStyle}>
                <div style={{ padding: "1rem" }}>
                    <pre style={{ whiteSpace: "pre-wrap" }}>{details}</pre>
                </div>
            </div>
            <div style={buttonStyle} className="py-2">
                <div>
                    <h4 style={{ fontSize }} className="mb-0">
                        <span
                            className="fw-bold"
                            style={{
                                backgroundColor:
                                    status === "NEW"
                                        ? "orange"
                                        : status === "REJECTED"
                                        ? "red"
                                        : status === "MARKED"
                                        ? "blue"
                                        : status === "P_MARKED"
                                        ? "yellow"
                                        : "green",
                                padding: "0.1rem 0.5rem",
                                borderRadius: "0.6rem",
                                color:
                                    status === "NEW" || status === "P_MARKED"
                                        ? "black"
                                        : "white",
                            }}
                        >
                            {status === "NEW"
                                ? "Pending"
                                : status === "P_MARKED"
                                ? "In Progress"
                                : status}
                        </span>
                    </h4>
                </div>

                <div>{children}</div>
            </div>
        </div>
    );
};

export default MobileAccordion;
