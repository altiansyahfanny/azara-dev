import { z } from "zod";

export const updateTeacherSchema = z.object({
	
	firstName: z
		.string({ required_error: 'Nama Depan tidak boleh kosong' })
		.min(3, 'Nama Depan harus memiliki 3 minimal karakter'),
	lastName: z
		.string({ required_error: 'Nama Belakang tidak boleh kosong' })
		.min(3, 'Nama Belakang harus memiliki 3 minimal karakter'),
	
	address: z
		.string({ required_error: 'Alamat tidak boleh kosong' })
		.min(3, 'Alamat harus memiliki 3 minimal karakter'),
	
});