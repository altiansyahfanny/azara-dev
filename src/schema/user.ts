import { z } from 'zod';

export const createUserSchema = z.object({
	email: z.string().email('Email tidak valid'),
	firstName: z.string().min(3, 'Nama Depan Pelajaran harus memiliki 3 minimal karakter'),
	lastName: z.string().min(3, 'Nama Belakang Pelajaran harus memiliki 3 minimal karakter'),
	role: z.string().min(1, 'Role tidak boleh kosong'),
	password: z.string().min(1, 'Password tidak boleh kosong'),
});
