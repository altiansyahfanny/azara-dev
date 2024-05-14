import { Home, Package, Package2, Settings, ShoppingCart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, useLocation } from 'react-router-dom';

const NAVLINK = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: Home,
	},
	{
		name: 'Products',
		href: '/products',
		icon: Package,
	},
	{
		name: 'Orders',
		href: '/orders',
		icon: ShoppingCart,
	},
];

const Sidebar = () => {
	const location = useLocation();

	const renderNavLink = () => {
		const currentPath = location.pathname;
		return NAVLINK.map((link) => {
			return (
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to={link.href}
							className={`flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8 ${
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
			<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
				<Link
					to="#"
					className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
				>
					<Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
					<span className="sr-only">Acme Inc</span>
				</Link>
				{renderNavLink()}
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
