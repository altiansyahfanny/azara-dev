import { FaCheckCircle } from 'react-icons/fa';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { BadgeBestSeller, PatternModal, PatternOurSpecialist, IcBook } from '@/assets/landing/svg';

import { Dialog, DialogContent, DialogTrigger } from '@/components/landing-page/dialog';

const Card = () => (
	<div className="bg-white rounded-lg w-[250px] relative shadow-lg p-4 border flex flex-col">
		<img
			src={BadgeBestSeller}
			alt=""
			className="absolute -right-[18px] -top-4 w-24 aspect-square"
		/>
		<div className="bg-white rounded-lg ">
			<h3 className="text-sm">Basic</h3>
			<p className="text-2xl font-medium">
				IDR. 175.000 <span className="text-sm">/ session</span>
			</p>
		</div>
		<hr className="my-4" />
		<ul className="text-sm gap-1.5 flex flex-col">
			<li className=" flex items-center gap-2">
				<FaCheckCircle className="text-custom-green" />
				<p>Lorem Ipsum </p>
			</li>
			<li className=" flex items-center gap-2">
				<FaCheckCircle className="text-custom-green" />
				<p>Lorem Ipsum dolor si amet</p>
			</li>
			<li className=" flex items-center gap-2">
				<FaCheckCircle className="text-custom-green" />
				<p>Lorem Ipsum dolor si</p>
			</li>
			<li className=" flex items-center gap-2">
				<FaCheckCircle className="text-custom-green" />
				<p>Lorem Ipsum </p>
			</li>
			<li className=" flex items-center gap-2">
				<FaCheckCircle className="text-custom-green" />
				<p>Lorem Ipsum dolor si amet</p>
			</li>
			<li className=" flex items-center gap-2">
				<FaCheckCircle className="text-custom-green" />
				<p>Lorem Ipsum dolor si amet</p>
			</li>
			<li className=" flex items-center gap-2">
				<FaCheckCircle className="text-custom-green" />
				<p>Lorem Ipsum dolor si amet</p>
			</li>
		</ul>
		<hr className="my-4" />
		<button className="bg-custom-green text-white px-5 py-1 rounded-full self-center text-sm">
			Select
		</button>
	</div>
);

const CardCourse = ({ text }: { text: string }) => {
	return (
		<div className="grid place-content-center">
			<div className="bg-custom-gray text-white w-[250px] pb-4 px-4 pt-10 rounded-xl relative">
				<div className="absolute -top-4 bg-white w-10 aspect-square grid place-content-center rounded-full">
					<img src={IcBook} alt="" />
				</div>
				<h1 className="text-2xl">
					PRIVAT <br /> {text}
				</h1>
				<p className="mt-4 text-sm">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae malesuada arcu, nec
					rutrum orci. Morbi arcu arcu, commodo sed quam ut, venenatis dictum augue. Quisque at diam
					sed ante iaculis dapibus non id ipsum.
				</p>
				<hr className="my-4" />
				<div className="flex items-center justify-center">
					<button className="bg-[#303237] text-custom-green px-5 py-1 text-xs rounded-lg">
						Preview
					</button>
				</div>
			</div>
		</div>
	);
};

const Service = () => {
	return (
		<Dialog>
			<div id="service" className="relative py-12 bg-custom-black px-5">
				<div className="absolute overflow-hidden inset-0">
					<div className="absolute right-0 -left-24 top-32 bottom-0 hidden xl:block 2xl:hidden">
						<img src={PatternOurSpecialist} className="w-full" />
					</div>
				</div>
				<h1 className="text-center font-semibold text-4xl text-white">
					We <span className="text-custom-green">specialize</span> in the following
					<br />
					<span className="text-custom-green">private</span> session
				</h1>
				<div className="mt-16 flex justify-center gap-4 z-10 relative">
					<DialogTrigger asChild>
						<button className="bg-custom-green text-white px-5 py-2 rounded-lg">Private</button>
					</DialogTrigger>
					<button className="bg-custom-gray text-white px-5 py-2 rounded-lg">Course</button>
				</div>
				<div className="mt-16 gap-8 flex flex-wrap justify-center">
					<CardCourse text="5-6 SD" />
					<CardCourse text="7-9 SMP" />
					<CardCourse text="10-12 SMA" />
				</div>
				<div className="absolute -bottom-5 left-0 right-0 mx-auto w-12 h-12 bg-custom-gray grid place-content-center rounded-full cursor-pointer">
					<MdKeyboardDoubleArrowDown className="text-white text-2xl" />
				</div>
			</div>

			<DialogContent className="xl:max-w-3xl">
				<div className="bg-red-200x w-full h-full relative">
					<img src={PatternModal} className="absolute left-0 -top-20 hidden xl:block" />
					<div className="p-6">
						<h2 className="text-3xl text-center mb-8">Our Special Offers</h2>
						<div className="flex items-center justify-center">
							<Card />
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Service;
