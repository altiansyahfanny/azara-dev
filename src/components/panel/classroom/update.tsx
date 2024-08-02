import { useAddClassroomMutation } from '@/api/classroomApi';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { updateClassroomSchema } from '@/schema/classroom';
import { setModalState } from '@/store/features/classroomSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import FormClassroom from './form';

export default function UpdateClassroom() {
	const dispatch = useAppDispatch();

	const [create, { isLoading }] = useAddClassroomMutation();

	const { dataState } = useAppSelector((state) => state.classroom);

	const form = useForm<z.infer<typeof updateClassroomSchema>>({
		resolver: zodResolver(updateClassroomSchema),
		mode: 'onChange',
		defaultValues: {
			classroomName: dataState.classroomName,
			cycleId: '', // kurang di response nya
			price: dataState.price.toString(),
		},
	});

	const onSubmit = async (payload: z.infer<typeof updateClassroomSchema>) => {
		try {
			console.log('UpdateClassroom -> payload : ', payload);

			return;

			const result = await create(payload).unwrap();

			console.log('UpdateClassroom -> onFinish -> success : ', result.message);

			dispatch(setModalState({ value: { modalCreate: false } }));
			toast.success(result.message);
		} catch (err) {
			const error = err as ApiResponse<ErrorResponse>;
			console.log('UpdateClassroom -> onFinish -> error : ', error.data.message);
			toast.error(error.data.message);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormClassroom form={form} />

				<div className="flex gap-2 items-center justify-end">
					<Button type="submit" disabled={isLoading}>
						Simpan
					</Button>
				</div>
			</form>
		</Form>
	);
}
