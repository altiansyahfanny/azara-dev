import { useAddStudentPaymentMutation } from '@/api/studentPaymentApi';
import FormLib from '@/components/form-lib';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { catchFunc, formatNumber } from '@/helpers/app-helper';
import { createStudentPaymentSchema } from '@/schema/studentPayment';
import { setModalState } from '@/store/features/studentPaymentListSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const CreatePayment = () => {
	const dispatch = useAppDispatch();

	const { dataStateCreate } = useAppSelector((state) => state.studentPaymentList);

	const [create, { isLoading }] = useAddStudentPaymentMutation();

	const form = useForm<z.infer<typeof createStudentPaymentSchema>>({
		resolver: zodResolver(createStudentPaymentSchema),
		mode: 'onChange',
		defaultValues: {
			studentId: dataStateCreate?.studentId,
			enrollmentId: dataStateCreate?.enrollmentId,
			accountNumber: '',
			bankName: '',
			paymentDate: new Date(),
			forMonth: undefined,
			originalPrice: formatNumber(dataStateCreate?.classroomPrice as number),
			discount: '',
		},
	});

	const onSubmit = async (payload: z.infer<typeof createStudentPaymentSchema>) => {
		try {
			console.log('payload', payload);

			// return;

			const result = await create(payload).unwrap();

			dispatch(setModalState({ value: { modalCreate: false } }));

			console.log('CreateStudentPayment -> onFinish -> success : ', result.message);

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
							value={`${dataStateCreate?.firstName} ${dataStateCreate?.lastName}`}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>

				<FormLib form={form} name="bankName" label="Nama Bank" />
				<FormLib form={form} name="accountNumber" label="Nomor Rekening" />
				<FormLib form={form} name="paymentDate" label="Tanggal Pembayaran" type="date" />
				<FormLib form={form} name="forMonth" label="Untuk Bulan" type="month" />
				<FormLib form={form} name="originalPrice" label="Harga Kelas" type="number" readOnly />
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

export default CreatePayment;
