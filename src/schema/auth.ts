import { z } from 'zod';

const signUpSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8),
		confirmPassword: z.string().min(8),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password do not match',
		path: ['confirmPassword'],
	});

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

export { signUpSchema, signInSchema };
