import { z } from "zod";

export const createUserSchema = z.object({
    email: z
        .string({ required_error: "Email tidak boleh kosong" })
        .email("Email tidak valid"),
    firstName: z
        .string({ required_error: "Nama Depan tidak boleh kosong" })
        .min(3, "Nama Depan harus memiliki 3 minimal karakter")
        .regex(/^[A-Za-z\s]+$/, {
            message: "Nama Depan hanya boleh mengandung huruf",
        }),
    lastName: z
        .string({ required_error: "Nama Belakang tidak boleh kosong" })
        .min(3, "Nama Belakang harus memiliki 3 minimal karakter")
        .regex(/^[A-Za-z\s]+$/, {
            message: "Nama Belakang hanya boleh mengandung huruf",
        }),
    role: z
        .string({ required_error: "Role tidak boleh kosong" })
        .min(1, "Role tidak boleh kosong"),
    password: z
        .string({ required_error: "Kata Sandi tidak boleh kosong" })
        .min(1, "Password tidak boleh kosong"),
});

export const updateUserPasswordSchema = z.object({
    oldPassword: z
        .string({ required_error: "Password Sekarang tidak boleh kosong" })
        .min(1, "Password Sekarang tidak boleh kosong"),
    newPassword: z
        .string({ required_error: "Password tidak boleh kosong" })
        .min(5, "Password harus memiliki 5 minimal karakter"),
});

export const updateUserSchema = z.object({
    firstName: z
        .string({ required_error: "Nama Depan tidak boleh kosong" })
        .min(3, "Nama Depan harus memiliki 3 minimal karakter")
        .regex(/^[A-Za-z\s]+$/, {
            message: "Nama Depan hanya boleh mengandung huruf",
        }),
    lastName: z
        .string({ required_error: "Nama Belakang tidak boleh kosong" })
        .min(3, "Nama Belakang harus memiliki 3 minimal karakter")
        .regex(/^[A-Za-z\s]+$/, {
            message: "Nama Belakang hanya boleh mengandung huruf",
        }),
    address: z
        .string({ required_error: "Alamat tidak boleh kosong" })
        .min(3, "Alamat harus memiliki 3 minimal karakter"),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
});
