import { useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

interface CardReviewProps {
	imgSrc: string;
	name: string;
	rating: number;
	message: string;
	desc: string;
}

const CardReview = ({ imgSrc, rating, name, message, desc }: CardReviewProps) => {
	const fullStars = Math.floor(rating / 2);
	const halfStar = rating % 2;
	const emptyStars = 5 - fullStars - halfStar;

	const [isExpand, setIsExpand] = useState(false);
	return (
		<div className="p-4 shadow-lg rounded-lg bg-white border overflow-hidden my-4">
			<div className="flex gap-4 items-center">
				<img
					src={imgSrc}
					alt="Profile Picture"
					className="w-20 2xl:w-28 aspect-square rounded-full object-cover"
				/>
				<div className="flex flex-col">
					<div className="flex gap-0.5">
						{[...Array(fullStars)].map((_, index) => (
							<BsStarFill key={index} className="text-custom-yellow 2xl:text-xl" />
						))}
						{halfStar === 1 && <BsStarHalf className="text-custom-yellow 2xl:text-xl" />}
						{[...Array(emptyStars)].map((_, index) => (
							<BsStar key={index} className="text-custom-yellow 2xl:text-xl" />
						))}
					</div>
					<h1 className="text-lg 2xl:text-2xl font-bold mt-2">{name}</h1>
					<p className="text-sm 2xl:text-lg">{desc}</p>
				</div>
			</div>
			<p className={`text-sm mt-4 2xl:text-lg ${!isExpand && 'line-clamp-3'}`}>“{message}”</p>
			<button className="mt-4 text-sm text-custom-green" onClick={() => setIsExpand(!isExpand)}>
				{isExpand ? 'Read Less' : 'Read More'}
			</button>
		</div>
	);
};

export default CardReview;
