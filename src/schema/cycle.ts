import { z } from 'zod';

export const createCycleSchema = z.object({
	startDate: z.date({
		required_error: 'Tanggal Mulai tidak boleh kosong',
	}),
	endDate: z.date({
		required_error: 'Tanggal Selesai tidak boleh kosong',
	}),
	description: z
		.string({ required_error: 'Keterangan tidak boleh kosong' })
		.min(8, 'Keterangan harus memiliki minimal 8 karakter'),
});

export const updateCycleSchema = z.object({
	startDate: z.date({
		required_error: 'Tanggal Mulai tidak boleh kosong',
	}),
	endDate: z.date({
		required_error: 'Tanggal Selesai tidak boleh kosong',
	}),
	description: z
		.string({ required_error: 'Keterangan tidak boleh kosong' })
		.min(8, 'Keterangan harus memiliki minimal 8 karakter'),
});
