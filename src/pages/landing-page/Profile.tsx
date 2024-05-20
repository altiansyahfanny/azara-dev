import { DummyImg1, DummyImg2 } from '@/assets/landing/img';
import { PatternProfile } from '@/assets/landing/svg';
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
					<h1 className="text-3xl font-bold">PROFILE</h1>
					<p className="mt-6">
						<span className="text-custom-green">Lorem ipsum</span> dolor sit amet, consectetur
						adipiscing elit. Aenean vitae malesuada arcu, nec rutrum orci. Morbi arcu arcu, commodo
						sed quam ut, venenatis dictum augue. Quisque at diam sed ante iaculis dapibus non id
						ipsum. Quisque tincidunt arcu posuere pharetra commodo. Nunc faucibus ipsum aliquam
						ipsum facilisis, quis pulvinar tortor suscipit. Proin aliquet elementum tellus ac
						ornare. Vestibulum laoreet id metus et venenatis.
					</p>
				</div>
				<div className="mt-32">
					<Statistic />
				</div>
				<div className="mt-32 px-5 lg:px-40">
					<div className="lg:flex gap-8">
						<div className="lg:flex-1 flex gap-4 h-full">
							<div className="w-8/12 pt-4 pb-10">
								<img src={DummyImg2} alt="" />
							</div>
							<div className="w-4/12 flex-col gap-4 flex">
								<div className="bg-custom-green py-4 rounded-lg text-center text-white">
									<h1 className="font-bold text-7xl ">4+</h1>
									<p>Year of Experience</p>
								</div>
								<img src={DummyImg1} alt="" />
							</div>
						</div>
						<div className="lg:flex-1 mt-12 lg:mt-0">
							<h1 className="text-3xl font-bold">
								Defining the future of <br /> online experiences!
							</h1>
							<div className="h-1 w-40 bg-gray-900 mt-4" />
							<div className="mt-12">
								<p>
									Embrace a new era of digital success with Mizzle. Our team combines cutting-edge
									design with robust development to deliver websites that captivate and convert.
								</p>
								<ul className="mt-6">
									<li className="flex items-center gap-2">
										<div className="bg-custom-green rounded-full h-2 aspect-square" />
										Emphasis on ROI-driven solutions
									</li>
									<li className="flex items-center gap-2">
										<div className="bg-custom-green rounded-full h-2 aspect-square" />
										Expert team with diverse skill
									</li>
									<li className="flex items-center gap-2">
										<div className="bg-custom-green rounded-full h-2 aspect-square" />
										Proven track record of delivering results
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
