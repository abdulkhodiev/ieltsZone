import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
    Main,
    Layout,
    AdminMain,
    AdminMentors,
    AdminExams,
    ExamCreation,
    ExamParticipants,
    ExamAccepted,
    ExamApplied,
    PaymentCheck,
    ExamCheck,
    SectionCheck,
    UserMain,
    AdminLayout,
    ExamParticipantsLayout,
    UserExams,
    UserResults,
    UserApply,
    UserSectionScore,
    UserScoreCheck,
    Login,
    Register,
} from "../index";

import "./App.css";
import UserLayout from "../User/UserLayout";
import Accordion from "../UI/Accordion";

function App() {
    return (
        <Box>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="accordion" element={<Accordion />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route path="admin" element={<AdminLayout />}>
                        <Route element={<AdminMain />}>
                            <Route path="mentors" element={<AdminMentors />} />
                            <Route path="exams" element={<AdminExams />} />
                        </Route>

                        <Route path="exams/create" element={<ExamCreation />} />
                        <Route
                            path="exams/:examId/edit"
                            element={<ExamCreation />}
                        />
                        <Route
                            path="exams/:examId/participants"
                            element={<ExamParticipantsLayout />}
                        >
                            <Route element={<ExamParticipants />}>
                                <Route
                                    path="applied"
                                    element={<ExamApplied />}
                                />
                                <Route
                                    path="accepted"
                                    element={<ExamAccepted />}
                                />
                            </Route>

                            <Route
                                path="applied/:rowId"
                                element={<PaymentCheck />}
                            />
                            <Route
                                path="accepted/:rowId"
                                element={<ExamCheck />}
                            />
                            <Route
                                path="accepted/:rowId/:section"
                                element={<SectionCheck />}
                            />
                        </Route>
                    </Route>

                    <Route path="user" element={<UserLayout />}>
                        <Route element={<UserMain />}>
                            <Route path="exams" element={<UserExams />} />
                            <Route path="results" element={<UserResults />} />
                        </Route>
                        <Route
                            path="exams/apply/:examId"
                            element={<UserApply />}
                        />
                        <Route
                            path="results/scores/:examRegistrationId"
                            element={<UserScoreCheck />}
                        />
                        <Route
                            path="results/scores/:examRegistrationId/:section"
                            element={<UserSectionScore />}
                        />
                    </Route>
                </Route>
            </Routes>
        </Box>
    );
}

export default App;
