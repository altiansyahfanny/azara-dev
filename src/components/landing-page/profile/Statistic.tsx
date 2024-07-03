const Statistic = () => {
	return (
		<div className="px-5">
			<div className="bg-purple-400x flex flex-wrap lg:flex-nowrap justify-center max-w-lg 2xl:max-w-3xl self-center mx-auto gap-2 p-4 shadow-md rounded-lg">
				<div className="flex flex-col bg-green-100x text-center bg-green-500x flex-1 bg-green-200x">
					<h2 className="text-lg 2xl:text-2xl">Pengalaman</h2>
					<h1 className="mt-4 text-4xl 2xl:text-5xl font-bold">
						10<sup>+</sup>
					</h1>
				</div>
				<div className="flex flex-col bg-green-100x text-center bg-red-500x flex-1 bg-blue-200x">
					<h2 className="text-lg 2xl:text-2xl">Siswa</h2>
					<h1 className="mt-4 text-4xl 2xl:text-5xl font-bold">
						400<sup>+</sup>
					</h1>
				</div>
				<div className="flex flex-col bg-green-100x text-center bg-blue-500x flex-1 bg-yellow-200x">
					<h2 className="text-lg 2xl:text-2xl">Guru</h2>
					<h1 className="mt-4 text-4xl 2xl:text-5xl font-bold">
						30<sup>+</sup>
					</h1>
				</div>
			</div>
		</div>
	);
};

export default Statistic;
