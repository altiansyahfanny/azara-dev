import { z } from "zod";

export const createPaymentSchema = z.object({
    accountNumber: z
        .string({ required_error: "Nomor Rekening tidak boleh kosong" })
        .min(1, "Nomor Rekening tidak boleh kosong"),

    reciptmentName: z
        .string({ required_error: "Nama Penerima tidak boleh kosong" })
        .min(1, "Nama Penerima tidak boleh kosong"),

    paymentDate: z.date({
        required_error: "Tanggal Pembayaran tidak boleh kosong",
    }),

    teacherId: z
        .string({ required_error: "Guru tidak boleh kosong" })
        .min(1, "Guru tidak boleh kosong"),
});

export const updatePaymentSchema = z.object({
    accountNumber: z
        .string({ required_error: "Nomor Rekening tidak boleh kosong" })
        .min(1, "Nomor Rekening tidak boleh kosong"),

    reciptmentName: z
        .string({ required_error: "Nama Penerima tidak boleh kosong" })
        .min(1, "Nama Penerima tidak boleh kosong"),

    paymentDate: z.date({
        required_error: "Tanggal Pembayaran tidak boleh kosong",
    }),

    teacherId: z
        .string({ required_error: "Guru tidak boleh kosong" })
        .min(1, "Guru tidak boleh kosong"),
});
