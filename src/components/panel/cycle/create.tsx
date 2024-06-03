import { useAddCycleMutation } from '@/api/cycleApi';
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
import { createCycleSchema } from '@/schema/cycle';
import { setModalState } from '@/store/features/cycleSlice';
import { useAppDispatch } from '@/store/store';
import { ApiResponseType, ErrorResponseType } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

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
			// return;

			const result = await create(payload).unwrap();

			console.log('CreateCycle -> onFinish -> success : ', result.message);

			dispatch(setModalState({ value: { modalCreate: false } }));
			toast.success(result.message);
		} catch (err) {
			const error = err as ApiResponseType<ErrorResponseType>;
			console.log('CreateCycle -> onFinish -> error : ', error.data.message);
			toast.error(error.data.message);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="startDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tahun Mulai</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
							{/* <FormDescription>This is your public display name.</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="endDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tahun Selesai</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
							{/* <FormDescription>This is your public display name.</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Keterangan</FormLabel>
							<FormControl>
								<Input {...field} />
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
