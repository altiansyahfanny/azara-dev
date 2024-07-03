import ServiceCard from './service-card';

const PRIVATE_SERVICE = [
	{
		title: 'PRIVAT SD',
		description: () => (
			<p>
				Satu sesi durasi 1.5 - 2 jam, mata pelajaran mengikuti permintaan siswa. Jam belajar serta
				pertemuan belajar flexible disesuaikan dengan kebutuhan. Kurikulum juga menyesuaikan dengan
				sekolah siswa
			</p>
		),
		service: {
			title: 'Paket Kelas SD',
			items: [
				{
					title: 'Paket Privat SD',
					price: '150.000',
					details: [
						'Jam belajar serta pertemuan belajar flexible',
						'Bimbingan Pekerjaan Rumah',
						'Kurikulum menyesuaikan sekolah siswa',
					],
				},
			],
		},
	},
	{
		title: 'PRIVAT SMP',
		description: () => (
			<p>
				Satu sesi durasi 1.5 - 2 jam, mata pelajaran mengikuti permintaan siswa. Jam belajar serta
				pertemuan belajar flexible disesuaikan dengan kebutuhan. Kurikulum juga menyesuaikan dengan
				sekolah siswa
			</p>
		),
		service: {
			title: 'Paket Kelas SMP',
			items: [
				{
					title: 'Paket Privat SMP',
					price: '175.000',
					details: [
						'Jam belajar serta pertemuan belajar flexible',
						'Bimbingan Pekerjaan Rumah',
						'Kurikulum menyesuaikan sekolah siswa',
					],
				},
			],
		},
	},
	{
		title: 'PRIVAT SMA',
		description: () => (
			<p>
				Satu sesi durasi 1.5 - 2 jam, mata pelajaran mengikuti permintaan siswa. Jam belajar serta
				pertemuan belajar flexible disesuaikan dengan kebutuhan. Kurikulum juga menyesuaikan dengan
				sekolah siswa
			</p>
		),
		service: {
			title: 'Paket Kelas SMA',
			items: [
				{
					title: 'Paket Privat SMA Kelas 10 dan 11 IPA/IPS',
					price: '175.000',
					details: [
						'Jam belajar serta pertemuan belajar flexible',
						'Bimbingan Pekerjaan Rumah',
						'Kurikulum menyesuaikan sekolah siswa',
					],
				},
				{
					title: 'Paket Privat SMA Kelas 12 IPA/IPS',
					price: '200.000',
					details: [
						'Jam belajar serta pertemuan belajar flexible',
						'Bimbingan Pekerjaan Rumah',
						'Kurikulum menyesuaikan sekolah siswa',
					],
				},
			],
		},
	},
];

const Private = ({ isPrivate }: { isPrivate: boolean }) => {
	return PRIVATE_SERVICE.map((data, i) => (
		<ServiceCard
			key={i}
			text={data.title}
			isPrivate={isPrivate}
			description={data.description()}
			data={data.service}
		/>
	));
};

export default Private;
