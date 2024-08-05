import { z } from 'zod';

export const createCourseSchema = z.object({
	courseName: z
		.string({ required_error: 'Nama Mata Pelajaran tidak boleh kosong' })
		.min(3, 'Nama Mata Pelajaran harus memiliki minimal 3 karakter'),
	description: z
		.string({ required_error: 'Keterangan tidak boleh kosong' })
		.min(8, 'Keterangan harus memiliki minimal 8 karakter'),
});

export const updateCourseSchema = z.object({
	courseName: z
		.string({ required_error: 'Nama Mata Pelajaran tidak boleh kosong' })
		.min(3, 'Nama Mata Pelajaran harus memiliki minimal 3 karakter'),
	description: z
		.string({ required_error: 'Keterangan tidak boleh kosong' })
		.min(8, 'Keterangan harus memiliki minimal 8 karakter'),
});
