import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IllPaperline } from '@/assets/landing/svg';
import { NAVLINK } from '@/data/data';
import { LogoWhite } from '@/assets/landing/img';

const Footer = () => {
	return (
		<div id="footer" className="bg-custom-black">
			<div className="relative md:flex">
				<div className="md:flex-1 lg:w-5/12 p-4 md:p-16">
					<img src={LogoWhite} alt="logo" className="h-[100px] text-white" />
					<p className="text-gray-300 font-thin text-sm mt-4">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae malesuada arcu,
						nec rutrum orci. Morbi arcu arcu, commodo sed quam ut, venenatis dictum augue. Quisque
						at diam sed ante iaculis dapibus non id ipsum. Quisque tincidunt arcu posuere pharetra
						commodo. Nunc faucibus ipsum aliquam ipsum facilisis, quis pulvinar tortor suscipit.
						Proin aliquet elementum tellus ac ornare. Vestibulum laoreet id metus et venenatis.
					</p>
				</div>
				<div className="md:flex-1 lg:w-3/12 p-4 md:p-16 text-white bg-red-200x">
					<div>
						<h2 className="text-lg font-bold">Quick Links</h2>
						{NAVLINK.map((link) => (
							<Link key={link.id} to={link.id}>
								<h3 className="text-gray-300">{link.name}</h3>
							</Link>
						))}
					</div>
					<div className="mt-4">
						<h2 className="text-lg font-bold">Follow On</h2>
						<div className="flex-1 flex space-x-4 mt-2">
							<Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
								<FaInstagram className="text-2xl" />
							</Link>
							<Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer">
								<FaYoutube className="text-2xl" />
							</Link>
							<Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
								<FaFacebook className="text-2xl" />
							</Link>
							<Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
								<FaTwitter className="text-2xl" />
							</Link>
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
