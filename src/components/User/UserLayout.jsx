import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Menu from "@mui/icons-material/Menu";
import ListItemButton from "@mui/joy/ListItemButton";
import { Outlet, useNavigate } from "react-router-dom";
import { colors } from "../../constants/colors";
import { format } from "date-fns";
import logo from "../../assets/logo.jpg";
import { Box } from "@mui/material";
import { getRegisteredExams } from "../../utils/api/requests/get-registered-exams";
import { getMe } from "../../utils/api/requests/add-exams";
import Cookies from "js-cookie";
const UserLayout = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [availableExams, setAvailableExams] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const location = useLocation();

    const examsDynamicStyles = location.pathname.includes("user/exams")
        ? {
              bgcolor: colors.primary,
              color: "white",
              borderRadius: "0.6rem",
          }
        : {};

    const resultsDynamicStyles = location.pathname.includes("user/results")
        ? {
              bgcolor: colors.primary,
              color: "  white",
              borderRadius: "0.6rem",
              "&:hover": {
                  bgcolor: colors.primary,
                  color: "white",
              },
          }
        : {};

    const fetchExams = useCallback(async () => {
        try {
            const res = await getRegisteredExams();

            const formattedExams = res.map((exam) => ({
                ...exam,
                examDateTime: format(
                    new Date(exam.examDateTime),
                    "MMMM do yyyy"
                ),
            }));
            fetchUserInfo();
            setAvailableExams(formattedExams);
        } catch (error) {
            console.error("Error fetching exams:", error);
        }
    }, []);

    const fetchUserInfo = useCallback(async () => {
        try {
            const res = await getMe();
            setUserInfo(res);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    });

    const LogOut = () => {
        Cookies.remove("token", { path: "/" });
        navigate("/");
    };

    useEffect(() => {
        fetchExams();
    }, [fetchExams]);
    return (
        <div>
            <Box
                sx={{
                    margin: {
                        xs: "0.5rem",
                        sm: "1rem",
                        md: "1.5rem",
                    },
                    position: "absolute",
                    zIndex: 999,
                }}
            >
                <React.Fragment>
                    <Button
                        variant="outlined"
                        sx={{
                            border: `2px solid ${colors.primary}`,
                        }}
                        color="neutral"
                        onClick={() => setOpen(true)}
                    >
                        <Menu />
                    </Button>
                    <Drawer
                        size="md"
                        variant="plain"
                        open={open}
                        onClose={() => setOpen(false)}
                        slotProps={{
                            content: {
                                sx: {
                                    bgcolor: "transparent",
                                    p: { md: 3, sm: 0 },
                                    boxShadow: "none",
                                },
                            },
                        }}
                    >
                        <Sheet
                            sx={{
                                borderRadius: "md",
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                height: "100%",
                                overflow: "auto",
                            }}
                        >
                            <DialogTitle
                                sx={{
                                    fontSize: "lg",
                                    display: "flex",
                                    gap: 1,
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={logo}
                                    style={{
                                        width: "3rem",
                                        borderRadius: "0.4rem",
                                    }}
                                    alt=""
                                />{" "}
                                IELTSZONE
                            </DialogTitle>
                            <ModalClose />
                            <Divider />

                            <List
                                size="lg"
                                component="nav"
                                sx={{
                                    flex: "none",
                                    fontSize: "xl",
                                    "& > div": { justifyContent: "center" },
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        ...examsDynamicStyles,
                                        ":hover": {
                                            bgcolor: colors.primary,
                                            color: "white",
                                        },
                                    }}
                                    onClick={() => navigate("/user/exams")}
                                >
                                    Exams{" "}
                                </ListItemButton>
                                <ListItemButton
                                    sx={{
                                        ...resultsDynamicStyles,
                                        ":hover": {
                                            bgcolor: colors.primary,
                                            color: "white",
                                        },
                                    }}
                                    onClick={() => navigate("/user/results")}
                                >
                                    Results
                                </ListItemButton>
                            </List>

                            <Divider />
                            <DialogTitle
                                sx={{
                                    fontSize: "md",
                                    color: colors.primary,
                                    fontWeight: "normal",
                                }}
                            >
                                Registered Exams
                            </DialogTitle>
                            <Divider />
                            {availableExams.length > 0 && (
                                <List>
                                    {availableExams.map((exam) => (
                                        <ListItemButton
                                            key={exam.id}
                                            onClick={() =>
                                                navigate(
                                                    `/user/results/scores/${exam.examRegistrationId}`
                                                )
                                            }
                                        >
                                            Exam on {exam.examDateTime}
                                        </ListItemButton>
                                    ))}
                                </List>
                            )}

                            <Divider sx={{ mt: "auto" }} />

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems={"center"}
                                useFlexGap
                                spacing={1}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={LogOut}
                                    sx={{
                                        border: `2px solid ${colors.primary}`,
                                        color: colors.primary,
                                    }}
                                >
                                    Log Out
                                </Button>
                                <DialogTitle>{userInfo.firstName}</DialogTitle>
                            </Stack>
                        </Sheet>
                    </Drawer>
                </React.Fragment>
            </Box>
            <Outlet />
        </div>
    );
};

export default UserLayout;
