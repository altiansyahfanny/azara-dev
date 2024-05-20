import { NAVLINK } from '@/data/data';
import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Logo, LogoWhite } from '@/assets/landing/img';

interface NavLink {
	id: string;
	name: string;
}

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [cssOnScroll, setCssOnScroll] = useState('');
	const [cssOnScrollPaket, setCssOnScrollService] = useState(false);
	const [activeMenu, setActiveMenu] = useState('home');

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const newCss = scrollTop > 0 ? 'shadow' : '';
			setCssOnScroll(newCss);

			NAVLINK.forEach((link) => {
				const element = document.getElementById(link.id);
				if (element) {
					const elementTop = element.offsetTop - 80;
					const elementBottom = elementTop + element.offsetHeight - 80;
					if (scrollTop >= elementTop && scrollTop <= elementBottom) {
						setActiveMenu(link.id);
					}
				}
			});

			const serviceElement = document.getElementById('service');
			if (serviceElement) {
				const targetPosition = serviceElement.getBoundingClientRect().top + window.scrollY;
				if (
					scrollTop > targetPosition - 80 &&
					scrollTop < targetPosition + serviceElement.offsetHeight - 80
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

	const handleNavLinkClick = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const offset = 80;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
		}
	};

	const renderNavLinks = (links: NavLink[]) =>
		links.map((item) => (
			<li
				key={item.id}
				className={`hover:text-custom-green hover:cursor-pointer text-sm md:text-base ${
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
			className={`flex justify-between items-center px-5 md:px-10 xl:px-[72px] h-[80px] w-full fixed top-0 z-50 ${cssOnScroll} transition-all ease-in-out ${
				cssOnScrollPaket
					? 'bg-custom-black text-white border-b border-white'
					: 'bg-white border-b border-transparent'
			}`}
		>
			{/* LOGO */}
			<img src={cssOnScrollPaket ? LogoWhite : Logo} alt="logo" className="h-[50px]" />

			{/* MENU > lg */}
			<ul className="gap-x-4 items-center hidden md:flex">{renderNavLinks(NAVLINK)}</ul>

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
				<div className="flex justify-between">
					<ul className="flex md:hidden flex-col gap-y-4">{renderNavLinks(NAVLINK)}</ul>
					<div>
						<button className="rounded-full p-1" onClick={() => setIsOpen(false)}>
							<AiOutlineClose />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
