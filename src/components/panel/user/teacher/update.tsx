
import { useUpdateTeacherMutation } from '@/api/teacherApi';
import FormLib from '@/components/form-lib';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { updateTeacherSchema } from '@/schema/teacher';
import { setModalState } from '@/store/features/teacherSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';


export default function UpdateTeacher() {
	const dispatch = useAppDispatch();

	const [update, { isLoading }] = useUpdateTeacherMutation();

	const { dataState } = useAppSelector((state) => state.teacher);

	const form = useForm<z.infer<typeof updateTeacherSchema>>({
		resolver: zodResolver(updateTeacherSchema),
		mode: 'onChange',
		defaultValues: {
			firstName: dataState?.firstName,
			lastName: dataState?.lastName,
			address: dataState?.address,
			
		},
	});

	const onSubmit = async (payload: z.infer<typeof updateTeacherSchema>) => {
		try {
			console.log('UpdateTeacher -> payload : ', payload);
			
			const newPayload = {
				...payload,
				id: dataState?.userId as number
			}
			
			console.log('UpdateTeacher -> newPayload : ', newPayload);


			// return;

			const result = await update(newPayload).unwrap();

			console.log('UpdateTeacher -> onFinish -> success : ', result.message);

			dispatch(setModalState({ value: { modalUpdate: false } }));
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
				<FormLib form={form} name="firstName" label="Nama Depan" />
				<FormLib form={form} name="lastName" label="Nama Belakang" />
				<FormLib form={form} name="address" label="Alamat" />
				
				<div className="flex gap-2 items-center justify-end">
					<Button type="submit" disabled={isLoading}>
						Simpan
					</Button>
				</div>
			</form>
		</Form>
	);
}
