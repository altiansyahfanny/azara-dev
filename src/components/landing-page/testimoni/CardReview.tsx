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
				<img src={ProfilePic} alt="Profile Picture" className="w-20 h-20 rounded-full" />
				<div className="flex flex-col">
					<div className="flex gap-0.5">
						{[...Array(fullStars)].map((_, index) => (
							<BsStarFill key={index} className="text-custom-yellow" />
						))}
						{halfStar === 1 && <BsStarHalf className="text-custom-yellow" />}
						{[...Array(emptyStars)].map((_, index) => (
							<BsStar key={index} className="text-custom-yellow" />
						))}
					</div>
					<h1 className="text-lg font-bold mt-2">{name}</h1>
					<p className="text-sm">Parent</p>
				</div>
			</div>
			<p className="text-sm mt-4 line-clamp-3">“{message}”</p>
		</div>
	);
};

export default CardReview;
