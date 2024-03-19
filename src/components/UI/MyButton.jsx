import React from "react";
import { colors } from "../../constants/colors";
import { Button } from "@mui/material";

const MyButton = ({ children }) => {
    return (
        <Button
            variant="contained"
            sx={{
                bgcolor: colors.primary,
                ":hover": { bgcolor: colors.primary },
                borderRadius: "0.6rem",
                textTransform: "none",
                fontSize: "1.1rem",
            }}
        >
            {children}
        </Button>
    );
};

export default MyButton;
