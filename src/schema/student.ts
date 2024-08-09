import { z } from "zod";

export const updateStudentSchema = z.object({
	
	firstName: z
		.string({ required_error: 'Nama Depan tidak boleh kosong' })
		.min(3, 'Nama Depan Pelajaran harus memiliki 3 minimal karakter'),
	lastName: z
		.string({ required_error: 'Nama Belakang tidak boleh kosong' })
		.min(3, 'Nama Belakang harus memiliki 3 minimal karakter'),
	
	address: z
		.string({ required_error: 'Alamar tidak boleh kosong' })
		.min(3, 'Alamar harus memiliki 3 minimal karakter'),
	
});