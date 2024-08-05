import { useAddCycleMutation } from '@/api/cycleApi';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { createCycleSchema } from '@/schema/cycle';
import { setModalState } from '@/store/features/cycleSlice';
import { useAppDispatch } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import FormCycle from './form';

export default function CreateCycle() {
	const dispatch = useAppDispatch();

	const [create, { isLoading }] = useAddCycleMutation();

	const form = useForm<z.infer<typeof createCycleSchema>>({
		resolver: zodResolver(createCycleSchema),
		mode: 'onChange',
	});

	const onSubmit = async (payload: z.infer<typeof createCycleSchema>) => {
		try {
			console.log('CreateCycle -> payload : ', payload);

			const newPayload = {
				...payload,
				startDate: format(payload.startDate, 'yyyy-LL-dd'),
				endDate: format(payload.endDate, 'yyyy-LL-dd'),
			};

			console.log('CreateCycle -> newPayload : ', newPayload);
			// return;

			const result = await create(payload).unwrap();

			console.log('CreateCycle -> onFinish -> success : ', result.message);

			dispatch(setModalState({ value: { modalCreate: false } }));
			toast.success(result.message);
		} catch (err) {
			const error = err as ApiResponse<ErrorResponse>;
			console.log('CreateCycle -> onFinish -> error : ', error.data.message);
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
