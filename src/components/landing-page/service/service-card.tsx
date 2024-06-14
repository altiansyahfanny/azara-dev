import { FaBook } from 'react-icons/fa';
import { DialogTrigger } from '../dialog';
import { MdGroups } from 'react-icons/md';
import { ReactNode } from 'react';

const ServiceCard = ({
	text,
	isPrivate,
	description,
}: {
	text: string;
	isPrivate: boolean;
	description: ReactNode;
}) => {
	return (
		<div className="bg-custom-gray text-white w-[250px] pb-4 px-4 pt-10 rounded-xl relative h-full">
			<div className="absolute -top-4 bg-white w-10 aspect-square grid place-content-center rounded-full">
				{!isPrivate ? (
					<FaBook className="text-custom-green" />
				) : (
					<MdGroups className="text-custom-yellow" />
				)}
			</div>
			<h1 className="text-2xl">{text}</h1>
			<div className="mt-4 text-sm h-[150px]">{description}</div>
			<hr className="my-4" />
			<div className="flex items-center justify-center">
				<DialogTrigger asChild>
					<button
						className={`bg-[#303237] text-custom-green  px-5 py-1 text-xs rounded-lg ${
							!isPrivate ? 'text-custom-green' : 'text-custom-yellow'
						}`}
					>
						Preview
					</button>
				</DialogTrigger>
			</div>
		</div>
	);
};

export default ServiceCard;
