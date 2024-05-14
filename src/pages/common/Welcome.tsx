import { Link } from 'react-router-dom';

const Welcome = () => {
	return (
		<div>
			Welcome, goto <Link to={'/sign-in'}>Login</Link>
		</div>
	);
};

export default Welcome;
