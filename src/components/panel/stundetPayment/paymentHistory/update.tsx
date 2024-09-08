import { useUpdateStudentPaymentHistoryMutation } from '@/api/studentPaymentHistoryApi';
import FormLib from '@/components/form-lib';
import { Button } from '@/components/ui/button';
import { catchFunc, formatNumber } from '@/helpers/app-helper';
import { updateStudentPaymentHistorySchema } from '@/schema/studentPayment';
import { setModalState } from '@/store/features/studentPaymentHistorySlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const UpdateStudentPaymentHistory = () => {
	const dispatch = useAppDispatch();

	const { dataStateUpdate } = useAppSelector((state) => state.studentPaymentHistory);

	const [update, { isLoading }] = useUpdateStudentPaymentHistoryMutation();

	const form = useForm<z.infer<typeof updateStudentPaymentHistorySchema>>({
		resolver: zodResolver(updateStudentPaymentHistorySchema),
		mode: 'onChange',
		defaultValues: {
			accountNumber: dataStateUpdate?.accountNumber,
			bankName: dataStateUpdate?.bankName,
			paymentDate: dataStateUpdate?.paymentDate
				? new Date(dataStateUpdate.paymentDate)
				: new Date(),
			forMonth: new Date(dataStateUpdate?.forMonth as string),
			originalPrice: formatNumber(parseInt(dataStateUpdate?.originalPrice as string)),
			discount: formatNumber(dataStateUpdate?.discount as number),
		},
	});

	const onSubmit = async (payload: z.infer<typeof updateStudentPaymentHistorySchema>) => {
		try {
			const result = await update({
				...payload,
				id: dataStateUpdate?.id as number,
			}).unwrap();

			dispatch(setModalState({ value: { modalUpdate: false } }));

			console.log('UpdateStudentPaymentHistory -> onFinish -> success : ', result.message);

			toast.success(result.message);
		} catch (err) {
			catchFunc(err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormItem>
					<FormLabel>Nama Siswa</FormLabel>
					<FormControl>
						<Input
							readOnly={true}
							value={`${dataStateUpdate?.firstName} ${dataStateUpdate?.lastName}`}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
				<FormLib form={form} name="accountNumber" label="Nomor Rekening" />
				<FormLib form={form} name="bankName" label="Nama Bank" />
				<FormLib form={form} name="forMonth" label="Untuk Bulan" type="month" />
				<FormLib form={form} name="paymentDate" label="Tanggal Pembayaran" type="date" />
				<FormLib form={form} name="originalPrice" label="Harga Kelas" type="number" />
				<FormLib form={form} name="discount" label="Diskon (%)" type="number" />

				<div className="flex gap-2 items-center justify-end">
					<Button type="submit" disabled={isLoading}>
						Simpan
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default UpdateStudentPaymentHistory;
