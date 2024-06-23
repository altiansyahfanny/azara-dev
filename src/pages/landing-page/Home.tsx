import { HeroImage } from '@/assets/landing/img';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { GoDot, GoDotFill } from 'react-icons/go';

const Home = () => {
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
		<div id="home" className="">
			<Carousel className="" plugins={[Autoplay({ delay: 10000 })]} setApi={setApi}>
				<CarouselContent className="">
					{Array.from({ length: 1 }).map((_item, index) => (
						<CarouselItem key={index}>
							<div className="py-12 px-5 md:px-10 xl:px-40 bg-rex-200 relative bg-yellow-200x">
								<div className="flex items-center relative z-10 gap-4 xl:gap-0 bg-green-300x ">
									<div className="flex flex-1 flex-col gap-4 bg-green-50x">
										{/* <div>
											<h1 className="text-white bg-custom-yellow inline py-0.5 px-2 rounded-lg">
												Lorem Ipsum Dolor Sit Amet
											</h1>
										</div> */}
										<h1 className="text-4xl leading-snug bg-yellow-200x font-semibold">
											Bimbingan Belajar yang <br className="hidden xl:block" /> Memberikan
											<br className="hidden xl:block" />
											<p className="text-custom-light-green lg:inline">#PerhatianPenuh</p> bagi{' '}
											<br className="hidden xl:block" />
											Siswa dan Orang Tua
										</h1>
										<p className="text-black text-sm">
											Menyesuaikan dengan kurikulum terbaru di sekolah,{' '}
											<br className="hidden xl:block" />
											pemberian konseling untuk pengembangan karakter,{' '}
											<br className="hidden xl:block" />
											dan laporan rutin untuk orang tua.
										</p>
										<div className="h-1 w-40 bg-gray-900" />
									</div>
									<div className="bg-rex-400 hidden lg:block">
										<img
											src={HeroImage}
											className="w-[334px] h-[387px]"
											style={{ borderRadius: '2rem' }}
										/>
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			<div className="flex gap-4 items-center justify-center">
				{Array.from({ length: 1 }).map((_, index) => {
					return index === current - 1 ? (
						<GoDotFill key={index} className="text-2xl text-gray-400" />
					) : (
						<GoDot
							key={index}
							className="text-2xl text-gray-300 cursor-pointer"
							onClick={() => {
								api?.scrollTo(index);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Home;
