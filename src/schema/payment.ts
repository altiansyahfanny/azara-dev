import { z } from "zod";

export const createPaymentSchema = z.object({
    bankName: z
        .string({ required_error: "Nama Bank tidak boleh kosong" })
        .min(1, "Nama Bank tidak boleh kosong"),

    accountNumber: z
        .string({ required_error: "Nomor Rekening tidak boleh kosong" })
        .min(1, "Nomor Rekening tidak boleh kosong"),

    recipientName: z
        .string({ required_error: "Nama Penerima tidak boleh kosong" })
        .min(1, "Nama Penerima tidak boleh kosong"),

    paymentDate: z.date({
        required_error: "Tanggal Pembayaran tidak boleh kosong",
    }),

    teacherId: z
        .number({ required_error: "Guru tidak boleh kosong" })
        .min(1, "Guru tidak boleh kosong"),

    amount: z
        .string({ required_error: "Jumlah tidak boleh kosong" })
        .min(1, "Jumlah tidak boleh kosong"),
});

export const updatePaymentHistorySchema = z.object({
    bankName: z
        .string({ required_error: "Nama Bank tidak boleh kosong" })
        .min(1, "Nama Bank tidak boleh kosong"),
    paymentDate: z.date({
        required_error: "Tanggal Pembayaran tidak boleh kosong",
    }),
});
