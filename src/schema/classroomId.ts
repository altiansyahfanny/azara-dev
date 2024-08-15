import { z } from "zod";

export const assignTeacherAndCourseSchema = z.object({
    paymentPrice: z
        .string({ required_error: "Harga tidak boleh kosong" })
        .min(1, "Harga tidak boleh kosong"),
});

export const enrollStudentSchema = z.object({
    joinDate: z.date({ required_error: "Tanggal Gabung tidak boleh kosong" }),
});

export const updateEnrollStudentSchema = z.object({
    classroomId: z.string(),
    joinDate: z.date({ required_error: "Tanggal Gabung tidak boleh kosong" }),
});
