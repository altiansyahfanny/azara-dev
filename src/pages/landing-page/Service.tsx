import { PatternOurSpecialist } from '@/assets/landing/svg';
import { Dialog, DialogContent } from '@/components/landing-page/dialog';
import Course from '@/components/landing-page/service/course';
import Private from '@/components/landing-page/service/private';
import { useState } from 'react';

const Service = () => {
	const [isPrivate, setIsPrivate] = useState(false);

	const tooglePrivate = () => {
		setIsPrivate(!isPrivate);
	};

	return (
		<div id="service">
			<Dialog>
				<div className="relative py-12 bg-custom-black px-5">
					<div className="absolute overflow-hidden inset-0">
						<div className="absolute left-0 top-0 right-0 bottom-0 hidden xl:block 2xl:hidden">
							<img src={PatternOurSpecialist} className="w-full" />
						</div>
					</div>
					<div className="flex items-center justify-center flex-col gap-4">
						<h1 className="text-center font-semibold text-4xl text-white">
							Paket
							<span className={`${!isPrivate ? 'text-custom-green' : 'text-custom-yellow'}`}>
								&nbsp; {!isPrivate ? 'Les Kursus' : 'Privat'}
							</span>
						</h1>
						{!isPrivate ? (
							<p className="text-white text-center">
								Kami menawarkan layanan <span className="text-custom-green">les privat</span> yang
								disesuaikan
								<br className="hidden md:block" />
								dengan&nbsp;
								<span className="text-custom-green">kebutuhan</span> dan tujuan&nbsp;
								<span className="text-custom-green">belajar</span> setiap siswa.
							</p>
						) : (
							<p className="text-white text-center">
								Kami menawarkan layanan <span className="text-custom-yellow">belajar bersama</span>
								&nbsp;yang disesuaikan
								<br />
								dengan jadwal dan&nbsp;
								<span className="text-custom-yellow">ruang belajar</span>&nbsp;yang&nbsp;
								<span className="text-custom-yellow">kondusif</span>.
							</p>
						)}
					</div>
					<div className="mt-16 flex justify-center gap-4 z-10 relative">
						<button
							className={`${
								!isPrivate ? 'bg-custom-green' : 'bg-custom-gray'
							} text-white px-5 py-2 rounded-lg`}
							onClick={tooglePrivate}
						>
							Kursus
						</button>

						<button
							className={`${
								!isPrivate ? 'bg-custom-gray' : 'bg-custom-yellow'
							} text-white px-5 py-2 rounded-lg`}
							onClick={tooglePrivate}
						>
							Privat
						</button>
					</div>
					<div className="mt-16 gap-8 flex flex-wrap justify-center">
						{isPrivate ? <Private isPrivate={isPrivate} /> : <Course isPrivate={isPrivate} />}
					</div>
					{/* <div className="absolute -bottom-5 left-0 right-0 mx-auto w-12 h-12 bg-custom-gray grid place-content-center rounded-full cursor-pointer">
						<MdKeyboardDoubleArrowDown className="text-white text-2xl" />
					</div> */}
				</div>

				<DialogContent className="min-w-max max-h-[500px] overflow-scroll no-scrollbar">
					<div className="w-full h-full relative">
						<div className="p-6">
							<h2 className="text-3xl text-center mb-8 font-semibold">Our Special Offers</h2>

							{isPrivate ? (
								<Private.Price isPrivate={isPrivate} />
							) : (
								<Course.Price isPrivate={isPrivate} />
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Service;
