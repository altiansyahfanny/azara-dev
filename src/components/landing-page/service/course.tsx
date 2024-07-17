import ServiceCard from './service-card';

const CLASS_SERVICE = [
	{
		title: 'KELAS SD',
		description: () => (
			<p>
				Mempelajari <span className="text-custom-green">semua mata</span> pelajaran{' '}
				<span className="text-custom-green">kecuali Bahasa Inggris</span>. 3x pertemuan dalam
				seminggu, durasi 2 jam. Kurikulum menyesuaikan dengan pemerintah (Kurikulum Merdeka)
			</p>
		),
		service: {
			title: 'Paket Kelas SD',
			items: [
				{
					title: 'Paket SD Kelas 4 dan 5',
					price: '550.000',
					details: [
						'Ruangan ber-AC',
						'Bimbingan Pekerjaan Rumah',
						'Lapangan parkir luas',
						'Pertemuan 3 kali dalam seminggu',
					],
				},
				{
					title: 'Paket SD Kelas 6',
					price: '575.000',
					details: [
						'Ruangan ber-AC',
						'Bimbingan Pekerjaan Rumah',
						'Lapangan parkir luas',
						'Pertemuan 3 kali dalam seminggu',
						'Bimbingan konsultsi sekolah menengah',
					],
				},
			],
		},
	},
	{
		title: 'KELAS SMP',
		description: () => (
			<p>
				Fokus terhadap 4 mata pelajaran :&nbsp;
				<span className="text-custom-green">
					Matematika, IPA, Bahasa Indonesia dan Bahasa Inggris
				</span>
				. 3x pertemuan dalam seminggu, durasi 2 jam. Kurikulum menyesuaikan dengan pemerintah
				(Kurikulum Merdeka)
			</p>
		),
		service: {
			title: 'Paket Kelas SMP',
			items: [
				{
					title: 'Paket SM Kelas 7 dan 8',
					price: '575.000',
					details: [
						'Ruangan ber-AC',
						'Bimbingan Pekerjaan Rumah',
						'Lapangan parkir luas',
						'Pertemuan 3 kali dalam seminggu',
					],
				},
				{
					title: 'Paket SMP Kelas 9',
					price: '600.000',
					details: [
						'Ruangan ber-AC',
						'Bimbingan Pekerjaan Rumah',
						'Lapangan parkir luas',
						'Pertemuan 3 kali dalam seminggu',
						'Bimbingan konsultsi sekolah menengah atas',
					],
				},
			],
		},
	},
	{
		title: 'KELAS SMA',
		description: () => (
			<p>
				Fokus terhadap pelajaran&nbsp;
				<span className="text-custom-green">Matematika, IPA (Fisika, Kimia, Biologi)</span>&nbsp;
				dan&nbsp;
				<span className="text-custom-green">IPS (Geografi, Ekonomi, Sosiologi)</span>. 3x pertemuan
				dalam seminggu, durasi 2 jam. Kurikulum menyesuaikan dengan pemerintah (Kurikulum Merdeka)
			</p>
		),
		service: {
			title: 'Paket Kelas SMA',
			items: [
				{
					title: 'Paket SMA Kelas 10 dan 11',
					price: '700.000',
					details: [
						'Ruangan ber-AC',
						'Bimbingan Pekerjaan Rumah',
						'Lapangan parkir luas',
						'Pertemuan 3 kali dalam seminggu',
					],
				},
			],
		},
	},
];

const Course = ({ isPrivate }: { isPrivate: boolean }) => {
	return CLASS_SERVICE.map((data, i) => (
		<ServiceCard
			key={i}
			text={data.title}
			isPrivate={isPrivate}
			description={data.description()}
			data={data.service}
		/>
	));
};

export default Course;
