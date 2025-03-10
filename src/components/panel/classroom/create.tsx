import { useAddClassroomMutation } from '@/api/classroomApi';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { createClassroomSchema } from '@/schema/classroom';
import { setModalState } from '@/store/features/classroomSlice';
import { useAppDispatch } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import FormClassromm from './form';

export default function CreateClassroom() {
	const dispatch = useAppDispatch();

	const [create, { isLoading }] = useAddClassroomMutation();

	const form = useForm<z.infer<typeof createClassroomSchema>>({
		resolver: zodResolver(createClassroomSchema),
		mode: 'onChange',
		defaultValues: {
			classroomName: '',
			cycleId: '',
			price: '',
		},
	});

	const onSubmit = async (payload: z.infer<typeof createClassroomSchema>) => {
		try {
			console.log('CreateClassroom -> payload : ', payload);

			// return;

			const result = await create(payload).unwrap();

			console.log('CreateClassroom -> onFinish -> success : ', result.message);

			dispatch(setModalState({ value: { modalCreate: false } }));
			toast.success(result.message);
		} catch (err) {
			const error = err as ApiResponse<ErrorResponse>;
			console.log('CreateClassroom -> onFinish -> error : ', error.data.message);
			toast.error(error.data.message);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormClassromm form={form} />
				<div className="flex gap-2 items-center justify-end">
					<Button type="submit" disabled={isLoading}>
						Simpan
					</Button>
				</div>
			</form>
		</Form>
	);
}
