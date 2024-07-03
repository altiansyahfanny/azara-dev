import { DummyImg1, DummyImg2 } from '@/assets/landing/img';

const Statistic = () => {
	return (
		<div className="px-5 lg:px-40">
			<div className="lg:flex gap-8">
				<div className="lg:flex-1 flex gap-4 h-full">
					<div className="w-8/12 pt-4 pb-10">
						<img src={DummyImg2} alt="" />
					</div>
					<div className="w-4/12 flex-col gap-4 flex">
						<div className="bg-custom-green py-4 rounded-lg text-center text-white">
							<h1 className="font-bold text-7xl 2xl:text-[5.5rem]">4+</h1>
							<p className="2xl:text-xl">Tahun Pengalaman</p>
						</div>
						<img src={DummyImg1} alt="" />
					</div>
				</div>
				<div className="lg:flex-1 mt-12 lg:mt-0">
					<h1 className="text-3xl 2xl:text-5xl font-bold">
						Paket Intensif <br className="" /> Kelas 12
					</h1>
					<div className="h-1 w-40 bg-gray-900 mt-4" />
					<div className="mt-12 2xl:text-2xl">
						<p>
							Program Intensif UTBK untuk Siswa Kelas 12 SMA adalah program bimbingan belajar yang
							berfokus mempelajari mata pelajaran&nbsp;
							<span className="text-custom-light-green">
								Matematika, IPA (Fisika, Kimia, Biologi),
							</span>
							&nbsp; dan &nbsp;
							<span className="text-custom-light-green">
								Tujuh subtest materi Ujian Tulis Berbasis Komputer (UTBK).
							</span>
						</p>
						<ul className="mt-6">
							<li className="flex items-center gap-2">
								<div className="bg-custom-green rounded-full h-2 aspect-square" />
								Pengajar Profesional dan Berpengalaman
							</li>
							<li className="flex items-center gap-2">
								<div className="bg-custom-green rounded-full h-2 aspect-square" />
								Metode Pembelajaran Modern dan Efektif
							</li>
							<li className="flex items-center gap-2">
								<div className="bg-custom-green rounded-full h-2 aspect-square" />
								Pendekatan Personal dan Fleksibel
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Statistic;
