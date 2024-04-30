import { useState } from "react";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import Menu from "@mui/icons-material/Menu";
import Navigation from "../UI/Navigation";
import { ModalClose } from "@mui/joy";

const Sheet = () => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ position: "absolute" }}>
            <Button
                variant="outlined"
                color="neutral"
                sx={{
                    margin: 2,
                    display: {
                        xs: "flex",
                        sm: "flex",
                        md: "flex",
                        lg: "none",
                    },
                }}
                onClick={() => setOpen(true)}
            >
                <Menu />
            </Button>

            <Drawer
                size="md"
                variant="plain"
                open={open}
                position="relative"
                onClose={() => setOpen(false)}
                slotProps={{
                    content: {
                        sx: {
                            width: {
                                xs: "100%",
                                sm: "50%",
                                md: "40%",
                                lg: "30%",
                            },
                            bgcolor: "transparent",
                            p: { md: 2, xs: 2 },
                            boxShadow: "none",
                        },
                    },
                }}
            >
                <ModalClose
                    variant="outlined"
                    sx={{
                        position: "absolute",
                        top: 35,
                        right: 25,
                    }}
                />
                <Navigation />
            </Drawer>
        </div>
    );
};

export default Sheet;
