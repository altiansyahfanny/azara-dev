const Statistic = () => {
	return (
		// <div className="px-5 relative -z-50">
		// 	<div className="mt-32 flex justify-center relative z-0 bg-green-800">
		// 		<div className="shadow-md rounded-lg p-4 text-center flex flex-wrap items-center justify-center lg:gap-[6rem] px-12 bg-purple-500">
		// 			<div className=" bg-green-100">
		// 				<h2 className="text-lg nowra">Pengalaman</h2>
		// 				<h1 className="text-4xl font-bold">10+</h1>
		// 			</div>
		// 			<div className=" bg-yellow-200">
		// 				<h2 className="text-lg">Murid</h2>
		// 				<h1 className="text-4xl font-bold">67</h1>
		// 			</div>
		// 			<div className=" bg-blue-200">
		// 				<h2 className="text-lg">Guru</h2>
		// 				<h1 className="text-4xl font-bold">9</h1>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		<div className="px-5">
			{/* <div className="grid place-content-center bg-amber-500"> */}
			<div className="bg-purple-400x flex max-w-lg self-center mx-auto gap-4 py-4 px-8 shadow-md rounded-lg">
				<div className="flex flex-col bg-green-100x text-center bg-green-500x w-1/3">
					<h2 className="text-lg">Pengalaman</h2>
					<h1 className="mt-4 text-4xl font-bold">10+</h1>
				</div>
				<div className="flex flex-col bg-green-100x text-center bg-red-500x w-1/3">
					<h2 className="text-lg">Siswa</h2>
					<h1 className="mt-4 text-4xl font-bold">400+</h1>
				</div>
				<div className="flex flex-col bg-green-100x text-center bg-blue-500x w-1/3">
					<h2 className="text-lg">Guru</h2>
					<h1 className="mt-4 text-4xl font-bold">30+</h1>
				</div>
			</div>
			{/* </div> */}
		</div>
	);
};

export default Statistic;
