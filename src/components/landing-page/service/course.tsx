import PriceCard from './price-card';
import ServiceCard from './service-card';

const Course = ({ isPrivate }: { isPrivate: boolean }) => {
	return (
		<>
			<ServiceCard text="5-6 SD" isPrivate={isPrivate} />
			<ServiceCard text="7-9 SMP" isPrivate={isPrivate} />
			<ServiceCard text="10-12 SMA" isPrivate={isPrivate} />
		</>
	);
};

const Price = ({ isPrivate }: { isPrivate: boolean }) => {
	return (
		<div className="flex flex-col xl:flex-row items-center justify-center gap-4 ">
			<PriceCard />
			<PriceCard isBestSeller={true} isPrivate={isPrivate} />
			<PriceCard />
		</div>
	);
};

Course.Price = Price;

export default Course;
