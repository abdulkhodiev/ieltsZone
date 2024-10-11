import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const role = Cookies.get("role");

	if (role !== "ADMIN") {
		return <Navigate to='/not-found' replace />;
	}

	return children;
};

export default ProtectedRoute;
