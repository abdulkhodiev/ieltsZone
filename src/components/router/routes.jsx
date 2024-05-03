import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import AdminExams from "../Admin/AdminExams";
import AdminLayout from "../Admin/AdminLayout";
import AdminMain from "../Admin/AdminMain";
import AdminMentors from "../Admin/AdminMentors";
import ExamCreation from "../Admin/Exams/ExamCreation";
import ExamAccepted from "../Admin/Exams/ExamParticipants/ExamAccepted";
import ExamApplied from "../Admin/Exams/ExamParticipants/ExamApplied";
import ExamCheck from "../Admin/Exams/ExamParticipants/ExamCheck";
import ExamParticipants from "../Admin/Exams/ExamParticipants/ExamParticipants";
import ExamParticipantsLayout from "../Admin/Exams/ExamParticipants/ExamParticipantsLayout";
import PaymentCheck from "../Admin/Exams/ExamParticipants/PaymentCheck";
import SectionCheck from "../Admin/Exams/ExamParticipants/SectionCheck";
import Layout from "../Layout/Layout";
import Main from "../Main/Main";
import UserMain from "../User/UserMain";

import ResultAnalysis from "../Admin/ResultAnalysis";
import ForgetPassword from "../Main/ForgetPassword";
import Login from "../Main/Login";
import NotFound from "../Main/NotFound";
import Register from "../Main/Register";
import OTP from "../Main/sms";
import UserApply from "../User/UserApply";
import UserExams from "../User/UserExams";
import UserLayout from "../User/UserLayout";
import UserResults from "../User/UserResults";
import UserScoreCheck from "../User/UserScoreCheck";
import UserSectionScore from "../User/UserSectionScore";

import { DataProvider } from "../../context/Context";
import { PaymentAnalysis } from "../Admin/PaymentAnalysis";

export const router = createBrowserRouter([
	{
		element: <Layout />,

		children: [
			{ index: true, element: <Main /> },
			{ path: "login", element: <Login /> },
			{ path: "register", element: <Register /> },
			{ path: "sms", element: <OTP /> },
			{ path: "forget-password", element: <ForgetPassword /> },
			{ path: "not-found", element: <NotFound /> },
			{
				path: "admin",
				element: (
					<DataProvider>
						<ProtectedRoute>
							<AdminLayout />
						</ProtectedRoute>
					</DataProvider>
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
							{
								path: "result-analysis",
								element: <ResultAnalysis />,
							},
							{
								path: "payment-analysis",
								element: <PaymentAnalysis />,
							},
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
