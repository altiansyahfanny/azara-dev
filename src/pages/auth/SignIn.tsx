import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignInImg } from '@/assets/img';
import { SignInRequest } from '@/model/auth';
import { signInSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function SignIn() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInRequest>({ resolver: zodResolver(signInSchema) });

	const onSubmit = (data: SignInRequest) => {
		console.log(data);
		navigate('/dashboard');
	};

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
				<form
					className="mx-auto grid w-[350px]"
					onSubmit={handleSubmit(onSubmit)}
					autoComplete="off"
				>
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
					</div>
					<div className="grid gap-4 mt-8">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								autoComplete="off"
								{...register('email')}
							/>
							{errors.email && <p className="text-red-500">{errors.email.message}</p>}
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input id="password" type="password" autoComplete="off" {...register('password')} />
							{errors.password && <p className="text-red-500">{errors.password.message}</p>}
						</div>
						<Button type="submit" className="w-full">
							Login
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account? &nbsp;
						<Link to="/sign-up" className="underline">
							Sign up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
