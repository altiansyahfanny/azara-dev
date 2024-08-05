import { useAddCourseMutation } from '@/api/courseApi';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { updateCourseSchema } from '@/schema/course';
import { setModalState } from '@/store/features/cycleSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import FormCycle from './form';

export default function UpdateCourse() {
	const dispatch = useAppDispatch();

	const { dataState } = useAppSelector((state) => state.course);

	const [create, { isLoading }] = useAddCourseMutation();

	const form = useForm<z.infer<typeof updateCourseSchema>>({
		resolver: zodResolver(updateCourseSchema),
		mode: 'onChange',
		defaultValues: {
			courseName: dataState.courseName,
			description: dataState.description,
		},
	});

	const onSubmit = async (payload: z.infer<typeof updateCourseSchema>) => {
		try {
			console.log('UpdateCourse -> dataState : ', dataState);
			console.log('UpdateCourse -> payload : ', payload);

			return;

			const result = await create(payload).unwrap();

			console.log('UpdateCourse -> onFinish -> success : ', result.message);

			dispatch(setModalState({ value: { modalCreate: false } }));
			toast.success(result.message);
		} catch (err) {
			const error = err as ApiResponse<ErrorResponse>;
			console.log('UpdateCourse -> onFinish -> error : ', error.data.message);
			toast.error(error.data.message);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormCycle form={form} />

				<div className="flex gap-2 items-center justify-end">
					<Button type="submit" disabled={isLoading}>
						Simpan
					</Button>
				</div>
			</form>
		</Form>
	);
}
