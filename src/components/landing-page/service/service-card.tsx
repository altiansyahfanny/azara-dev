import { FaBook } from 'react-icons/fa';
import { DialogTrigger } from '../dialog';
import { MdGroups } from 'react-icons/md';

const ServiceCard = ({ text, isPrivate }: { text: string; isPrivate: boolean }) => {
	return (
		<div className="grid place-content-center">
			<div className="bg-custom-gray text-white w-[250px] pb-4 px-4 pt-10 rounded-xl relative">
				<div className="absolute -top-4 bg-white w-10 aspect-square grid place-content-center rounded-full">
					{isPrivate ? (
						<FaBook className="text-custom-green" />
					) : (
						<MdGroups className="text-custom-yellow" />
					)}
				</div>
				<h1 className="text-2xl">
					PRIVAT <br /> {text}
				</h1>
				<p className="mt-4 text-sm">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae malesuada arcu, nec
					rutrum orci. Morbi arcu arcu, commodo sed quam ut, venenatis dictum augue. Quisque at diam
					sed ante iaculis dapibus non id ipsum.
				</p>
				<hr className="my-4" />
				<div className="flex items-center justify-center">
					<DialogTrigger asChild>
						<button
							className={`bg-[#303237] text-custom-green  px-5 py-1 text-xs rounded-lg ${
								isPrivate ? 'text-custom-green' : 'text-custom-yellow'
							}`}
						>
							Preview
						</button>
					</DialogTrigger>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;
