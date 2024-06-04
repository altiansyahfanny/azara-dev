import { z } from 'zod';

export const createClassroomSchema = z.object({
	classroomName: z.string().min(1, 'Nama Kelas tidak boleh kosong'),
	cycleId: z.string().min(1, 'Tahun Ajaran tidak boleh kosong'),
	price: z.number().min(0, 'Harga harus bernilai positif'),
});
