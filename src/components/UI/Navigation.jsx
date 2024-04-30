import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/joy/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import ListItemButton from "@mui/joy/ListItemButton";
import { useNavigate } from "react-router-dom";
import { colors } from "../../constants/colors";
import { getExams, getMe } from "../../utils/api/requests/add-exams";
import { format } from "date-fns";
import logo from "../../assets/logo.jpg";
import Cookies from "js-cookie";

const Navigation = () => {
    const navigate = useNavigate();
    const [availableExams, setAvailableExams] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const location = useLocation();

    const mentorsDynamicStyles = location.pathname.includes("admin/mentors")
        ? {
              bgcolor: colors.primary,
              color: "white",
              borderRadius: "0.6rem",
          }
        : {};

    const examsDynamicStyles = location.pathname.includes("admin/exams")
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
    const resultsDynamicStyles = location.pathname.includes(
        "admin/results-analysis"
    )
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
    const paymentDynamicStyles = location.pathname.includes(
        "admin/payments-analysis"
    )
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
            const res = await getExams();

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

    const fetchUserInfo = async () => {
        try {
            const res = await getMe();
            setUserInfo(res);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    const LogOut = () => {
        Cookies.remove("token", { path: "/" });
        navigate("/");
    };
    useEffect(() => {
        fetchExams();
    }, [fetchExams]);

    return (
        <Sheet
            sx={{
                borderRadius: "md",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
                overflow: "auto",
                bgcolor: "white",
            }}
        >
            <DialogTitle
                sx={{
                    fontSize: "2rem",
                    display: "flex",
                    color: colors.primary,
                    gap: 1,
                    mb: 2,
                    alignItems: "center",
                }}
            >
                <img
                    src={logo}
                    style={{
                        width: "4rem",
                        borderRadius: "0.4rem",
                    }}
                    alt=""
                />
                IELTSZONE
            </DialogTitle>

            <List
                size="lg"
                component="nav"
                sx={{
                    gap: "0.5rem",
                    flex: "none",
                    fontSize: "xl",
                    "& > div": { justifyContent: "center" },
                }}
            >
                <ListItemButton
                    sx={{
                        border: `1px solid ${colors.primary}`,
                        borderRadius: "0.6rem",
                        ...mentorsDynamicStyles,
                        ":hover": {
                            borderRadius: "0.6rem",

                            bgcolor: colors.primary,
                            color: "white",
                        },
                    }}
                    onClick={() => navigate("/admin/mentors")}
                >
                    Admins
                </ListItemButton>
                <ListItemButton
                    sx={{
                        borderRadius: "0.6rem",
                        border: `1px solid ${colors.primary}`,
                        ...examsDynamicStyles,
                        ":hover": {
                            bgcolor: colors.primary,
                            color: "white",
                        },
                    }}
                    onClick={() => navigate("/admin/exams")}
                >
                    Exams
                </ListItemButton>
                <ListItemButton
                    sx={{
                        borderRadius: "0.6rem",
                        border: `1px solid ${colors.primary}`,
                        ...resultsDynamicStyles,
                        ":hover": {
                            bgcolor: colors.primary,
                            color: "white",
                        },
                    }}
                    onClick={() => navigate("/admin/result-analysis")}
                >
                    Result Analysis
                </ListItemButton>
                <ListItemButton
                    sx={{
                        borderRadius: "0.6rem",
                        border: `1px solid ${colors.primary}`,
                        ...paymentDynamicStyles,
                        ":hover": {
                            bgcolor: colors.primary,
                            color: "white",
                        },
                    }}
                    onClick={() => navigate("/admin/payment-analysis")}
                >
                    Payment Analysis
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
                Available Exams
            </DialogTitle>
            <Divider />
            {availableExams.length > 0 && (
                <List>
                    {availableExams.map((exam) => (
                        <ListItemButton
                            key={exam.id}
                            onClick={() =>
                                navigate(
                                    `/admin/exams/${exam.id}/participants/applied`
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
                alignItems="center"
                useFlexGap
                spacing={1}
            >
                <Button
                    variant="outlined"
                    sx={{
                        border: `2px solid ${colors.primary}`,
                        color: colors.primary,
                    }}
                    onClick={LogOut}
                >
                    Log Out
                </Button>
                <DialogTitle>{userInfo.firstName}</DialogTitle>
            </Stack>
        </Sheet>
    );
};

export default Navigation;
