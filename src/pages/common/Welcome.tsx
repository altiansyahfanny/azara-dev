import { Link } from 'react-router-dom';

const Welcome = () => {
	return (
		<div className="grid place-content-center min-h-screen">
			<h1 className="text-4xl font-bold">Welcome</h1>
			<Link to={'/sign-in'} className="text-blue-500">
				Login
			</Link>
		</div>
	);
};

export default Welcome;
