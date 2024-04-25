import React, { useEffect, useState, useRef } from "react";
import {
    Typography,
    Stack,
    Box,
    Button,
    Modal,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,
    ButtonGroup,
} from "@mui/material";
import { colors } from "../../constants/colors";
import { Link, useNavigate } from "react-router-dom";
import {
    Delete,
    Edit,
    PeopleAlt,
    Info,
    ArrowDropDown,
} from "@mui/icons-material";
import {
    getExams,
    deleteExams,
    examInformation,
} from "../../utils/api/requests/add-exams";
import Accordion from "../UI/Accordion";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem",
    width: "45%",
    borderRadius: "0.6rem",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const AdminExams = () => {
    const [exams, setExams] = useState([]);
    const [examInfo, setExamInfo] = useState({});
    const [open, setOpen] = useState(false);
    const [buttonOpen, setButtonOpen] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const refs = useRef({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await getExams();
            setExams(
                response.map((exam) => ({
                    ...exam,
                    formattedDate: formatDate(exam.examDateTime),
                }))
            );
            response.forEach((exam) => {
                refs.current[exam.id] = React.createRef();
            });
        } catch (error) {
            console.error("Failed to fetch exams:", error);
        }
    };

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
        )}-${String(date.getDate()).padStart(2, "0")}`;
    };

    const handleDelete = async (examId) => {
        try {
            await deleteExams(examId);
            fetchExams();
        } catch (error) {
            console.error("Failed to delete exam:", error);
        }
    };

    const getExamInformation = async (examId) => {
        try {
            const response = await examInformation(examId);
            setExamInfo({
                ...response,
                createdDate: formatDate(response.createdDate),
                updatedAt: formatDate(response.updatedAt),
            });
            setOpen(true);
        } catch (error) {
            console.error("Failed to get exam information:", error);
        }
    };

    const handleToggle = (examId) => {
        setActiveId(examId);
        setButtonOpen((prev) => !prev);
    };

    const handleButtonClose = () => {
        setButtonOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            padding="0.5rem"
            sx={{
                width: { xs: "100%", sm: "90%", md: "75%" },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Link to="/admin/exams/create">
                    <Button
                        sx={{
                            my: "1rem",
                            bgcolor: colors.primary,
                            color: "white",
                            borderRadius: "0.7rem",
                            ":hover": { bgcolor: colors.primary },
                        }}
                        variant="contained"
                    >
                        + Add Exam
                    </Button>
                </Link>
                {exams.map((exam) => (
                    <Accordion
                        key={exam.id}
                        regionName={exam.location.split(",")[0]}
                        price={exam.price}
                        examTime={exam.examDateTime.slice(11, 16)}
                        examDate={exam.formattedDate}
                        locationUrl={exam.locationUrl}
                        details={exam.details}
                        fullRegionName={exam.location}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: "0.5rem",
                                justifyContent: "end",
                            }}
                        >
                            <ButtonGroup
                                variant="contained"
                                ref={refs.current[exam.id]}
                                aria-label="split button"
                                sx={{
                                    borderRadius: "0.6rem",
                                    overflow: "hidden",
                                    bgcolor: "white",
                                }}
                            >
                                <Button
                                    sx={{
                                        bgcolor: "#074173",
                                        color: "white",
                                        border: "none !important",
                                        padding: {
                                            xs: "0.2rem 0.5rem",
                                            sm: "0.3rem 0.8rem",
                                            md: "0.4rem 1rem",
                                        },
                                        fontSize: {
                                            xs: "0.6rem",
                                            sm: "0.8rem",
                                            md: "1rem",
                                        },

                                        ":hover": {
                                            bgcolor: "#074173",
                                            color: "white",
                                        },
                                    }}
                                    onClick={() => handleToggle(exam.id)}
                                >
                                    ACTIONS
                                    <ArrowDropDown />
                                </Button>
                            </ButtonGroup>
                            <Popper
                                open={buttonOpen && activeId === exam.id}
                                anchorEl={refs.current[exam.id].current}
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === "bottom"
                                                    ? "center top"
                                                    : "center bottom",
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener
                                                onClickAway={handleButtonClose}
                                            >
                                                <MenuList
                                                    id="split-button-menu"
                                                    autoFocusItem
                                                >
                                                    <MenuItem
                                                        onClick={() =>
                                                            getExamInformation(
                                                                exam.id
                                                            )
                                                        }
                                                        sx={{
                                                            display: "flex",
                                                            gap: "0.5rem",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Info /> Info
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={() =>
                                                            handleDelete(
                                                                exam.id
                                                            )
                                                        }
                                                        sx={{
                                                            display: "flex",
                                                            gap: "0.5rem",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Delete /> Delete
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/exams/${exam.id}/edit`
                                                            )
                                                        }
                                                        sx={{
                                                            display: "flex",
                                                            gap: "0.5rem",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Edit /> Edit
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                            <Button
                                component={Link}
                                to={`/admin/exams/${exam.id}/participants/applied`}
                                variant="contained"
                                sx={{
                                    bgcolor: colors.primary,
                                    borderRadius: "0.7rem",
                                    padding: {
                                        xs: "0.2rem 0.5rem",
                                        sm: "0.3rem 0.8rem",
                                        md: "0.4rem 1rem",
                                    },
                                    fontSize: {
                                        xs: "0.6rem",
                                        sm: "0.8rem",
                                        md: "0.9rem",
                                        lg: "0.9rem",
                                    },
                                    gap: "0.3rem",
                                }}
                            >
                                <PeopleAlt sx={{ fontSize: "1.2rem" }} />{" "}
                                Participants
                            </Button>
                        </Box>
                        <Modal
                            open={open && activeId === exam.id}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Exam Information
                                </Typography>
                                <Typography id="modal-modal-description">
                                    Created by:{" "}
                                    <strong>{examInfo.createdBy}</strong>
                                </Typography>
                                <Typography id="modal-modal-description">
                                    Created on:{" "}
                                    <strong>{examInfo.createdDate}</strong>
                                </Typography>
                                <Typography id="modal-modal-description">
                                    Updated by:{" "}
                                    <strong>{examInfo.updatedBy}</strong>
                                </Typography>
                                <Typography id="modal-modal-description">
                                    Updated on:{" "}
                                    <strong>{examInfo.updatedAt}</strong>
                                </Typography>
                            </Box>
                        </Modal>
                    </Accordion>
                ))}
            </Box>
        </Stack>
    );
};

export default AdminExams;
