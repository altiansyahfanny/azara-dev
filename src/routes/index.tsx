import { Bars } from 'react-loader-spinner';

import Public from '@/layouts/Public';
import RequireAuth from '@/layouts/RequireAuth';

import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import Forbidden from '@/pages/common/Forbidden';
import NotFound from '@/pages/common/NotFound';
import LandingPage from '@/pages/landing-page';
import Test from '@/pages/panel/Testing';

import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import UserProfile from '@/pages/landing-page/UserProfile';

const Dashboard = lazy(() => import('@/pages/panel/Dashboard'));
const Attendance = lazy(() => import('@/pages/panel/Attendance'));
const Course = lazy(() => import('@/pages/panel/Course'));
const Cycle = lazy(() => import('@/pages/panel/Cycle'));
const Setting = lazy(() => import('@/pages/panel/Setting'));
const User = lazy(() => import('@/pages/panel/User'));
const Classroom = lazy(() => import('@/pages/panel/classroom/Classroom'));
const ClassroomId = lazy(() => import('@/pages/panel/classroom/ClassroomId'));
const Meeting = lazy(() => import('@/pages/panel/meeting/Meeting'));
const Profile = lazy(() => import('@/pages/panel/user/Profile'));

const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));

const SuspenseFallbackComponent = () => (
	<div className="grid place-content-center h-screen">
		<Bars
			visible={true}
			height={40}
			width={40}
			ariaLabel="hourglass-loading"
			wrapperStyle={{}}
			wrapperClass=""
			color={'rgb(156, 163, 175)'}
		/>
	</div>
);

const Router = () => {
	return (
		<Routes>
			<Route element={<Public />}>
				<Route path="/" element={<LandingPage />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/profile" element={<UserProfile />} />
			</Route>
			{/* <Route element={<PersistLogin />}>*/}
			<Route element={<RequireAuth allowedRoles={['admin', 'teacher']} />}>
				<Route
					element={
						<Suspense fallback={<SuspenseFallbackComponent />}>
							<DashboardLayout />
						</Suspense>
					}
				>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/user" element={<User />} />
					<Route path="/user/profile" element={<Profile />} />
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
