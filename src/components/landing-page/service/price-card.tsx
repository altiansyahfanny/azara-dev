import { BadgeBestSeller } from '@/assets/landing/svg';
import { Check } from 'lucide-react';

const PriceCard = ({
	isBestSeller = false,
	isPrivate = false,
	item,
}: {
	isBestSeller?: boolean;
	isPrivate?: boolean;
	item: { title: string; price: string; details: string[] };
}) => {
	return (
		<div className="bg-white rounded w-[240px] h-[320px] relative p-4 border flex flex-col justify-between">
			<div>
				{isBestSeller && (
					<img
						src={BadgeBestSeller}
						alt=""
						className="absolute -right-[18px] -top-4 w-24 aspect-square"
					/>
				)}
				<div className="">
					<h3 className="text-sm text-gray-600">{item.title}</h3>
					<p className="text-xl font-medium">
						IDR. {item.price} <span className="text-sm">/ {isPrivate ? 'sesi' : 'bulan'}</span>
					</p>
				</div>
				<hr className="my-4" />
				<div className="text-sm gap-1.5 flex flex-col">
					{item.details.map((data, i) => (
						<div key={i} className="flex gap-2">
							<Check
								className={`${
									!isPrivate ? 'text-custom-green' : 'text-custom-yellow'
								} w-4 h-4 mt-1`}
							/>
							<div className="flex-1 text-gray-600">{data}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PriceCard;
