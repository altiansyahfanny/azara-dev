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
			<div className="relative py-12 bg-custom-black px-5">
				<div className="flex items-center justify-center flex-col gap-4">
					<h1 className="text-center font-semibold text-4xl 2xl:text-5xl text-white">
						Paket
						<span className={`${!isPrivate ? 'text-custom-green' : 'text-custom-yellow'}`}>
							&nbsp; {!isPrivate ? 'Kelas' : 'Privat'}
						</span>
					</h1>
					{!isPrivate ? (
						<p className="text-white text-center 2xl:text-xl">
							Kami menawarkan sesi <span className="text-custom-green">belajar bersama</span> yang
							disesuaikan <br className="hidden xl:block" /> dengan jadwal dan{' '}
							<span className="text-custom-green">ruang belajar</span> yang{' '}
							<span className="text-custom-green">kondusif</span>.
						</p>
					) : (
						<p className="text-white text-center 2xl:text-xl">
							Kami menawarkan sesi <span className="text-custom-yellow">belajar bersama</span> yang
							disesuaikan <br /> dengan jadwal dan{' '}
							<span className="text-custom-yellow">ruang belajar</span> yang{' '}
							<span className="text-custom-yellow">kondusif</span>.
						</p>
					)}
				</div>
				<div className="mt-16 flex justify-center gap-4 z-10 relative">
					<button
						className={`${
							!isPrivate ? 'bg-custom-green' : 'bg-custom-gray border border-white'
						} text-white px-5 py-2 rounded-lg tracking-wide 2xl:text-xl`}
						onClick={tooglePrivate}
					>
						Kursus
					</button>

					<button
						className={`${
							!isPrivate ? 'bg-custom-gray border border-white' : 'bg-custom-yellow'
						} text-white px-5 py-2 rounded-lg tracking-wide 2xl:text-xl`}
						onClick={tooglePrivate}
					>
						Privat
					</button>
				</div>
				<div className="mt-16 gap-8 flex flex-wrap justify-center">
					{isPrivate ? <Private isPrivate={isPrivate} /> : <Course isPrivate={isPrivate} />}
				</div>
			</div>
		</div>
	);
};

export default Service;
