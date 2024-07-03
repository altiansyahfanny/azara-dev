import { FaBook } from 'react-icons/fa';
import { MdGroups } from 'react-icons/md';
import { ReactNode, useState } from 'react';
import { Dialog, DialogContent } from '@/components/landing-page/dialog';
import PriceCard from './price-card';

type ServiceItem = {
	title: string;
	price: string;
	details: string[];
};

type Service = {
	title: string;
	items: ServiceItem[];
};

const ServiceCard = ({
	text,
	isPrivate,
	description,
	data,
}: {
	text: string;
	isPrivate: boolean;
	description: ReactNode;
	data: Service;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<div className="bg-custom-gray border border-gray-600 border-dashed text-white w-[250px] 2xl:w-[300px] pb-4 px-6 pt-10 rounded-xl relative h-full hover:bg-[#47494d] hover:border-gray-200 hover:scale-105 transition-all">
				<div className="absolute -top-4 2xl:-top-8 bg-white w-10 2xl:w-14 aspect-square grid place-content-center rounded-full">
					{!isPrivate ? (
						<FaBook className="text-custom-green 2xl:text-xl" />
					) : (
						<MdGroups className="text-custom-yellow 2xl:text-xl" />
					)}
				</div>
				<h1 className="text-2xl tracking-wide 2xl:text-4xl">{text}</h1>
				<div className="mt-4 text-sm 2xl:text-lg h-[200px] 2xl:h-[250px]">{description}</div>
				<hr className="my-4" />
				<div className="flex items-center justify-center">
					<button
						className={`bg-[#303237] text-custom-green px-5 py-1 text-xs rounded-lg ${
							!isPrivate ? 'text-custom-green' : 'text-custom-yellow'
						} hover:bg-custom-gray transition-all uppercase tracking-wide font-medium 2xl:text-lg`}
						onClick={() => setIsOpen(true)}
					>
						Lihat
					</button>
				</div>
			</div>
			<Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
				<DialogContent className="min-w-max max-h-[500px] overflow-scroll no-scrollbar">
					<div className="w-full h-full relative">
						<div className="p-6">
							<h1 className="text-center text-3xl uppercase font-medium text-gray-700 tracking-wide">
								{data.title}
							</h1>
							<div className="h-1 w-20 bg-gray-300 mx-auto mt-4 mb-6 rounded-full" />
							<div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-8">
								{data.items.map((item, i) => (
									<PriceCard key={i} item={item} isPrivate={isPrivate} />
								))}
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ServiceCard;
