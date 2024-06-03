import { Route, Routes } from 'react-router-dom';
import Public from '../layouts/Public';
import SignIn from '../pages/auth/SignIn';
import Forbidden from '../pages/common/Forbidden';
import NotFound from '../pages/common/NotFound';
import DashboardLayout from '@/layouts/DashboardLayout';
import Dashboard from '@/pages/panel/Dashboard';
import Products from '@/pages/panel/Products';
import Orders from '@/pages/panel/Orders';
import SignUp from '@/pages/auth/SignUp';
import LandingPage from '@/pages/landing-page';
import RequireAuth from '@/layouts/RequireAuth';
import User from '@/pages/panel/User';
import Course from '@/pages/panel/Course';
import Cycle from '@/pages/panel/Cycle';

const Router = () => {
	return (
		<Routes>
			<Route element={<Public />}>
				<Route path="/" element={<LandingPage />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
			</Route>
			{/* <Route element={<PersistLogin />}>*/}
			<Route element={<RequireAuth allowedRoles={['admin']} />}>
				<Route element={<DashboardLayout />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/user" element={<User />} />
					<Route path="/course" element={<Course />} />
					<Route path="/cycle" element={<Cycle />} />
					<Route path="/products" element={<Products />} />
					<Route path="/orders" element={<Orders />} />
				</Route>
			</Route>
			{/* 
			</Route> */}
			<Route path="/forbidden" element={<Forbidden />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Router;
