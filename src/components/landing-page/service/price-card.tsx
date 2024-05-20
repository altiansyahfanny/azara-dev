import { BadgeBestSeller } from '@/assets/landing/svg';
import { FaCheckCircle } from 'react-icons/fa';

const PriceCard = ({
	isBestSeller = false,
	isPrivate = false,
}: {
	isBestSeller?: boolean;
	isPrivate?: boolean;
}) => {
	return (
		<div className="bg-white rounded-lg w-[250px] relative shadow-lg p-4 border flex flex-col">
			{isBestSeller && (
				<img
					src={BadgeBestSeller}
					alt=""
					className="absolute -right-[18px] -top-4 w-24 aspect-square"
				/>
			)}
			<div className="bg-white rounded-lg ">
				<h3 className="text-sm">Basic</h3>
				<p className="text-2xl font-medium">
					IDR. 175.000 <span className="text-sm">/ session</span>
				</p>
			</div>
			<hr className="my-4" />
			<ul className="text-sm gap-1.5 flex flex-col">
				<li className=" flex items-center gap-2">
					<FaCheckCircle className={`${isPrivate ? 'text-custom-green' : 'text-custom-yellow'}`} />
					<p>Lorem Ipsum </p>
				</li>
				<li className=" flex items-center gap-2">
					<FaCheckCircle className={`${isPrivate ? 'text-custom-green' : 'text-custom-yellow'}`} />
					<p>Lorem Ipsum dolor si amet</p>
				</li>
				<li className=" flex items-center gap-2">
					<FaCheckCircle className={`${isPrivate ? 'text-custom-green' : 'text-custom-yellow'}`} />
					<p>Lorem Ipsum dolor si</p>
				</li>
				<li className=" flex items-center gap-2">
					<FaCheckCircle className={`${isPrivate ? 'text-custom-green' : 'text-custom-yellow'}`} />
					<p>Lorem Ipsum </p>
				</li>
				<li className=" flex items-center gap-2">
					<FaCheckCircle className={`${isPrivate ? 'text-custom-green' : 'text-custom-yellow'}`} />
					<p>Lorem Ipsum dolor si amet</p>
				</li>
				<li className=" flex items-center gap-2">
					<FaCheckCircle className={`${isPrivate ? 'text-custom-green' : 'text-custom-yellow'}`} />
					<p>Lorem Ipsum dolor si amet</p>
				</li>
				<li className=" flex items-center gap-2">
					<FaCheckCircle className={`${isPrivate ? 'text-custom-green' : 'text-custom-yellow'}`} />
					<p>Lorem Ipsum dolor si amet</p>
				</li>
			</ul>
			<hr className="my-4" />
			<button
				className={`${
					isPrivate ? 'bg-custom-green' : 'bg-custom-yellow'
				} text-white px-5 py-1 rounded-full self-center text-sm`}
			>
				Select
			</button>
		</div>
	);
};

export default PriceCard;
