import { z } from 'zod';

export const createCourseSchema = z.object({
	courseName: z.string().min(3, 'Nama Mata Pelajaran harus memiliki minimal 3 karakter'),
	description: z.string().min(8, 'Keterangan harus memiliki minimal 8 karakter'),
});
