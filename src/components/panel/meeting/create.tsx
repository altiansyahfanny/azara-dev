import { useFetchClassroomCoursesQuery } from '@/api/classroomApi';
import { useAddMeetingMutation } from '@/api/meetingApi';
import FormLib from '@/components/form-lib';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';
import { catchFunc } from '@/helpers/app-helper';
import { createMeetingSchema } from '@/schema/meeting';
import { setModalState } from '@/store/features/meetingSlice';
import { useAppDispatch } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const teacherAttendanceList = ['present', 'represented', 'absent'];

export default function CreateMeeting() {
	const dispatch = useAppDispatch();

	const [create, { isLoading }] = useAddMeetingMutation();

	const form = useForm<z.infer<typeof createMeetingSchema>>({
		resolver: zodResolver(createMeetingSchema),
		mode: 'onChange',
	});

	const onSubmit = async (payload: z.infer<typeof createMeetingSchema>) => {
		try {
			console.log('CreateMeeting -> payload : ', payload);

			// return;

			const result = await create(payload).unwrap();

			console.log('CreateCourse -> onFinish -> success : ', result.message);

			dispatch(setModalState({ value: { modalCreate: false } }));
			toast.success(result.message);
		} catch (err) {
			catchFunc(err);
		}
	};

	const teacherAttendanceOptions = teacherAttendanceList.map((value, index) => (
		<SelectItem key={index} value={value}>
			{value}
		</SelectItem>
	));

	const {
		data: classroomCourses,
		isLoading: isLoadingClassroomCourses,
		isSuccess: isSuccessClassroomCourses,
		isError: isErrorClassroomCourses,
	} = useFetchClassroomCoursesQuery();

	let classroomCoursesContent: ReactNode;

	if (isLoadingClassroomCourses) {
		classroomCoursesContent = (
			<div className="bg-red-500x min-h-20 grid place-content-center">
				<LoaderCircle className="animate-spin" />
			</div>
		);
	}

	if (isErrorClassroomCourses) {
		classroomCoursesContent = (
			<div className="bg-red-500x min-h-20 grid place-content-center">
				<p className="text-sm">Tidak dapat memuat pelajaran kelas.</p>
			</div>
		);
	}

	if (isSuccessClassroomCourses) {
		if (classroomCourses.data.classroomCourses.length === 0) {
			classroomCoursesContent = (
				<div className="bg-red-500x min-h-20 grid place-content-center">
					<p className="text-sm">Tidak ada pelajaran kelas.</p>
				</div>
			);
		} else {
			classroomCoursesContent = classroomCourses?.data.classroomCourses.map((cc, key) => (
				<SelectItem key={key} value={cc.id.toString()}>
					{`${cc.classroomName} - ${cc.courseName}`}
				</SelectItem>
			));
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* <FormCourse form={form} /> */}

				<FormLib
					form={form}
					name="classroomCourseId"
					label="Pelajaran Kelas"
					type="select"
					options={classroomCoursesContent}
				/>
				<FormLib form={form} name="startTime" label="Waktu Mulai" type="time" />
				<FormLib form={form} name="endTime" label="Waktu Selesai" type="time" />
				<FormLib form={form} name="meetingDate" label="Tanggal Pertemuan" type="date" />
				<FormLib form={form} name="subjectMatter" label="Subjek" />
				<FormLib form={form} name="meetingNumber" label="Nomor Pertemuan" />
				<FormLib
					form={form}
					name="teacherAttendance"
					label="Kehadiran Guru"
					type="select"
					options={teacherAttendanceOptions}
					onChangeFunc={() => {
						form.setValue('representedBy', '');
					}}
				/>
				<FormLib
					form={form}
					name="representedBy"
					label="Perwakilan"
					disabled={
						form.getValues('teacherAttendance') === 'present' ||
						form.getValues('teacherAttendance') === 'absent'
					}
				/>

				<FormLib form={form} name="handBook" label="Buku Pedoman" />

				<div className="flex gap-2 items-center justify-end">
					<Button type="submit" disabled={isLoading}>
						Simpan
					</Button>
				</div>
			</form>
		</Form>
	);
}
