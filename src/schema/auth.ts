import { z } from 'zod';

const signUpSchema = z
	.object({
		email: z.string({ required_error: 'Email tidak boleh kosong' }).email('Email tidak valid'),
		password: z
			.string({ required_error: 'Kata Sandi tidak boleh kosong' })
			.min(8, 'Kata Sandi harus memiliki minimal 8 karakter'),
		confirmPassword: z
			.string({ required_error: 'Konfirmasi Kata Sandi tidak boleh kosong' })
			.min(8),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Kata Sandi harus sama dengan Konfirmasi Kata Sandi',
		path: ['confirmPassword'],
	});

const signInSchema = z.object({
	email: z.string({ required_error: 'Email tidak boleh kosong' }).email('Email tidak valid'),
	password: z
		.string({ required_error: 'Kata Sandi tidak boleh kosong' })
		.min(1, 'Kata Sandi tidak boleh kosong'),
});

export { signUpSchema, signInSchema };
