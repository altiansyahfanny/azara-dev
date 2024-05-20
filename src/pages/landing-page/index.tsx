import Home from './Home';
import Footer from './Footer';
import Testimoni from './Testimoni';
import Navbar from '@/components/landing-page/navbar';
import Service from './Service';
import Profile from './Profile';

const LandingPage = () => {
	return (
		<div id="landing" className="relative overflow-hidden pb-[500p]">
			<Navbar />
			<div className="mt-[80px]">
				<Home />
				<Profile />
				<Service />
				<Testimoni />
				<Footer />
			</div>
		</div>
	);
};

export default LandingPage;
