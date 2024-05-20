import { HeroImage } from '@/assets/landing/img';

const Home = () => {
	return (
		<div id="home" className="py-12 px-5 md:px-10 xl:px-40 bg-rex-200 relative bg-yellow-200x">
			<div className="bg-rex-300 flex items-center relative z-10 gap-4 xl:gap-0 ">
				<div className="flex flex-1 flex-col gap-4 bg-greenx-50">
					<div>
						<h1 className="text-white bg-custom-yellow inline py-0.5 px-2 rounded-lg">
							Lorem Ipsum Dolor Sit Amet
						</h1>
					</div>
					<h1 className="text-5xl leading-snug font-semibold">
						Lorem ipsum dolor <br className="hidden xl:block" /> sit amet, consectetur
						<br className="hidden xl:block" />
						<span className="text-custom-light-green"> adipiscing elit.</span>
					</h1>
					<p className="text-black text-sm">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean{' '}
						<br className="hidden lg:block" /> vitae malesuada arcu, nec rutrum orci. Morbi arcu
						arcu, <br className="hidden lg:block" /> commodo sed quam ut, venenatis dictum augue.
					</p>
					<div className="h-1 w-40 bg-gray-900" />
				</div>
				<div className="bg-rex-400 hidden lg:block">
					<img src={HeroImage} className="w-[334px] h-[387px]" style={{ borderRadius: '2rem' }} />
				</div>
			</div>
		</div>
	);
};

export default Home;
