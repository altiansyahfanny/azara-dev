import { z } from 'zod';

export const createClassroomSchema = z.object({
	classroomName: z
		.string({ required_error: 'Nama Kelas tidak boleh kosong' })
		.min(1, 'Nama Kelas tidak boleh kosong'),
	cycleId: z
		.string({ required_error: 'Tahun Ajaran tidak boleh kosong' })
		.min(1, 'Tahun Ajaran tidak boleh kosong'),
	// price: z.number().min(0, 'Harga harus bernilai positif'),
	price: z
		.string({ required_error: 'Harga tidak boleh kosong' })
		.min(1, 'Harga tidak boleh kosong'),
});
export const updateClassroomSchema = z.object({
	classroomName: z
		.string({ required_error: 'Nama Kelas tidak boleh kosong' })
		.min(1, 'Nama Kelas tidak boleh kosong'),
	cycleId: z
		.string({ required_error: 'Tahun Ajaran tidak boleh kosong' })
		.min(1, 'Tahun Ajaran tidak boleh kosong'),
	// price: z.number().min(0, 'Harga harus bernilai positif'),
	price: z
		.string({ required_error: 'Harga tidak boleh kosong' })
		.min(1, 'Harga tidak boleh kosong'),
});
