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

	React.useEffect(() => {
		if (!api) {
			return;
		}

		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<div className="relative py-12 overflow-hidden">
			<div className="md:flex relative">
				<div className="p-5 lg:pl-40 md:w-1/2">
					<div>
						<h1 className="text-3xl 2xl:text-5xl font-bold">Testimoni dari pelanggan kami</h1>
						<h1 className="mt-2 2xl:text-xl">
							Lebih dari 90 siswa dan orang tua puas dengan bimbingan kami
						</h1>
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
						{TESTIMONI.map((_, index) => {
							return index === current - 1 ? (
								<GoDotFill key={index} className="2xl:text-xl text-custom-yellow" />
							) : (
								<GoDot
									key={index}
									className="2xl:text-xl text-custom-gray cursor-pointer"
									onClick={() => {
										api?.scrollTo(index);
									}}
								/>
							);
						})}
					</div>

					{/* CART */}
				</div>
				<div className="hidden md:flex md:w-1/2 justify-end items-end bg-red-300x">
					<img src={Illustration} alt="" className="2xl:w-[800px]" />
				</div>
			</div>
		</div>
	);
};

export default Testimoni;
