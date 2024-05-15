import { SignInImg } from '@/assets/img';
import { PatternBottom, PatternLeft } from '@/assets/svg';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full grid grid-cols-3 min-h-screen">
			<div className="hidden bg-muted lg:block col-span-2">
				<img
					src={SignInImg}
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover  brightness-90"
				/>
			</div>
			<div className="flex items-center justify-center py-12 relative overflow-hidden">
				<img src={PatternLeft} className="w-80 h-80 absolute -top-20 -left-4 -z-50" />
				<img src={PatternBottom} className="absolute bottom-10 -left-12 scale-125 -z-50" />
				{children}
			</div>
		</div>
	);
}
