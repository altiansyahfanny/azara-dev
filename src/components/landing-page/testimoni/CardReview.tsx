import { ProfilePic } from '@/assets/landing/img';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

interface CardReviewProps {
	name: string;
	rating: number;
	message: string;
}

const CardReview = ({ rating, name, message }: CardReviewProps) => {
	const fullStars = Math.floor(rating / 2);
	const halfStar = rating % 2;
	const emptyStars = 5 - fullStars - halfStar;
	return (
		<div className="p-4 shadow-lg rounded-lg bg-white border overflow-hidden my-4">
			<div className="flex gap-4 items-center">
				<img
					src={ProfilePic}
					alt="Profile Picture"
					className="w-20 2xl:w-28 aspect-square rounded-full"
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
					<p className="text-sm 2xl:text-lg">Parent</p>
				</div>
			</div>
			<p className="text-sm mt-4 line-clamp-3 2xl:text-lg">“{message}”</p>
		</div>
	);
};

export default CardReview;
