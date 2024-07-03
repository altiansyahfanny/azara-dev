// import { PatternProfile } from '@/assets/landing/svg';
import Statistic from '@/components/landing-page/profile/Statistic';

const Profile = () => {
	return (
		<div id="profile" className="relative py-12">
			{/* <img
				src={PatternProfile}
				className="absolute hidden xl:block 2xl:hidden -z-10 top-20 right-0"
			/> */}
			<div className="">
				<div className="px-5 lg:px-40 text-center z-10">
					<h1 className="text-3xl 2xl:text-5xl font-bold">PROFIL</h1>
					<p className="mt-6 2xl:text-xl">
						<span className="text-custom-green ">Azara Course</span> adalah sebuah bimbingan belajar
						yang telah berdiri selama lebih dari 10 tahun di Jakarta Selatan. Visi kami adalah
						memberikan pendidikan berkualitas dan menyeluruh yang tidak hanya berfokus pada
						keterampilan akademik, namun juga pengembangan karakter. Kami memastikan siswa dapat
						meraih cita-cita yang sesuai dengan kapasitas dan kemampuan mereka.
					</p>
				</div>
			</div>
			<div className="mt-32">
				<Statistic />
			</div>
		</div>
	);
};

export default Profile;
