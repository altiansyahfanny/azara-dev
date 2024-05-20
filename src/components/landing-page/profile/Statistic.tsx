import { PatternLeft, PatternRight } from '@/assets/landing/svg';

const Statistic = () => {
	return (
		<div className="px-5 relative -z-50">
			<img
				src={PatternLeft}
				alt=""
				className="absolute left-0 md:-left-40 lg:-left-20 xl:left-0 -top-8 -z-10 2xl:hidden"
			/>
			<div className="mt-32 flex justify-center relative z-0 bg-greenx-200">
				<div className="shadow-md rounded-lg p-4 text-center flex flex-wrap gap-14 items-center justify-center lg:gap-[6rem] px-12 bg-white">
					<div className="flex-1 bg-greenx-100">
						<h2 className="text-lg">Students</h2>
						<h1 className="text-4xl font-bold">80</h1>
					</div>
					<div className="flex-1 bg-yellowx-200">
						<h2 className="text-lg">Teachers</h2>
						<h1 className="text-4xl font-bold">67</h1>
					</div>
					<div className="flex-1 bg-bluex-200">
						<h2 className="text-lg">Colleges</h2>
						<h1 className="text-4xl font-bold">9</h1>
					</div>
					<div className="flex-1 bg-purplex-200">
						<h2 className="text-lg">Cities</h2>
						<h1 className="text-4xl font-bold">15</h1>
					</div>
				</div>
			</div>
			<img
				src={PatternRight}
				alt=""
				className="absolute right-0 md:-right-40 lg:-right-20 xl:right-0 -bottom-8 -z-10 2xl:hidden"
			/>
		</div>
	);
};

export default Statistic;
