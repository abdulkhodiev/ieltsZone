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
import { Link } from "react-router-dom";
import { Delete, PeopleAlt, Info, ArrowDropDown } from "@mui/icons-material";
import {
    getAllExams,
    examInformation,
    deleteFeedbackFolders,
} from "../../utils/api/requests/add-exams";
import Accordion from "../UI/Accordion";
import DeleteConfirmation from "../UI/DeleteConfimation";

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

const ArchiveExams = () => {
    const [exams, setExams] = useState([]);
    const [examInfo, setExamInfo] = useState({});
    const [open, setOpen] = useState(false);
    const [buttonOpen, setButtonOpen] = useState(false);
    const [activeId, setActiveId] = useState(null);

    const refs = useRef({});

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await getAllExams();
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

    const handleDeleteFeedbackFiles = async (examId) => {
        try {
            await deleteFeedbackFolders(examId);
            fetchExams();
        } catch (error) {
            console.error("Failed to delete feedback files:", error);
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
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={500}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                padding="0.5rem"
                sx={{
                    width: { xs: "100%", lg: "90%" },
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
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        py={{ xs: 2, md: 0 }}
                        px={{ xs: 1, md: 0 }}
                    >
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={{ xs: 1, md: 3 }}
                        >
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                gap={"0.5rem"}
                            >
                                <Box
                                    sx={{
                                        width: "1rem",
                                        height: "1rem",
                                        bgcolor: "#E55263",
                                        borderRadius: "50%",
                                    }}
                                ></Box>
                                <Typography
                                    color={colors.primary}
                                    fontWeight={"bold"}
                                >
                                    All
                                </Typography>
                            </Stack>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                gap={"0.5rem"}
                            >
                                <Box
                                    sx={{
                                        width: "1rem",
                                        height: "1rem",
                                        bgcolor: "#69A2B0",
                                        borderRadius: "50%",
                                    }}
                                ></Box>
                                <Typography
                                    color={colors.primary}
                                    fontWeight={"bold"}
                                >
                                    Accepted
                                </Typography>
                            </Stack>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                gap={"0.5rem"}
                            >
                                <Box
                                    sx={{
                                        width: "1rem",
                                        height: "1rem",
                                        bgcolor: "#659157",
                                        borderRadius: "50%",
                                    }}
                                ></Box>
                                <Typography
                                    color={colors.primary}
                                    fontWeight={"bold"}
                                >
                                    Marked
                                </Typography>
                            </Stack>
                        </Stack>
                        <Button
                            component={Link}
                            to="/admin/exams"
                            sx={{
                                ml: "auto",
                                my: "1rem",
                                bgcolor: "red",
                                color: "white",
                                borderRadius: "0.7rem",
                                fontWeight: "bold",
                                ":hover": { bgcolor: "red" },
                            }}
                            variant="contained"
                        >
                            Close
                        </Button>
                    </Stack>

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
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#E55263",
                                    }}
                                >
                                    {exam.countOfRegistrations || 0}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "bold",
                                        ml: "0.5rem",
                                        color: "#69A2B0",
                                    }}
                                >
                                    {exam.countOfAcceptedRegistrations || 0}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "bold",
                                        mx: "0.5rem",
                                        color: "#659157",
                                    }}
                                >
                                    {exam.countOfMarkedRegistrations || 0}
                                </Typography>
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
                                            zIndex: 1,
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
                                    sx={{ zIndex: 99 }}
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
                                                    onClickAway={
                                                        handleButtonClose
                                                    }
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

                                                        <DeleteConfirmation
                                                            id={exam.id}
                                                            fetchExams={
                                                                fetchExams
                                                            }
                                                        />

                                                        <MenuItem
                                                            onClick={() =>
                                                                handleDeleteFeedbackFiles(
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
                                                            <Delete />
                                                            Delete Files
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
        </Grow>
    );
};

export default ArchiveExams;
