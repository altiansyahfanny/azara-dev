import { z } from 'zod';

export const createUserSchema = z.object({
	email: z.string({ required_error: 'Email tidak boleh kosong' }).email('Email tidak valid'),
	firstName: z
		.string({ required_error: 'Nama Depan tidak boleh kosong' })
		.min(3, 'Nama Depan Pelajaran harus memiliki 3 minimal karakter'),
	lastName: z
		.string({ required_error: 'Nama Belakang tidak boleh kosong' })
		.min(3, 'Nama Belakang Pelajaran harus memiliki 3 minimal karakter'),
	role: z.string({ required_error: 'Role tidak boleh kosong' }).min(1, 'Role tidak boleh kosong'),
	password: z
		.string({ required_error: 'Kata Sandi tidak boleh kosong' })
		.min(1, 'Password tidak boleh kosong'),
});
