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
import logo from "../../assets/logo.jpg";
import Cookies from "js-cookie";
import { useContext } from "react";
import { DataContext } from "../../context/Context";

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userData, availableExams } = useContext(DataContext);

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
        "admin/result-analysis"
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

    const LogOut = () => {
        Cookies.remove("token", { path: "/" });
        Cookies.remove("role", { path: "/" });
        navigate("/");
    };

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
                        width: {
                            xs: "auto",
                            sm: "auto",
                            md: "auto",
                            lg: "100%",
                        },
                    }}
                    onClick={LogOut}
                >
                    Log Out
                </Button>
                <DialogTitle
                    sx={{
                        display: {
                            xs: "flex",
                            sm: "flex",
                            md: "flex",
                            lg: "none",
                        },
                    }}
                >
                    {userData.firstName}
                </DialogTitle>
            </Stack>
        </Sheet>
    );
};

export default Navigation;
