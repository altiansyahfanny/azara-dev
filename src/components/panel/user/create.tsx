import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { createUserSchema } from '@/schema/user';
import { useAddUserMutation } from '@/api/userApi';
import { setModalState } from '@/store/features/userSlice';
import { useAppDispatch } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { InputPassword } from '@/components/landing-page/input-password';

export default function CreateUser() {
	const dispatch = useAppDispatch();

	const [create, { isLoading }] = useAddUserMutation();

	const form = useForm<z.infer<typeof createUserSchema>>({
		resolver: zodResolver(createUserSchema),
		mode: 'onChange',
		defaultValues: {
			email: 'user@gmail.com',
			firstName: 'Pengguna',
			lastName: 'Azara',
			password: 'password-pengguna-1',
		},
	});

	const onSubmit = async (payload: z.infer<typeof createUserSchema>) => {
		try {
			const result = await create(payload).unwrap();
			dispatch(setModalState({ value: { modalCreate: false } }));
			console.log('CreateUser -> onFinish -> success : ', result.message);
			toast.success(result.message);
		} catch (err) {
			const error = err as ApiResponse<ErrorResponse>;
			console.log('CreateUser -> onFinish -> error : ', error.data.message);
			toast.error(error.data.message);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							{/* <FormDescription>This is your public display name.</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama Depan</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							{/* <FormDescription>This is your public display name.</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama Belakang</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Kata Sandi</FormLabel>
							<FormControl>
								<InputPassword {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Role" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="teacher">Teacher</SelectItem>
									<SelectItem value="student">Student</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-2 items-center justify-end">
					<Button type="submit" disabled={isLoading}>
						Simpan
					</Button>
					{/* <Button type="reset" variant={'outline'} disabled={isLoading}>
						Batal
					</Button> */}
				</div>
			</form>
		</Form>
	);
}
