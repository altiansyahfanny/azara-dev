import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/AuthLayout';
import { SignUpRequest } from '@/model/auth';
import { signUpSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpRequest>({ resolver: zodResolver(signUpSchema) });

	const onSubmit = (data: SignUpRequest) => {
		console.log(data);
		navigate('/sign-in');
	};

	return (
		<AuthLayout>
			<form className="mx-auto grid w-[350px]" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
						{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
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
							<span className="text-red-500 text-sm">{errors.password.message}</span>
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
							<span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
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
		</AuthLayout>
	);
}
