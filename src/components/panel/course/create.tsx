import { useAddCourseMutation } from '@/api/courseApi';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { createCourseSchema } from '@/schema/course';
import { setModalState } from '@/store/features/courseSlice';
import { useAppDispatch } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import FormCourse from './form';

export default function CreateCourse() {
	const dispatch = useAppDispatch();

	const [create, { isLoading }] = useAddCourseMutation();

	const form = useForm<z.infer<typeof createCourseSchema>>({
		resolver: zodResolver(createCourseSchema),
		mode: 'onChange',
	});

	const onSubmit = async (payload: z.infer<typeof createCourseSchema>) => {
		try {
			console.log('CreateCourse -> payload : ', payload);
			return;

			const result = await create(payload).unwrap();

			console.log('CreateCourse -> onFinish -> success : ', result.message);

			dispatch(setModalState({ value: { modalCreate: false } }));
			toast.success(result.message);
		} catch (err) {
			const error = err as ApiResponse<ErrorResponse>;
			console.log('CreateCourse -> onFinish -> error : ', error.data.message);
			toast.error(error.data.message);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormCourse form={form} />

				<div className="flex gap-2 items-center justify-end">
					<Button type="submit" disabled={isLoading}>
						Simpan
					</Button>
				</div>
			</form>
		</Form>
	);
}
