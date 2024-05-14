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

export { signUpSchema };
