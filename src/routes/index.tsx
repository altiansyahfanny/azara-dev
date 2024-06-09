import DashboardLayout from '@/layouts/DashboardLayout';
import RequireAuth from '@/layouts/RequireAuth';
import SignUp from '@/pages/auth/SignUp';
import LandingPage from '@/pages/landing-page';
import Classroom from '@/pages/panel/classroom/Classroom';
import Course from '@/pages/panel/Course';
import Cycle from '@/pages/panel/Cycle';
import Dashboard from '@/pages/panel/Dashboard';
import User from '@/pages/panel/User';
import { Route, Routes } from 'react-router-dom';
import Public from '../layouts/Public';
import SignIn from '../pages/auth/SignIn';
import Forbidden from '../pages/common/Forbidden';
import NotFound from '../pages/common/NotFound';
import ClassroomId from '@/pages/panel/classroom/ClassroomId';
import Meeting from '@/pages/panel/meeting/Meeting';
import Attendance from '@/pages/panel/Attendance';
import { Setting } from '@/pages/panel/Setting';
import Test from '@/pages/panel/Testing';

const Router = () => {
	return (
		<Routes>
			<Route element={<Public />}>
				<Route path="/" element={<LandingPage />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/sign-up" element={<SignUp />} />
			</Route>
			{/* <Route element={<PersistLogin />}>*/}
			<Route element={<RequireAuth allowedRoles={['admin']} />}>
				<Route element={<DashboardLayout />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/user" element={<User />} />
					<Route path="/course" element={<Course />} />
					<Route path="/cycle" element={<Cycle />} />
					<Route path="/classroom" element={<Classroom />} />
					<Route path="/classroom/:id" element={<ClassroomId />} />
					<Route path="/meeting" element={<Meeting />} />
					<Route path="/attendance" element={<Attendance />} />
					<Route path="/setting" element={<Setting />} />
					<Route path="/test" element={<Test />} />
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
