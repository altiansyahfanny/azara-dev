import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
	BookText,
	CalendarRange,
	Home,
	ListChecks,
	Package,
	Package2,
	Presentation,
	Settings,
	Users,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NAVLINK = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: Home,
	},
	{
		name: 'Pengguna',
		href: '/user',
		icon: Users,
	},
	{
		name: 'Mata Pelajaran',
		href: '/course',
		icon: BookText,
	},
	{
		name: 'Tahun Ajaran',
		href: '/cycle',
		icon: CalendarRange,
	},
	{
		name: 'Kelas',
		href: '/classroom',
		icon: Package,
	},
	{
		name: 'Meeting',
		href: '/meeting',
		icon: Presentation,
	},
	{
		name: 'Kehadiran',
		href: '/attendance',
		icon: ListChecks,
	},
];

const Sidebar = () => {
	const location = useLocation();
	const currentPath = location.pathname;

	const renderNavLink = () => {
		return NAVLINK.map((link, i) => {
			return (
				<Tooltip key={i}>
					<TooltipTrigger asChild>
						<Link
							to={link.href}
							className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
								currentPath === link.href
									? 'bg-accent text-accent-foreground'
									: 'text-muted-foreground'
							}`}
						>
							<link.icon className="h-5 w-5" />
							<span className="sr-only">{link.name}</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">{link.name}</TooltipContent>
				</Tooltip>
			);
		});
	};
	return (
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 sm:py-5 justify-between min-h-screen">
				<div className="flex flex-col items-center gap-4 px-2">
					<Link
						to="#"
						className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
					>
						<Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
						<span className="sr-only">Acme Inc</span>
					</Link>
					{renderNavLink()}
				</div>

				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to={'/setting'}
							className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
								currentPath === '/setting'
									? 'bg-accent text-accent-foreground'
									: 'text-muted-foreground'
							}`}
						>
							<Settings className="h-5 w-5" />
							<span className="sr-only">Pengaturan</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Pengaturan</TooltipContent>
				</Tooltip>
			</nav>
			<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to="#"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						>
							<Settings className="h-5 w-5" />
							<span className="sr-only">Settings</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Settings</TooltipContent>
				</Tooltip>
			</nav>
		</aside>
	);
};

export default Sidebar;
