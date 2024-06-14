import PriceCard from './price-card';
import ServiceCard from './service-card';

const Course = ({ isPrivate }: { isPrivate: boolean }) => {
	return (
		<>
			<ServiceCard
				text="KELAS SD"
				isPrivate={isPrivate}
				description={
					<p>
						Mempelajari <span className="text-custom-green">semua mata</span> pelajaran{' '}
						<span className="text-custom-green">kecuali Bahasa Inggris</span>. 3x pertemuan dalam
						seminggu, durasi 2 jam. Kurikulum menyesuaikan dengan pemerintah (Kurikulum Merdeka)
					</p>
				}
			/>
			<ServiceCard
				text="KELAS SMP"
				isPrivate={isPrivate}
				description={
					<p>
						Fokus terhadap 4 mata pelajaran :{' '}
						<span className="text-custom-green">
							Matematika, IPA, Bahasa Indonesia dan Bahasa Inggris
						</span>
						. 3x pertemuan dalam seminggu, durasi 2 jam. Kurikulum menyesuaikan dengan pemerintah
						(Kurikulum Merdeka)
					</p>
				}
			/>
			<ServiceCard
				text="KELAS SMA"
				isPrivate={isPrivate}
				description={
					<p>
						Fokus terhadap pelajaran{' '}
						<span className="text-custom-green">Matematika, IPA (Fisika, Kimia, Biologi)</span> dan{' '}
						<span className="text-custom-green">IPS (Geografi, Ekonomi, Sosiologi)</span>. 3x
						pertemuan dalam seminggu, durasi 2 jam. Kurikulum menyesuaikan dengan pemerintah
						(Kurikulum Merdeka)
					</p>
				}
			/>
		</>
	);
};

const Price = ({ isPrivate }: { isPrivate: boolean }) => {
	return (
		<div className="flex flex-col xl:flex-row items-center justify-center gap-4 ">
			<PriceCard />
			<PriceCard isBestSeller={true} isPrivate={isPrivate} />
			<PriceCard />
		</div>
	);
};

Course.Price = Price;

export default Course;
