import { useUpdatePaymentHistoryMutation } from '@/api/paymentHistoryApi';
import FormLib from '@/components/form-lib';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { catchFunc } from '@/helpers/app-helper';
import { updatePaymentHistorySchema } from '@/schema/payment';
import { setModalState } from '@/store/features/paymentHistorySlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const UpdatePaymentHistory = () => {
	const dispatch = useAppDispatch();

	const { dataStateUpdate } = useAppSelector((state) => state.paymentHistory);

	const [update, { isLoading }] = useUpdatePaymentHistoryMutation();

	const form = useForm<z.infer<typeof updatePaymentHistorySchema>>({
		resolver: zodResolver(updatePaymentHistorySchema),
		mode: 'onChange',
		defaultValues: {
			recipientName: dataStateUpdate?.recipientName,
			accountNumber: dataStateUpdate?.accountNumber,
			bankName: dataStateUpdate?.bankName,
			paymentDate: dataStateUpdate?.paymentDate
				? new Date(dataStateUpdate.paymentDate)
				: new Date(),
		},
	});

	const onSubmit = async (payload: z.infer<typeof updatePaymentHistorySchema>) => {
		try {
			const result = await update({
				...payload,
				id: dataStateUpdate?.id as number,
			}).unwrap();

			dispatch(setModalState({ value: { modalUpdate: false } }));

			console.log('UpdatePaymentHistory -> onFinish -> success : ', result.message);

			toast.success(result.message);
		} catch (err) {
			catchFunc(err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormLib form={form} name="recipientName" label="Nama Penerima" />
				<FormLib form={form} name="accountNumber" label="Nomor Rekening" />
				<FormLib form={form} name="bankName" label="Nama Bank" />

				<FormLib form={form} name="paymentDate" label="Tanggal Pembayaran" type="date" />

				<div className="flex gap-2 items-center justify-end">
					<Button type="submit" disabled={isLoading}>
						Simpan
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default UpdatePaymentHistory;
