import { useGetClassroomQuery } from '@/api/classroomApi';
import Container from '@/components/core/container';
import PageError from '@/components/page-error';
import ModalAssignCourse from '@/components/panel/classroomId/modal-assign-course';
import ModalAssignTeacher from '@/components/panel/classroomId/modal-assign-teacher';
import ModalEnrollStudent from '@/components/panel/classroomId/modal-enroll-student';
import ModalFormAssignTeacherAndCourse from '@/components/panel/classroomId/modal-form-assign-teacher-and-course';
import ModalFormEnrollStudent from '@/components/panel/classroomId/modal-form-enroll-student';
import TableStudent from '@/components/panel/classroomId/table-student';
import TableTeacherAndCourse from '@/components/panel/classroomId/table-teacher-and-course';
import SkeletonLoading from '@/components/skeleton-loading';
import { formatNumber } from '@/helpers/app-helper';
import { useParams } from 'react-router-dom';

const ClassroomId = () => {
	const { id } = useParams();

	const { data: classroom, isLoading, isError, isSuccess } = useGetClassroomQuery(id as string);

	console.log('classroom: ', classroom);

	let content;

	if (isError) return <PageError />;

	if (isLoading) content = <SkeletonLoading />;

	if (isSuccess) {
		content = (
			<>
				<div>
					<h1 className="text-xl">{classroom.data.classroomName}</h1>
					<p className="text-sm text-gray-500">{classroom.data.cycleDescription}</p>
				</div>
				<p className="ml-auto text-lg text-black font-semibold">
					{formatNumber(classroom.data.price)}
				</p>
			</>
		);
	}

	return (
		<Container title="Kelas">
			<div className="grid gap-4">
				<div className="border rounded-lg p-4 flex items-center">{content}</div>
				<TableTeacherAndCourse isLoading={isLoading} isSuccess={isSuccess} classroom={classroom} />
				<TableStudent isLoading={isLoading} isSuccess={isSuccess} classroom={classroom} />
			</div>
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
