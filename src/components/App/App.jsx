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
} from "../index";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
    return (
        <Box>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />

                    <Route path="/admin" element={<AdminMain />}>
                        <Route path="mentors" element={<AdminMentors />} />{" "}
                        <Route path="exams" element={<AdminExams />} />{" "}
                    </Route>
                    <Route
                        path="/admin/exams/create"
                        element={<ExamCreation />}
                    />
                    <Route
                        path="/admin/exams/:examId/edit"
                        element={<ExamCreation />}
                    />
                    <Route
                        path="/admin/exams/:examId/participants"
                        element={<ExamParticipants />}
                    >
                        <Route path="applied" element={<ExamApplied />} />
                        <Route path="accepted" element={<ExamAccepted />} />
                    </Route>
                    <Route
                        path="/admin/exams/:examId/participants/applied/:rowId"
                        element={<PaymentCheck />}
                    />
                    <Route
                        path="/admin/exams/:examId/participants/accepted/:rowId"
                        element={<ExamCheck />}
                    />
                    <Route
                        path="/admin/exams/:examId/participants/accepted/:rowId/:section"
                        element={<SectionCheck />}
                    />
                </Route>
            </Routes>
        </Box>
    );
}

export default App;
