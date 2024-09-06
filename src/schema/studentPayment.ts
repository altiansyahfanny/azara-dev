import { z } from 'zod';

export const createStudentPaymentSchema = z.object({
	bankName: z
		.string({ required_error: 'Nama Bank tidak boleh kosong' })
		.min(1, 'Nama Bank tidak boleh kosong'),

	accountNumber: z
		.string({ required_error: 'Nomor Rekening tidak boleh kosong' })
		.min(1, 'Nomor Rekening tidak boleh kosong'),

	paymentDate: z.date({
		required_error: 'Tanggal Pembayaran tidak boleh kosong',
	}),

	forMonth: z.date({
		required_error: 'Untuk Bulan tidak boleh kosong',
	}),

	enrollmentId: z
		.number({ required_error: 'Enrollment tidak boleh kosong' })
		.min(1, 'Enrollment tidak boleh kosong'),

	studentId: z
		.number({ required_error: 'Stundent tidak boleh kosong' })
		.min(1, 'Stundent tidak boleh kosong'),

	discount: z
		.string({ required_error: 'Diskon tidak boleh kosong' })
		.min(1, 'Diskon tidak boleh kosong'),

	originalPrice: z
		.string({ required_error: 'Jumlah tidak boleh kosong' })
		.min(1, 'Jumlah tidak boleh kosong'),
});

export const updateStudentPaymentHistorySchema = z.object({
	recipientName: z
		.string({ required_error: 'Nama Penerima tidak boleh kosong' })
		.min(1, 'Nama Penerima tidak boleh kosong'),
	accountNumber: z
		.string({ required_error: 'Nomor Rekening tidak boleh kosong' })
		.min(1, 'Nomor Rekening tidak boleh kosong'),
	bankName: z
		.string({ required_error: 'Nama Bank tidak boleh kosong' })
		.min(1, 'Nama Bank tidak boleh kosong'),
	paymentDate: z.date({
		required_error: 'Tanggal Pembayaran tidak boleh kosong',
	}),
});
