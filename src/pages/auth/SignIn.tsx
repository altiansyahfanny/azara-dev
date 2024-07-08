import { useLoginExternalMutation, useLoginMutation } from '@/api/authApi';
import { Logo } from '@/assets/landing/img';
import { InputPassword } from '@/components/landing-page/input-password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/AuthLayout';
import { SignInRequest } from '@/model/auth';
import { signInSchema } from '@/schema/auth';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { DecodedToken } from '@/types/auth.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleLogin } from '@react-oauth/google';
import axios, { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInRequest>({
		resolver: zodResolver(signInSchema),
		mode: 'onBlur',
		// defaultValues: {
		// 	email: 'johndoe@gmail.com',
		// 	password: 'test123',
		// },
	});

	const [login, { isLoading }] = useLoginMutation();
	const [loginExternal] = useLoginExternalMutation();

	const onSubmit = async (payload: SignInRequest) => {
		try {
			const {
				data: { token, refreshToken },
			} = await login(payload).unwrap();
			const { role }: DecodedToken = jwtDecode(token);

			// console.log('SignIn -> onFinish -> success : ', token);

			localStorage.setItem('token', token);
			localStorage.setItem('refreshToken', refreshToken);

			if (role === 'admin' || role === 'teacher') {
				navigate('/dashboard', { replace: true });
			} else {
				navigate('/', { replace: true });
			}
		} catch (err) {
			const error = err as ApiResponse<ErrorResponse>;
			// console.log('SignIn -> onFinish -> error : ', error);
			toast.error(error.data.message);
		}
	};

	const loginWithGoogle = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			try {
				const response: AxiosResponse<{ email: string }> = await axios.get(
					'https://www.googleapis.com/oauth2/v3/userinfo',
					{
						headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
					}
				);

				// console.log('response google : ', response);

				if (response) {
					try {
						const payload = {
							email: response.data.email,
						};

						const {
							data: { token, refreshToken },
						} = await loginExternal(payload).unwrap();

						localStorage.setItem('token', token);
						localStorage.setItem('refreshToken', refreshToken);
						navigate('/');
					} catch (err) {
						const error = err as ApiResponse<ErrorResponse>;
						toast.error(error.data.message);
						// console.log('error third party : ', error.data.message);
					}
				}
			} catch (error) {
				toast.error('Login failed!');
				// console.log('error : ', error);
			} finally {
				setLoading(false);
			}
		},
		onError: () => {
			toast.error('Login gagal!');
		},
	});

	return (
		<AuthLayout>
			<form
				className="mx-auto grid min-w-[270px] md:min-w-[350px]"
				onSubmit={handleSubmit(onSubmit)}
				autoComplete="off"
			>
				<div className="grid gap-2 text-center justify-center">
					<img src={Logo} className="w-52" />
				</div>
				<div className="grid gap-4 mt-8">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="text"
							// placeholder="m@example.com"
							autoComplete="off"
							{...register('email')}
						/>
						{errors.email && <p className="text-red-500">{errors.email.message}</p>}
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Kata Sandi</Label>
						</div>
						<InputPassword id="password" autoComplete="off" {...register('password')} />
						{errors.password && <p className="text-red-500">{errors.password.message}</p>}
					</div>
					<div className="grid gap-2">
						<Button
							type="button"
							className="w-full flex items-center gap-2"
							variant="outline"
							onClick={() => {
								setLoading(true);
								loginWithGoogle();
							}}
							disabled={loading || isLoading}
						>
							<FaGoogle />
							Masuk dengan Google
						</Button>

						<Button type="submit" className="w-full" disabled={loading || isLoading}>
							Masuk
						</Button>
					</div>
				</div>
				{/* <div className="mt-4 text-center text-sm">
					Don&apos;t have an account? &nbsp;
					<Link to="/sign-up" className="underline">
						Sign up
					</Link>
				</div> */}
				<div className="mt-4 text-center text-sm">
					Kembali ke &nbsp;
					<Link to="/" className="underline">
						Beranda
					</Link>
				</div>
			</form>
		</AuthLayout>
	);
}
