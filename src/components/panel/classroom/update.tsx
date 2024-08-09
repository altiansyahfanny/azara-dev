import { useUpdateClassroomMutation } from '@/api/classroomApi';
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
import FormLib from '@/components/form-lib';
import { useFetchCyclesQuery } from '@/api/cycleApi';
import { LoaderCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { SelectItem } from '@/components/ui/select';


export default function UpdateClassroom() {
	const dispatch = useAppDispatch();

	const [update, { isLoading }] = useUpdateClassroomMutation();

	const { dataState } = useAppSelector((state) => state.classroom);



	const form = useForm<z.infer<typeof updateClassroomSchema>>({
		resolver: zodResolver(updateClassroomSchema),
		mode: 'onChange',
		defaultValues: {
			classroomName: dataState?.classroomName,
			cycleId: dataState?.cycleId?.toString(),
			price: dataState?.price?.toString(),
		},
	});

	const onSubmit = async (payload: z.infer<typeof updateClassroomSchema>) => {
		try {
			console.log('UpdateClassroom -> payload : ', payload);
			
			const newPayload = {
				...payload,
				id: dataState?.id as number
			}
			
			console.log('UpdateClassroom -> newPayload : ', newPayload);


			// return;

			const result = await update(newPayload).unwrap();

			console.log('UpdateClassroom -> onFinish -> success : ', result.message);

			dispatch(setModalState({ value: { modalUpdate: false } }));
			toast.success(result.message);
		} catch (err) {
			const error = err as ApiResponse<ErrorResponse>;
			console.log('UpdateClassroom -> onFinish -> error : ', error.data.message);
			toast.error(error.data.message);
		}
	};

	const {
		data: cycles,
		isLoading: isLoadingCycles,
		isSuccess: isSuccessCycles,
		isError: isErrorCycles,
	} = useFetchCyclesQuery();

	let cyclesContent: any;

	if (isLoadingCycles) {
		cyclesContent = (
			<div className="bg-red-500x min-h-20 grid place-content-center">
				<LoaderCircle className="animate-spin" />
			</div>
		);
	}

	if (isErrorCycles) {
		cyclesContent = (
			<div className="bg-red-500x min-h-20 grid place-content-center">
				<p className="text-sm">Tidak dapat memuat tahun pelajaran.</p>
			</div>
		);
	}

	if (isSuccessCycles) {
		cyclesContent = cycles?.data.cycles.map((cycle, key) => (
			<SelectItem key={key} value={cycle.id.toString()}>
				{`${format(parseISO(cycle.startDate), 'yyyy')}/${format(parseISO(cycle.endDate), 'yyyy')}`}
			</SelectItem>
		));
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormLib form={form} name="classroomName" label="Nama Kelas" />
				<FormLib
					form={form}
					name="cycleId"
					label="Tahun Ajaran"
					type="select"
					options={cyclesContent}
				/>
				<FormLib form={form} name="price" label="Harga" type="number" />

				<div className="flex gap-2 items-center justify-end">
					<Button type="submit" disabled={isLoading}>
						Simpan
					</Button>
				</div>
			</form>
		</Form>
	);
}
