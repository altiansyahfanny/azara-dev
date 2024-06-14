import PriceCard from './price-card';
import ServiceCard from './service-card';

const Private = ({ isPrivate }: { isPrivate: boolean }) => {
	return (
		<>
			<ServiceCard
				text="PRIVAT SD"
				isPrivate={isPrivate}
				description={
					<p>
						Satu sesi durasi 1.5 - 2 jam, mata pelajaran mengikuti permintaan siswa. Jam belajar
						serta pertemuan belajar flexible disesuaikan dengan kebutuhan. Kurikulum juga
						menyesuaikan dengan sekolah siswa
					</p>
				}
			/>
			<ServiceCard
				text="PRIVAT SMP"
				isPrivate={isPrivate}
				description={
					<p>
						Satu sesi durasi 1.5 - 2 jam, mata pelajaran mengikuti permintaan siswa. Jam belajar
						serta pertemuan belajar flexible disesuaikan dengan kebutuhan. Kurikulum juga
						menyesuaikan dengan sekolah siswa
					</p>
				}
			/>
			<ServiceCard
				text="PRIVAT SMA"
				isPrivate={isPrivate}
				description={
					<p>
						Satu sesi durasi 1.5 - 2 jam, mata pelajaran mengikuti permintaan siswa. Jam belajar
						serta pertemuan belajar flexible disesuaikan dengan kebutuhan. Kurikulum juga
						menyesuaikan dengan sekolah siswa
					</p>
				}
			/>
		</>
	);
};

const Price = ({ isPrivate }: { isPrivate: boolean }) => {
	return (
		<div className="flex items-center justify-center gap-4 ">
			<PriceCard isBestSeller={true} isPrivate={isPrivate} />
		</div>
	);
};

Private.Price = Price;

export default Private;
