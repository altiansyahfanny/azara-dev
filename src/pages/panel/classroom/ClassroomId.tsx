import { useGetClassroomQuery } from '@/api/classroomApi';
import Container from '@/components/core/container';
import ModalAssignCourse from '@/components/panel/classroomId/modal-assign-course';
import ModalAssignTeacher from '@/components/panel/classroomId/modal-assign-teacher';
import ModalEnrollStudent from '@/components/panel/classroomId/modal-enroll-student';
import ModalFormAssignTeacherAndCourse from '@/components/panel/classroomId/modal-form-assign-teacher-and-course';
import ModalFormEnrollStudent from '@/components/panel/classroomId/modal-form-enroll-student';
import TableStudent from '@/components/panel/classroomId/table-student';
import TableTeacherAndCourse from '@/components/panel/classroomId/table-teacher-and-course';
import SkeletonLoading from '@/components/skeleton-loading';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/helpers/app-helper';
import {
	setAssignCourse,
	setEnrollStudent,
	setModalState,
} from '@/store/features/classroomIdSlice';
import { useAppDispatch } from '@/store/store';
import { Ban, FolderOpen, PlusCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ClassroomId = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const { data: classroom, isLoading, isError, isSuccess } = useGetClassroomQuery(id as string);

	if (isError) {
		return (
			<div className="flex items-center justify-center flex-col p-8 bg-red-400x h-full">
				<Ban className="w-20 h-20" />
				<p className="text-lg font-semibold mt-4">Terjadi Kesalahan!</p>
			</div>
		);
	}

	let content;

	if (isLoading) content = <SkeletonLoading />;

	if (isSuccess) {
		let studentsContent;

		if (classroom.data.students.length < 1) {
			studentsContent = (
				<>
					<div className="flex items-center justify-center flex-col p-8">
						<FolderOpen className="w-20 h-20" />
						<p>Data Siswa Kosong</p>
					</div>
				</>
			);
		} else {
			studentsContent = <TableStudent students={classroom.data.students} />;
		}

		let teachersContent;

		if (classroom.data.courses.length < 1) {
			teachersContent = (
				<>
					<div className="flex items-center justify-center flex-col p-8">
						<FolderOpen className="w-20 h-20" />
						<p>Data Mata Pelajaran Kosong</p>
					</div>
				</>
			);
		} else {
			teachersContent = <TableTeacherAndCourse courses={classroom.data.courses} />;
		}

		content = (
			<div className="grid gap-4">
				<div className="border rounded-lg p-4 flex items-center">
					<div>
						<h1 className="text-xl">{classroom.data.classroomName}</h1>
						<p className="text-sm text-gray-500">{classroom.data.cycleDescription}</p>
					</div>
					<p className="ml-auto text-lg text-black font-semibold">
						{formatNumber(classroom.data.price)}
					</p>
				</div>

				<div className="border rounded-lg p-4">
					<div className="flex mb-4">
						<h2 className="text-xl font-semibold leading-none tracking-tight">Mata Pelajaran</h2>
						<div className="ml-auto flex items-center gap-2">
							<Button
								size="sm"
								className="h-7 gap-1"
								onClick={() => {
									dispatch(setModalState({ value: { modalAssignCourse: true } }));
									dispatch(setAssignCourse({ value: { classroom: classroom.data } }));
								}}
							>
								<PlusCircle className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Mata Pelajaran</span>
							</Button>
						</div>
					</div>
					<div>{teachersContent}</div>
				</div>
				<div className="border rounded-lg p-4">
					<div className="flex mb-4">
						<h2 className="text-xl font-semibold leading-none tracking-tight">Siswa</h2>
						<div className="ml-auto flex items-center gap-2">
							<Button
								size="sm"
								className="h-7 gap-1"
								onClick={() => {
									dispatch(setModalState({ value: { modalEnrollStudent: true } }));
									dispatch(setEnrollStudent({ value: { classroom: classroom.data } }));
								}}
							>
								<PlusCircle className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Siswa</span>
							</Button>
						</div>
					</div>

					<div>{studentsContent}</div>
				</div>
			</div>
		);
	}

	return (
		<Container title="Kelas">
			{content}
			{/* MODAL SISWA */}
			<ModalEnrollStudent />
			<ModalFormEnrollStudent />
			{/* END MODAL SISWA */}

			{/* ====================== */}

			{/* MODAL ASSIGN TEACHER AND COURSE */}
			<ModalAssignCourse />
			<ModalAssignTeacher />
			<ModalFormAssignTeacherAndCourse />
			{/* END MODAL ASSIGN TEACHER AND COURSE */}
		</Container>
	);
};

export default ClassroomId;
