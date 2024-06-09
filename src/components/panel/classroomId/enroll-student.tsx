import { useEnrollStudentMutation } from '@/api/classroomApi';
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
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { EnrollStudentRequest } from '@/model/classroom';
import { enrollStudentSchema } from '@/schema/classroomId';
import { resetEnrollStudent, setModalState } from '@/store/features/classroomIdSlice';
import { useAppSelector } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

const EnrollStudent = () => {
	const dispatch = useDispatch();
	const state = useAppSelector((state) => state.classroomId.enrollStudent);

	const [enroll, { isLoading }] = useEnrollStudentMutation();

	const form = useForm<z.infer<typeof enrollStudentSchema>>({
		resolver: zodResolver(enrollStudentSchema),
		mode: 'onChange',
		defaultValues: {
			joinDate: new Date(),
		},
	});

	const onSubmit = async (payload: z.infer<typeof enrollStudentSchema>) => {
		try {
			const enrollStudentRequest: EnrollStudentRequest = {
				studentId: state.student?.studentId as number,
				classroomId: state.classroom?.id as number,
				joinDate: format(payload.joinDate, 'yyyy-LL-dd'),
			};

			console.log('enrollStudent -> payload : ', enrollStudentRequest);
			return;

			const result = await enroll(enrollStudentRequest).unwrap();

			console.log('enrollStudent -> success : ', result.message);

			dispatch(setModalState({ value: { modalFormEnrollStudent: false } }));
			dispatch(resetEnrollStudent());
			toast.success(result.message);
		} catch (err) {
			const error = err as ApiResponse<ErrorResponse>;
			console.log('enrollStudent -> error : ', error.data.message);
			toast.error(error.data.message);
		}
	};
	return (
		<div className="grid gap-4">
			<div className="grid gap-2">
				<Label>Kelas</Label>
				<Input readOnly placeholder={state.classroom?.classroomName} />
			</div>
			<div className="grid gap-2">
				<Label>Guru</Label>
				<Input readOnly placeholder={`${state.student?.firstName} ${state.student?.lastName}`} />
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="joinDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Tanggal Gabung</FormLabel>
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
												{field.value ? (
													format(field.value, 'dd-LL-yyyy')
												) : (
													<span>Pilih Tanggal</span>
												)}
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
					<div className="flex gap-2 items-center justify-end">
						<Button type="submit" disabled={isLoading}>
							Simpan
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default EnrollStudent;
