import { IcWhatsapp } from '@/assets/landing/svg';
import Navbar from '@/components/landing-page/navbar';
import Footer from './Footer';
import Home from './Home';
import Profile from './Profile';
import Service from './Service';
import Statistic from './Statistic';
import Testimoni from './Testimoni';

const LandingPage = () => {
	return (
		<div id="landing" className="relative overflow-hidden">
			<Navbar />
			<div className="mt-[80px]">
				<Home />
				<Profile />
				<Service />
				<div className="relative pt-32" id="testimoni">
					<div className="absolute -z-50 inset-0 opacity-20x with-bg-img bg-contain opacity-10" />
					<Statistic />
					<Testimoni />
				</div>
				<Footer />
			</div>
			<div className="fixed bottom-4 right-4 z-50">
				<a
					href="https://api.whatsapp.com/send/?phone=6285693930497&text=Halo%21%20Saya%20tertarik%20untuk%20mendaftar%20menjadi%20murid%20di%20Azara%20Course%2C%20bagaimanakah%20prosedurnya%3F&type=phone_number&app_absent=0"
					target="_blank"
				>
					<img src={IcWhatsapp} className="w-12" />
				</a>
			</div>
		</div>
	);
};

export default LandingPage;
