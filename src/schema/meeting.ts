import { z } from "zod";

export const createMeetingSchema = z.object({
    classroomCourseId: z
        .string({ required_error: "Pelajaran Kelas tidak boleh kosong" })
        .min(1, "Pelajaran Kelas tidak boleh kosong"),
    startTime: z
        .string({ required_error: "Waktu Mulai tidak boleh kosong" })
        .min(1, "Waktu Mulai harus memiliki minimal 8 karakter"),
    endTime: z.string({
        required_error: "Waktu Selesai tidak boleh kosong",
    }),
    meetingDate: z.date({
        required_error: "Tanggal Pertemuan tidak boleh kosong",
    }),
    subjectMatter: z
        .string({ required_error: "Subject tidak boleh kosong" })
        .min(1, "Subject harus memiliki minimal 8 karakter"),
    meetingNumber: z
        .string({ required_error: "Nomor Pertemuan tidak boleh kosong" })
        .min(1, "Nomor Pertemuan harus memiliki minimal 8 karakter"),
    teacherAttendance: z
        .string({ required_error: "Kehadiran Guru tidak boleh kosong" })
        .min(1, "Kehadiran Guru harus memiliki minimal 8 karakter"),
    representedBy: z.string().optional(),
    handBook: z
        .string({ required_error: "handBook tidak boleh kosong" })
        .min(1, "handBook harus memiliki minimal 8 karakter"),
});
// .superRefine((data, ctx) => {
//     if (data.teacherAttendance !== "represented") {
//         console.log("data.teacherAttendance : ", data.teacherAttendance);
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             path: ["representedBy"],
//             message:
//                 "representedBy harus diisi jika Kehadiran Guru bukan 'represented'",
//         });
//     }
// });

export const updateMeetingSchema = z.object({
    classroomCourseId: z
        .string({ required_error: "Pelajaran Kelas tidak boleh kosong" })
        .min(1, "Pelajaran Kelas tidak boleh kosong"),
    startTime: z
        .string({ required_error: "Waktu Mulai tidak boleh kosong" })
        .min(1, "Waktu Mulai harus memiliki minimal 8 karakter"),
    endTime: z.string({
        required_error: "Waktu Selesai tidak boleh kosong",
    }),
    meetingDate: z.date({
        required_error: "Tanggal Pertemuan tidak boleh kosong",
    }),
    subjectMatter: z
        .string({ required_error: "Subject tidak boleh kosong" })
        .min(1, "Subject harus memiliki minimal 8 karakter"),
    // meetingNumber: z
    //     .string({ required_error: "Nomor Pertemuan tidak boleh kosong" })
    //     .min(1, "Nomor Pertemuan harus memiliki minimal 8 karakter"),
    teacherAttendance: z
        .string({ required_error: "Kehadiran Guru tidak boleh kosong" })
        .min(1, "Kehadiran Guru harus memiliki minimal 8 karakter"),
    representedBy: z.string().optional(),
    handBook: z.string().optional(),
});
