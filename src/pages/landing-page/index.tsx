import Home from './Home';
import Footer from './Footer';
import Testimoni from './Testimoni';
import Navbar from '@/components/landing-page/navbar';
import Service from './Service';
import Profile from './Profile';
import { IcWhatsapp } from '@/assets/landing/svg';

const LandingPage = () => {
	const screenHeight = window.innerHeight;
	console.log('screenHeight : ', screenHeight);
	return (
		<div id="landing" className="relative overflow-hidden">
			<Navbar />
			<div className="mt-[80px]">
				<Home />
				<Profile />
				<Service />
				<Testimoni />
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
