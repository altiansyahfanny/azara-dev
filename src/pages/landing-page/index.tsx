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
				<a href="https://api.whatsapp.com/send?phone=081292856047" target="_blank">
					<img src={IcWhatsapp} className="w-12" />
				</a>
			</div>
		</div>
	);
};

export default LandingPage;
