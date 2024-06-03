import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type RequireAuthProps = {
	allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
	const location = useLocation();
	const auth = useAuth();

	console.log('RequireAuth -> auth : ', auth);

	let content;
	if (auth.role) {
		if (allowedRoles.includes(auth.role)) {
			content = <Outlet />;
		} else {
			// when user has been login but deny to visit the page
			content = <Navigate to="/forbidden" state={{ from: location }} replace />;
		}
	} else {
		// when not login and try to access page
		content = <Navigate to="/sign-in" state={{ from: location }} replace />;
	}

	return content;
};
export default RequireAuth;
