import { HeroImage, HeroImage2, HeroImage3 } from '@/assets/landing/img';
import { PatternHero } from '@/assets/landing/svg';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { GoDot, GoDotFill } from 'react-icons/go';

// laptop kecil = 1024px
// laptop medium = 1280px
// laptop besar = 1536px

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

	// Mendapatkan lebar layar saat ini
	var lebarLayar = window.innerWidth;
	console.log('Lebar layar saat ini adalah ' + lebarLayar + ' piksel');

	return (
		<div id="home" className="">
			<Carousel className="" plugins={[Autoplay({ delay: 10000 })]} setApi={setApi}>
				<CarouselContent className="pb-4">
					<CarouselItem>
						<div className="bg-yellow-500x carousel-item px-5 md:px-10 xl:px-40">
							<div className="h-full">
								<div className="flex items-center bg-red-500x h-full">
									<div className="flex-1 bg-green-500x w-full lg:max-w-xl lg:text-center lg:mx-auto xl:w-full xl:text-left">
										<h1 className="text-4xl 2xl:text-5xl leading-snug font-semibold bg-yellow-200x">
											Bimbingan Belajar yang <br className="hidden xl:block" /> Memberikan&nbsp;
											<br className="hidden xl:block" />
											<p className="text-custom-green lg:inline">#PerhatianPenuh</p> bagi&nbsp;
											<br className="hidden xl:block" />
											Siswa dan Orang Tua
										</h1>
										<p className="text-black text-sm 2xl:text-base mt-4">
											Menyesuaikan dengan kurikulum terbaru di sekolah,{' '}
											<br className="hidden xl:block" />
											pemberian konseling untuk pengembangan karakter,{' '}
											<br className="hidden xl:block" />
											dan laporan rutin untuk orang tua.
										</p>
										<div className="flex lg:justify-center xl:justify-start">
											<div className="h-1 w-40 bg-gray-900 mt-4" />
										</div>
									</div>
									<div className="bg-rex-400 hidden xl:block">
										<img
											src={HeroImage}
											className="xl:w-[400px] 2xl:w-[500px]"
											style={{ borderRadius: '2rem' }}
										/>
									</div>
								</div>
							</div>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="bg-red-200x relative carousel-item">
							<div className="h-full relative flex items-center bg-blue-500x">
								<img
									src={HeroImage2}
									className="hidden xl:block absolute xl:w-[500px] 2xl:w-[650px]  bottom-0 left-40"
								/>
								<div className="hidden xl:block bg-[#F3D743B2] h-full w-1/2 rounded-tr-full rounded-br-full" />
								<div className="flex-1 px-5 md:px-10 xl:px-20 bg-red-200x">
									<div className="bg-green-500x lg:max-w-xl lg:text-center lg:mx-auto xl:w-full xl:text-right">
										<img src={PatternHero} className="mb-4 hidden xl:block ml-auto" />
										<h1 className="text-4xl leading-snug font-semibold 2xl:text-5xl">
											Kesempatan <br className="hidden xl:block" /> <span>Daftar Khusus </span>
											<br className="hidden xl:block" />
											<p className="text-custom-green lg:inline">#GRATIS</p>
										</h1>
										<p className="text-black text-sm 2xl:text-base">
											<span>Jangan lewatkan kesempatan daftar </span>
											<br className="hidden xl:block" />
											program bimbingan belajar tanpa&nbsp;
											<br className="hidden xl:block" />
											dipungut biaya sebelum
											<br className="hidden xl:block" />
											<span className="font-medium text-black"> 15 Juli 2024</span>
										</p>
										<div className="flex lg:justify-center xl:justify-end">
											<div className="h-1 w-40 bg-gray-900 mt-4" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="bg-yellow-500x carousel-item px-5 md:px-10 xl:px-40 bg-blue-500x">
							<div className="h-full bg-purple-500x">
								<div className="flex items-center bg-red-500x h-full bg-yellow-500x">
									<div className="flex-1 bg-green-500x lg:max-w-xl lg:mx-auto lg:text-center xl:text-left">
										<h1 className="text-4xl 2xl:text-5xl leading-snug bg-yellow-500x font-semibold">
											Ajak Teman dan <br className="hidden xl:block" />
											Dapatkan
											<br className="hidden xl:block" />
											<p className="text-custom-green lg:inline">Rp. 50.000</p>
										</h1>
										<div className="flex justify-start lg:justify-center xl:justify-start">
											<div className="h-1 w-40 bg-gray-900 mt-4" />
										</div>
										<p className="text-black text-sm mt-4 2xl:text-base">
											Bagikan&nbsp;pengalaman&nbsp;
											<br className="hidden xl:block" />
											positifmu&nbsp;dan&nbsp;ajak&nbsp;
											<br className="hidden xl:block" />
											teman-temanmu&nbsp;untuk&nbsp;
											<br className="hidden xl:block" />
											bergabung!
										</p>
									</div>
									<div className="bg-red-400z hidden xl:block">
										<img
											src={HeroImage3}
											className="w-[600px] 2xl:w-[800px] "
											style={{ borderRadius: '2rem' }}
										/>
									</div>
								</div>
							</div>
						</div>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
			<div className="flex gap-4 items-center justify-center">
				{Array.from({ length: 3 }).map((_, index) => {
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
