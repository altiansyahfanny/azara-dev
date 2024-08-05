import FormLib from '@/components/form-lib';
import { updateCourseSchema } from '@/schema/course';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type FormProps = {
	form: UseFormReturn<z.infer<typeof updateCourseSchema>, any, undefined>;
};

const FormCourse = ({ form }: FormProps) => {
	return (
		<>
			<FormLib form={form} name="courseName" label="Nama Mata Pelajaran" />
			<FormLib form={form} name="description" label="Keterangan" />
		</>
	);
};

export default FormCourse;
