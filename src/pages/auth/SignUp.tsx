import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignInImg } from '@/assets/img';

export default function SignUp() {
	const navigate = useNavigate();
	return (
		<div className="w-full grid grid-cols-3 min-h-screen">
			<div className="hidden bg-muted lg:block col-span-2">
				<img
					src={SignInImg}
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px]">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Register</h1>
					</div>
					<div className="grid gap-4 mt-8">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="m@example.com" required />
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input id="password" type="password" required />
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Confirm Password</Label>
							</div>
							<Input id="password" type="password" required />
						</div>
						<Button type="submit" className="w-full" onClick={() => navigate('/dashboard')}>
							Sign Up
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account? &nbsp;
						<Link to="/sign-in" className="underline">
							Sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
