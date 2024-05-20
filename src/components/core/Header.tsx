import { Home, LineChart, Package, Package2, PanelLeft, ShoppingCart, Users2 } from 'lucide-react';

import { ProfileImg } from '@/assets/dashboard/img';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate('/sign-in');
	};
	return (
		<header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b  px-4 pb-4 sm:static sm:h-auto sm:bg-transparent sm:px-6">
			<div>
				<Sheet>
					<SheetTrigger asChild>
						<Button size="icon" variant="outline" className="sm:hidden">
							<PanelLeft className="h-5 w-5" />
							<span className="sr-only">Toggle Menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="sm:max-w-xs">
						<nav className="grid gap-6 text-lg font-medium">
							<Link
								to="#"
								className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
							>
								<Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
								<span className="sr-only">Acme Inc</span>
							</Link>
							<Link
								to="#"
								className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<Home className="h-5 w-5" />
								Dashboard
							</Link>
							<Link
								to="#"
								className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<ShoppingCart className="h-5 w-5" />
								Orders
							</Link>
							<Link to="#" className="flex items-center gap-4 px-2.5 text-foreground">
								<Package className="h-5 w-5" />
								Products
							</Link>
							<Link
								to="#"
								className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<Users2 className="h-5 w-5" />
								Customers
							</Link>
							<Link
								to="#"
								className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<LineChart className="h-5 w-5" />
								Settings
							</Link>
						</nav>
					</SheetContent>
				</Sheet>
				<Breadcrumb className="hidden md:flex">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to="#">Dashboard</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon" className="overflow-hidden rounded-full">
						<img
							src={ProfileImg}
							width={36}
							height={36}
							alt="Avatar"
							className="overflow-hidden rounded-full"
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};

export default Header;
