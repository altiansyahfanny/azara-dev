import { SignInImg } from '@/assets/img';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { z } from 'zod';

const signUpSchema = z
	.object({
		email: z.string().email({ message: 'Email tidak valid' }),
		password: z.string().min(8, { message: 'Password harus minimal 8 karakter' }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password dan konfirmasi password harus sama',
		path: ['confirmPassword'],
	});

export default function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(signUpSchema) });
	// const navigate = useNavigate();

	const onSubmit = (data: any) => {
		console.log(data);
		// navigate('/dashboard');
	};

	console.log('errors', errors);

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
						<h1 className="text-3xl font-bold">Register</h1>
					</div>
					<div className="grid gap-4 mt-8">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								{...register('email', { required: true })}
							/>
							{errors.email && (
								<span className="text-red-500 text-sm">
									{(errors.email.message as string) ?? 'Error pada email'}
								</span>
							)}
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input
								id="password"
								type="password"
								{...register('password', { required: true })}
								autoComplete="off"
							/>
							{errors.password && (
								<span className="text-red-500 text-sm">
									{(errors.password.message as string) ?? 'Error pada password'}
								</span>
							)}
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="confirmPassword">Confirm Password</Label>
							</div>
							<Input
								id="confirmPassword"
								type="password"
								{...register('confirmPassword', { required: true })}
								autoComplete="off"
							/>
							{errors.confirmPassword && (
								<span className="text-red-500 text-sm">
									{(errors.confirmPassword.message as string) ?? 'Error pada konfirmasi password'}
								</span>
							)}
						</div>
						<Button type="submit" className="w-full">
							Sign Up
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account? &nbsp;
						<Link to="/sign-in" className="underline">
							Sign in
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
