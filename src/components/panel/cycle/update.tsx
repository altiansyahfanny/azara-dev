import { useUpdateCycleMutation } from '@/api/cycleApi';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { updateCycleSchema } from '@/schema/cycle';
import { setModalState } from '@/store/features/cycleSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import FormCycle from './form';

export default function UpdateCycle() {
	const dispatch = useAppDispatch();

	const { dataState } = useAppSelector((state) => state.cycle);

	const [update, { isLoading }] = useUpdateCycleMutation();

	const form = useForm<z.infer<typeof updateCycleSchema>>({
		resolver: zodResolver(updateCycleSchema),
		mode: 'onChange',
		defaultValues: {
			startDate: dataState.startDate ? new Date(dataState.startDate) : new Date(),
			endDate: dataState.endDate ? new Date(dataState.endDate) : new Date(),
			description: dataState.description,
		},
	});

	const onSubmit = async (payload: z.infer<typeof updateCycleSchema>) => {
		try {
			console.log('CreateCycle -> dataState : ', dataState);
			console.log('CreateCycle -> payload : ', payload);

			const newPayload = {
				...payload,
				id: dataState.id as number,
			};

			console.log('UpdateCycle -> newPayload : ', newPayload);
			
			// return;

			const result = await update(newPayload).unwrap();

			console.log('UpdateCycle -> onFinish -> success : ', result.message);

			dispatch(setModalState({ value: { modalUpdate: false } }));
			toast.success(result.message);
		} catch (err) {
			const error = err as ApiResponse<ErrorResponse>;
			console.log('UpdateCycle -> onFinish -> error : ', error.data.message);
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
