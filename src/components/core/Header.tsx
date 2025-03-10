import { useGetUserDetailQuery } from '@/api/userApi';
import { DummyProfile } from '@/assets/dashboard/img';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const routes = [
	{ path: '/', breadcrumb: null },
	{ path: '/dashboard', breadcrumb: 'Dahsboard' },
	{ path: '/course', breadcrumb: 'Mata Pelajaran' },
	{ path: '/cycle', breadcrumb: 'Tahun Ajaran' },
	{ path: '/user', breadcrumb: 'User' },
	{ path: '/user/profile', breadcrumb: 'Profile' },
	{ path: '/classroom', breadcrumb: 'Kelas' },
	{ path: 'classroom/:id', breadcrumb: 'Detil' },
	{ path: 'meeting', breadcrumb: 'Meeting' },
	{ path: 'attendance', breadcrumb: 'Kehadiran' },
	{ path: 'setting', breadcrumb: 'Pengaturan' },
];

const Header = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		navigate('/sign-in');
	};

	const breadcrumbs = useBreadcrumbs(routes);

	const { data: user, isLoading, isError, isSuccess } = useGetUserDetailQuery();

	let userContent;
	if (isLoading) userContent = 'Loading...';
	if (isError) userContent = 'Error';
	if (isSuccess) userContent = `${user.data.firstName} ${user.data.lastName}`;

	return (
		<header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b px-4 pb-4 sm:static sm:h-auto sm:bg-transparent sm:px-6">
			<Breadcrumb>
				<BreadcrumbList>
					{breadcrumbs.map(({ breadcrumb, match }, index) => {
						const isLast = breadcrumbs.length - 1 === index;

						if (breadcrumb) {
							if (!isLast) {
								return (
									<div className="flex items-center gap-2" key={match.pathname}>
										<BreadcrumbItem>
											<BreadcrumbLink asChild>
												<Link to={match.pathname}>{breadcrumb}</Link>
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
									</div>
								);
							}

							return (
								<BreadcrumbLink asChild key={match.pathname}>
									<BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
								</BreadcrumbLink>
							);
						}

						return null;
					})}
				</BreadcrumbList>
			</Breadcrumb>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="overflow-hidden rounded-full"
						// onClick={() => setIsOpen(true)}
					>
						<img
							src={user?.data.imageUrl ?? DummyProfile}
							alt="Avatar"
							className="overflow-hidden rounded-full object-cover w-9 aspect-square object-center"
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					//  onClick={() => setIsOpen(false)}
				>
					<DropdownMenuLabel>{userContent}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Link to={'/user/profile'} className=" w-full">
							Profil
						</Link>
					</DropdownMenuItem>
					{/* <DropdownMenuItem>
						<Link to={'/setting'}>Pengaturan</Link>
					</DropdownMenuItem> */}
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
						Keluar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};

export default Header;
