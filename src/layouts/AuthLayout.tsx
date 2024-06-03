import { SignInImg } from '@/assets/dashboard/img';
import { PatternBottom, PatternLeft } from '@/assets/dashboard/svg';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full flex justify-center items-center xl:grid xl:grid-cols-3 min-h-screen max-h-screen ">
			<div className="hidden xl:block col-span-2 h-full">
				<img
					src={SignInImg}
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover  brightness-90"
				/>
			</div>
			<div className="flex items-center justify-center relative h-full overflow-hidden">
				<img
					src={PatternLeft}
					className="hidden xl:block w-80 h-80 absolute -top-20 -left-4 -z-50"
				/>
				<img
					src={PatternBottom}
					className="hidden xl:block absolute bottom-10 -left-12 scale-125 -z-50"
				/>

				<div className="border px-8 py-12 relative overflow-hidden rounded-lg xl:border-none">
					{children}
				</div>
			</div>
		</div>
	);
}
