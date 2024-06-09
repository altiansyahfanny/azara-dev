import { useAddCycleMutation } from '@/api/cycleApi';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { createCycleSchema } from '@/schema/cycle';
import { setModalState } from '@/store/features/cycleSlice';
import { useAppDispatch } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
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
				<FormField
					control={form.control}
					name="startDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Tanggal Awal</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											{field.value ? format(field.value, 'dd-LL-yyyy') : <span>Pilih Tanggal</span>}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date: Date) => date < new Date()}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="endDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Tanggal Akhir</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
											disabled={!form.getValues('startDate')}
										>
											{field.value ? format(field.value, 'dd-LL-yyyy') : <span>Pilih Tanggal</span>}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date: Date) => date < form.getValues('startDate')}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
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
