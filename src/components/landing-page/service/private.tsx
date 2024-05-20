import PriceCard from './price-card';
import ServiceCard from './service-card';

const Private = ({ isPrivate }: { isPrivate: boolean }) => {
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
		<div className="flex items-center justify-center gap-4 ">
			<PriceCard isBestSeller={true} isPrivate={isPrivate} />
		</div>
	);
};

Private.Price = Price;

export default Private;
