import FormLib from '@/components/form-lib';
import { updateCourseSchema } from '@/schema/course';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type FormProps<T  extends FieldValues> = {
	form: UseFormReturn<T, any, undefined>;
};

const FormCourse = <T extends FieldValues>({ form }: FormProps<T>) => {
	return (
		<>
			<FormLib form={form} name="courseName" label="Nama Mata Pelajaran" />
			<FormLib form={form} name="description" label="Keterangan" />
		</>
	);
};

export default FormCourse;
