import { DummyProfile, Logo, LogoWhite } from '@/assets/landing/img';
import { NAVLINK } from '@/data/data';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface NavLink {
	id: string;
	name: string;
}

const NAV_HEIGHT = 80;

const Navbar = ({ hideMenu }: { hideMenu?: boolean }) => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [cssOnScroll, setCssOnScroll] = useState('');
	const [cssOnScrollService, setCssOnScrollService] = useState(false);
	const [activeMenu, setActiveMenu] = useState('home');

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const newCss = scrollTop > 0 ? 'shadow' : '';
			setCssOnScroll(newCss);

			NAVLINK.forEach((link) => {
				const element = document.getElementById(link.id);
				if (element) {
					const elementTop = element.offsetTop - NAV_HEIGHT;
					const elementBottom = elementTop + element.offsetHeight - NAV_HEIGHT;
					if (scrollTop >= elementTop && scrollTop <= elementBottom) {
						setActiveMenu(link.id);
					}
				}
			});

			const serviceElement = document.getElementById('service');
			if (serviceElement) {
				const targetPosition = serviceElement.getBoundingClientRect().top + window.scrollY;
				if (
					scrollTop > targetPosition - NAV_HEIGHT &&
					scrollTop < targetPosition + serviceElement.offsetHeight - NAV_HEIGHT
				) {
					setCssOnScrollService(true);
				} else {
					setCssOnScrollService(false);
				}
			} else {
				setCssOnScrollService(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const auth = useAuth();

	const handleNavLinkClick = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const offset = NAV_HEIGHT - 1;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		navigate('/sign-in');
	};

	const renderNavLinks = (links: NavLink[]) =>
		links.map((item) => (
			<li
				key={item.id}
				className={`hover:text-custom-green hover:cursor-pointer text-sm md:text-base min-w-24x ${
					activeMenu === item.id ? 'text-custom-green' : ''
				}`}
				onClick={() => {
					setIsOpen(false);
					handleNavLinkClick(item.id);
				}}
			>
				{item.name}
			</li>
		));

	return (
		<div
			className={`box-border flex justify-between items-center px-5 md:px-10 xl:px-[72px] w-full fixed top-0 left-0 right-0 z-50 ${cssOnScroll} transition-all ease-in-out ${
				cssOnScrollService
					? 'bg-custom-black text-white border-b border-white'
					: 'bg-white border-b border-transparent'
			}`}
			style={{ height: NAV_HEIGHT }}
		>
			{/* LOGO */}
			<img src={cssOnScrollService ? LogoWhite : Logo} alt="logo" className="h-[50px] w-[100px]" />

			{!hideMenu && (
				<>
					{/* MENU > lg */}
					<ul className="gap-x-4 items-center hidden md:flex">{renderNavLinks(NAVLINK)}</ul>

					{auth.isAuthenticated ? (
						<div className="hidden md:block">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="flex gap-x-2 items-center outline-none bg-green-200x">
										<img
											src={auth.imageUrl ?? DummyProfile}
											alt="user"
											className="w-8 h-8 rounded-full"
										/>
										<p
											className={` text-sm  ${cssOnScrollService ? 'text-white' : 'text-gray-700'}`}
										>
											{`${auth.firstName} ${auth.lastName}`}
										</p>
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>{`${auth.firstName} ${auth.lastName}`}</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Link to={'/profile'} className="w-full">
											Profil
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={handleLogout}>Keluar</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					) : (
						<Link to="/sign-in" className="hidden md:block">
							<button className="bg-custom-green text-white px-5 py-1.5 rounded-full">Masuk</button>
						</Link>
					)}

					{/* HUMBURGER MENU */}
					<div className="block md:hidden">
						<button className="text-lg" onClick={() => setIsOpen(true)}>
							<AiOutlineMenu />
						</button>
					</div>

					{/* MENU < lg */}
					<div
						className={`absolute top-0 ${
							isOpen ? 'right-0' : '-right-[100%]'
						} bg-white w-full h-screen block md:hidden p-5 transition-all text-black`}
					>
						<div className="flex justify-between flex-col h-full">
							<div className="flex justify-between">
								<ul className="flex md:hidden flex-col gap-y-4 bg-red-300x justify-start">
									{renderNavLinks(NAVLINK)}
								</ul>
								<div>
									<button className="rounded-full p-1" onClick={() => setIsOpen(false)}>
										<AiOutlineClose />
									</button>
								</div>
							</div>
							{/* LOGIN */}
							{auth.isAuthenticated ? (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<button className="flex gap-x-2 items-center outline-none bg-green-200x">
											<img
												src={auth.imageUrl ?? DummyProfile}
												alt="user"
												className="w-8 h-8 rounded-full"
											/>
											<p
												className={` text-sm  ${
													cssOnScrollService ? 'text-white' : 'text-gray-700'
												}`}
											>
												{`${auth.firstName} ${auth.lastName}`}
											</p>
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>{`${auth.firstName} ${auth.lastName}`}</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<Link to={'/profile'} className="w-full">
												Profil
											</Link>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={handleLogout}>Keluar</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<Link to="/sign-in" className="">
									<button className="bg-custom-green text-white px-5 py-1.5 rounded-full">
										Masuk
									</button>
								</Link>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Navbar;
