import { useAddClassroomMutation } from '@/api/classroomApi';
import { useFetchCyclesQuery } from '@/api/cycleApi';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { createClassroomSchema } from '@/schema/classroom';
import { setModalState } from '@/store/features/classroomSlice';
import { useAppDispatch } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

export default function CreateClassroom() {
	const dispatch = useAppDispatch();

	const {
		data: cycles,
		isLoading: isLoadingCycles,
		isSuccess: isSuccessCycles,
		isError: isErrorCycles,
	} = useFetchCyclesQuery();

	const [create, { isLoading }] = useAddClassroomMutation();

	const form = useForm<z.infer<typeof createClassroomSchema>>({
		resolver: zodResolver(createClassroomSchema),
		mode: 'onChange',
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
				{cycle.description}
			</SelectItem>
		));
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="classroomName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama Mata Pelajaran</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="cycleId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tahun Ajaran</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Pilih Tahun Ajaran" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>{cyclesContent}</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Harga</FormLabel>
							<FormControl>
								<Input
									type="number"
									{...field}
									onChange={(e) => {
										field.onChange(Number(e.target.value));
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-2 items-center justify-end">
					<Button type="submit" disabled={isLoading}>
						Simpan
					</Button>
					{/* <Button type="reset" variant={'outline'} disabled={isLoading}>
						Batal
					</Button> */}
				</div>
			</form>
		</Form>
	);
}
