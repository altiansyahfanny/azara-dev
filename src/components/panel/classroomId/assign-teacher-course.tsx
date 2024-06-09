import { useAssignTeacherAndCourseMutation } from '@/api/classroomApi';
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
import { InputNumber } from '@/components/ui/input-number';
import { Label } from '@/components/ui/label';
import { parseStringCurrencyToNumber } from '@/helpers/app-helper';
import { AssignTeacherAndCourseSchemaRequest } from '@/model/classroom';
import { assignTeacherAndCourseSchema } from '@/schema/classroomId';
import { resetAssignCourse, setModalState } from '@/store/features/classroomIdSlice';
import { useAppSelector } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

const AssignTeacherCourse = () => {
	const dispatch = useDispatch();
	const state = useAppSelector((state) => state.classroomId.assignCourse);

	const [assign, { isLoading }] = useAssignTeacherAndCourseMutation();

	const form = useForm<z.infer<typeof assignTeacherAndCourseSchema>>({
		resolver: zodResolver(assignTeacherAndCourseSchema),
		mode: 'onChange',
		defaultValues: { paymentPrice: '' },
	});

	const onSubmit = async (payload: z.infer<typeof assignTeacherAndCourseSchema>) => {
		try {
			const assignTeacherAndCourseSchemaRequest: AssignTeacherAndCourseSchemaRequest = {
				classroomId: state.classroom?.id as number,
				courseId: state.course?.id as number,
				teacherId: state.teacher?.teacherId as number,
				paymentPrice: parseStringCurrencyToNumber(payload.paymentPrice),
			};

			console.log('assign -> payload : ', assignTeacherAndCourseSchemaRequest);

			return;

			const result = await assign(assignTeacherAndCourseSchemaRequest).unwrap();

			console.log('assign -> success : ', result.message);

			dispatch(setModalState({ value: { modalFormAssignTeacherAndCourse: false } }));
			dispatch(resetAssignCourse());
			toast.success(result.message);
		} catch (err) {
			const error = err as ApiResponse<ErrorResponse>;
			console.log('assign -> error : ', error.data.message);
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
				<Label>Mata Pelajaran</Label>
				<Input readOnly placeholder={state.course?.courseName} />
			</div>
			<div className="grid gap-2">
				<Label>Guru</Label>
				<Input readOnly placeholder={`${state.teacher?.firstName} ${state.teacher?.lastName}`} />
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="paymentPrice"
						render={({ field }) => {
							const { onChange, ...props } = field;
							return (
								<FormItem>
									<FormLabel>Harga</FormLabel>
									<FormControl>
										<InputNumber onInput={(e) => onChange(e)} {...props} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
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

export default AssignTeacherCourse;
