import { jwtDecode } from 'jwt-decode';
// import { useAppSelector } from '../store/store';

type DecodedType = {
	address: string;
	email: string;
	exp: number;
	firstName: string;
	iat: number;
	id: number;
	imageUrl: string;
	iss: string;
	lastName: string;
	role: string;
};

const useAuth = () => {
	// const { accessToken } = useAppSelector((state) => state.auth);
	const token = localStorage.getItem('token');

	let isAdmin = false;

	if (token) {
		const decoded: DecodedType = jwtDecode(token);
		const { email, role, firstName, lastName, imageUrl } = decoded;

		isAdmin = role === 'Admin';

		return { isAuthenticated: true, imageUrl, email, isAdmin, role: role, firstName, lastName };
	}

	return {
		isAuthenticated: false,
		imageUrl: '',
		email: '',
		isAdmin,
		role: '',
		firstName: '',
		lastName: '',
	};
};
export default useAuth;
