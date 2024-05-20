import { Illustration } from '@/assets/landing/svg';
import CardReview from '@/components/landing-page/testimoni/CardReview';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { TESTIMONI } from '@/data/data';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { GoDot, GoDotFill } from 'react-icons/go';

const Testimoni = () => {
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);
	const [count, setCount] = React.useState(0);

	React.useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<div id="testimoni" className="relative py-12 overflow-hidden">
			<div className="md:flex relative">
				<div className="p-5 lg:pl-40 md:w-1/2">
					<div>
						<h1 className="text-3xl font-bold">
							See how <span className="text-custom-green">we've help</span> our clients
							<span className="text-custom-green">succeed</span>
						</h1>
						<h1 className="mt-2 text-xl font-bold">More than 90+ students</h1>
					</div>

					<Carousel className="" plugins={[Autoplay({ delay: 5000 })]} setApi={setApi}>
						<CarouselContent className="">
							{TESTIMONI.map((item, index) => (
								<CarouselItem key={index}>
									<CardReview rating={item.rating} name={item.name} message={item.message} />
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
					<div className="flex gap-4 items-center justify-center">
						{Array.from({ length: 5 }).map((_, index) => {
							return index === current - 1 ? (
								<GoDotFill key={index} className="text-custom-yellow" />
							) : (
								<GoDot
									key={index}
									className="text-custom-gray cursor-pointer"
									onClick={() => {
										api?.scrollTo(index);
									}}
								/>
							);
						})}
					</div>

					{/* CART */}
				</div>
				<div className="hidden md:flex md:w-1/2 justify-end items-end">
					<img src={Illustration} alt="" className="" />
				</div>
			</div>
		</div>
	);
};

export default Testimoni;
