import { HeroImage, HeroImage2, HeroImage3 } from '@/assets/landing/img';
import { PatternHero } from '@/assets/landing/svg';
import { Banner2, Banner3 } from '@/assets/landing/svg/banner';
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
			{/* > LG */}
			<Carousel className="hidden lg:block" plugins={[Autoplay({ delay: 500000 })]} setApi={setApi}>
				<CarouselContent>
					<CarouselItem>
						<div className="grid grid-cols-2 px-20 pt-20">
							<div className="flex flex-col justify-center">
								<p className="font-semibold text-6xl leading-tight">
									{`Bimbingan Belajar yang Memberikan `}
									<span className="text-custom-green">#PerhatianPenuh</span>
									{` bagi Siswa dan Orang Tua`}
								</p>
								<p className="mt-4 text-black text-opacity-60 text-lg">
									Menyesuaikan dengan kurikulum terbaru di sekolah, pemberian konseling untuk
									pengembangan karakter, dan laporan rutin untuk orang tua.
								</p>
								<div className="mt-8">
									<div className="h-1 w-40 bg-black bg-opacity-60" />
								</div>
							</div>
							<div className="flex justify-end bg-red-50x">
								<img src={HeroImage} className="w-3/4" style={{ borderRadius: '2rem' }} />
							</div>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="grid grid-cols-3 px-20">
							<div className="col-span-1 flex flex-col justify-center">
								<div className="font-semibold text-6xl leading-tight">
									<p>{'Kesempatan Daftar Kursus '}</p>
									<p className="text-custom-green">#GRATIS</p>
									
								</div>
								<p className="mt-4 text-black text-opacity-60 max-w-xs text-lg">
									{'Jangan lewatkan kesempatan daftar program bimbingan belajar tanpa dipungut biaya sebelum '} <span className='text-black'>15 Juli 2024</span> 
								</p>
								<div className="mt-8">
									<div className="h-1 w-40 bg-black bg-opacity-60" />
								</div>
							</div>
							<div className="flex justify-end col-span-2">
								<img src={Banner2} className='h-full'/>
							</div>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="grid grid-cols-3 px-20">
							<div className="col-span-1 flex flex-col justify-center">
								<div className="font-semibold text-6xl leading-tight">
									<p>Ajak Teman dan Dapatkan</p>
									<p className="text-custom-green">Rp 50.000</p>
								</div>
								<p className="mt-4 text-black text-opacity-60 text-lg">
									Bagikan pengalaman positifmu dan ajak teman-temanmu untuk bergabung!
								</p>
								<div className="mt-8">
									<div className="h-1 w-40 bg-black bg-opacity-60" />
								</div>
							</div>
							<div className="flex justify-end col-span-2">
								<img src={Banner3} className='h-full' />
							</div>
						</div>
					</CarouselItem>
				</CarouselContent>
			</Carousel>

			{/* < LG */}
			{/* <Carousel className="xl:hidden" plugins={[Autoplay({ delay: 5000 })]} setApi={setApi}>
				<CarouselContent>
					<CarouselItem>
						<div className="p-5">
							<div className="">
								<p className="font-semibold text-3xl leading-tight text-centerx">
									{`Bimbingan Belajar yang Memberikan `}
									<span className="text-custom-green">#PerhatianPenuh</span>
									{` bagi Siswa dan Orang Tua`}
								</p>
								<div className="flex justify-center mt-4">
									<img src={HeroImage} className="w-3/4" style={{ borderRadius: '2rem' }} />
								</div>
								<p className="mt-4 text-sm text-black text-opacity-60 text-centerx">
									Menyesuaikan dengan kurikulum terbaru di sekolah, pemberian konseling untuk
									pengembangan karakter, dan laporan rutin untuk orang tua.
								</p>
								<div className="mt-8">
									<div className="h-1 w-40 bg-black bg-opacity-60" />
								</div>
							</div>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="p-5">
							<div className="">
								<p className="font-semibold text-3xl leading-tight text-right">
									{`Kesempatan Daftar Kursus `}
									<span className="text-custom-green">#GRATIS</span>
								</p>
								<div className="flex justify-center mt-4 bg-transparent relative">
									<div className="top-4 bottom-4 aspect-square bg-yellow-300 rounded-full absolute -z-10" />
									<img src={HeroImage2} className="w-3/4" style={{ borderRadius: '2rem' }} />
								</div>
								<p className="mt-4 text-sm text-black text-opacity-60 text-centerx">
									{`Jangan lewatkan kesempatan daftar program bimbingan belajar tanpa dipungut biaya
									sebelum `}
									<span className="font-medium text-black">15 Juli 2024</span>
								</p>
								<div className="mt-8">
									<div className="h-1 w-40 bg-black bg-opacity-60" />
								</div>
							</div>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="">
							<div className="px-5 pt-5">
								<p className="font-semibold text-3xl leading-tight text-center">
									{`Ajak Teman dan Dapatkan `}
									<span className="text-custom-green">Rp 50.000</span>
								</p>
							</div>
							<div className="flex justify-center mt-4 bg-red-50">
								<img src={HeroImage3} className="w-full" style={{ borderRadius: '2rem' }} />
							</div>
							<p className="mt-4 text-sm text-black text-opacity-60 text-centerx px-6">
								Menyesuaikan dengan kurikulum terbaru di sekolah, pemberian konseling untuk
								pengembangan karakter, dan laporan rutin untuk orang tua.
							</p>
							<div className="mt-8 px-6 pb-6">
								<div className="h-1 w-40 bg-black bg-opacity-60" />
							</div>
						</div>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
*/}
			<div className="flex gap-4 items-center justify-center mt-8">
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
