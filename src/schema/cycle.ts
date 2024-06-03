import { z } from 'zod';

export const createCycleSchema = z.object({
	startDate: z.string().min(1, 'Tanggal Mulai tidak boleh kosong'),
	endDate: z.string().min(1, 'Tanggal Selesai tidak boleh kosong'),
	description: z.string().min(8, 'Keterangan harus memiliki minimal 8 karakter'),
});
