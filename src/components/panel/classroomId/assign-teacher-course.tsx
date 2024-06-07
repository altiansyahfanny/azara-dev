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
import { Label } from '@/components/ui/label';
import { assignTeacherAndCourseSchema } from '@/schema/classroomId';
import { resetAssignCourse, setModalState } from '@/store/features/classroomIdSlice';
import { useAppSelector } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

const AssignTeacherCourse = () => {
	const dispatch = useDispatch();
	const state = useAppSelector((state) => state.classroomId.assignCourse);

	const form = useForm<z.infer<typeof assignTeacherAndCourseSchema>>({
		resolver: zodResolver(assignTeacherAndCourseSchema),
		mode: 'onChange',
	});

	const onSubmit = (payload: z.infer<typeof assignTeacherAndCourseSchema>) => {
		const payloadFormState = {
			classroomId: state.classroom?.id,
			courseId: state.course?.id,
			teacherId: state.teacher?.teacherId,
			paymentPrice: payload.paymentPrice,
		};

		console.log('payloadFormState : ', payloadFormState);
		dispatch(setModalState({ value: { modalFormAssignTeacherAndCourse: false } }));
		dispatch(resetAssignCourse());
	};
	return (
		<div className="grid gap-4">
			<div className="grid gap-2">
				<Label>Kelas</Label>
				<Input disabled={true} value={state.classroom?.classroomName} />
			</div>
			<div className="grid gap-2">
				<Label>Mata Pelajaran</Label>
				<Input disabled={true} value={state.course?.courseName} />
			</div>
			<div className="grid gap-2">
				<Label>Guru</Label>
				<Input disabled={true} value={`${state.teacher?.firstName} ${state.teacher?.lastName}`} />
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="paymentPrice"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Harga</FormLabel>
								<FormControl>
									<Input
										min={1}
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
						<Button type="submit">Simpan</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default AssignTeacherCourse;
