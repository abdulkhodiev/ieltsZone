import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Main from "../Main/Main";
import Layout from "../Layout/Layout";
import AdminLayout from "../Admin/AdminLayout";
import AdminMain from "../Admin/AdminMain";
import AdminMentors from "../Admin/AdminMentors";
import AdminExams from "../Admin/AdminExams";
import ExamCreation from "../Admin/Exams/ExamCreation";
import ExamParticipantsLayout from "../Admin/Exams/ExamParticipants/ExamParticipantsLayout";
import ExamParticipants from "../Admin/Exams/ExamParticipants/ExamParticipants";
import ExamApplied from "../Admin/Exams/ExamParticipants/ExamApplied";
import ExamAccepted from "../Admin/Exams/ExamParticipants/ExamAccepted";
import PaymentCheck from "../Admin/Exams/ExamParticipants/PaymentCheck";
import ExamCheck from "../Admin/Exams/ExamParticipants/ExamCheck";
import SectionCheck from "../Admin/Exams/ExamParticipants/SectionCheck";
import UserMain from "../User/UserMain";

import UserExams from "../User/UserExams";
import UserResults from "../User/UserResults";
import UserApply from "../User/UserApply";
import UserSectionScore from "../User/UserSectionScore";
import UserScoreCheck from "../User/UserScoreCheck";
import Login from "../Main/Login";
import Register from "../Main/Register";
import NotFound from "../Main/NotFound";
import UserLayout from "../User/UserLayout";

export const router = createBrowserRouter([
    {
        element: <Layout />,

        children: [
            { index: true, element: <Main /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "not-found", element: <NotFound /> },
            {
                path: "admin",
                element: (
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: "",
                        element: <AdminMain />,
                        children: [
                            {
                                index: true,
                                path: "mentors",
                                element: <AdminMentors />,
                            },
                            { path: "exams", element: <AdminExams /> },
                        ],
                    },

                    { path: "exams/create", element: <ExamCreation /> },
                    { path: "exams/:examId/edit", element: <ExamCreation /> },
                    {
                        path: "exams/:examId/participants",
                        element: <ExamParticipantsLayout />,
                        children: [
                            {
                                path: "",
                                element: <ExamParticipants />,
                                children: [
                                    {
                                        path: "applied",
                                        element: <ExamApplied />,
                                    },
                                    {
                                        path: "accepted",
                                        element: <ExamAccepted />,
                                    },
                                ],
                            },

                            {
                                path: "applied/:rowId",
                                element: <PaymentCheck />,
                            },
                            { path: "accepted/:rowId", element: <ExamCheck /> },
                            {
                                path: "accepted/:rowId/:section",
                                element: <SectionCheck />,
                            },
                        ],
                    },
                ],
            },
            {
                path: "user",
                element: <UserLayout />,
                children: [
                    {
                        path: "",
                        element: <UserMain />,
                        children: [
                            {
                                index: true,
                                path: "exams",
                                element: <UserExams />,
                            },
                            { path: "results", element: <UserResults /> },
                        ],
                    },

                    { path: "exams/apply/:examId", element: <UserApply /> },
                    {
                        path: "results/scores/:examRegistrationId",
                        element: <UserScoreCheck />,
                    },
                    {
                        path: "results/scores/:examRegistrationId/:section",
                        element: <UserSectionScore />,
                    },
                ],
            },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default router;
