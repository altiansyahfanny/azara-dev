import Header from '@/components/core/Header';
import Sidebar from '@/components/core/Sidebar';
import PageError from '@/components/page-error';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
	return (
		<TooltipProvider>
			<div className="flex min-h-screen w-full flex-col bg-white">
				<Sidebar />
				<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-blue-400x min-h-screen">
					<Header />
					<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 bg-green-200x max-w-full w-full relative overflow-hidden bg-green-200x">
						<ErrorBoundary
							FallbackComponent={PageError}
							onReset={() => {
								// Optional: handle reset logic, e.g., reset form fields or state
							}}
						>
							<Outlet />
						</ErrorBoundary>
					</main>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default DashboardLayout;
