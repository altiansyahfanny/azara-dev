import { LogoWhite } from '@/assets/landing/img';
import { IllPaperline } from '@/assets/landing/svg';
import { NAVLINK } from '@/data/data';
import { MapPin } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
	return (
		<div id="footer" className="bg-custom-black">
			<div className="relative md:flex">
				<div className="md:flex-1 lg:w-5/12 md:p-16">
					<img src={LogoWhite} alt="logo" className="h-[100px] text-white" />
					<div className="text-white mt-8">
						<h2 className="text-lg font-bold">Jangan Lupa Kunjungi Kami</h2>
						<a
							href="https://www.google.com/maps/place/Azara+Course/@-6.3163412,106.8180023,17.75z/data=!4m6!3m5!1s0x2e69ee0a9f35b1df:0xf301f16896ffd3bb!8m2!3d-6.3173186!4d106.8186412!16s%2Fg%2F11dyqz17gx?entry"
							target="_blank"
							className="flex gap-4 text-white mt-4"
						>
							<MapPin className="text-2xl" />
							<p>Jl. Sagu No. 45, RT 007/ RW 005 Jagakarsa, Jakarta Selatan 12620</p>
						</a>
					</div>
				</div>
				<div className="md:flex-1 lg:w-3/12 p-4 md:p-16 text-white bg-red-200x">
					<div>
						<h2 className="text-lg font-bold">Tautan</h2>
						{NAVLINK.map((link) => (
							<a key={link.id} href={`#${link.id}`}>
								<h3 className="text-gray-300 text-sm">{link.name}</h3>
							</a>
						))}
					</div>
					<div className="mt-8">
						<h2 className="text-lg font-bold">Follow Kami</h2>
						<div className="flex-1 flex space-x-4 mt-2">
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-4"
							>
								<FaInstagram className="text-2xl" />
								<p>@azaracourse</p>
							</a>
						</div>
					</div>
				</div>
				<div className="hidden lg:flex flex-1  bg-slate-800x justify-end items-end">
					<img src={IllPaperline} alt="illustration" className="" />
				</div>
			</div>
		</div>
	);
};

export default Footer;
