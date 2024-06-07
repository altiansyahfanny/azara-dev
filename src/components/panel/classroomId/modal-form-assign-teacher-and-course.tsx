import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { resetAssignCourse, setModalState } from '@/store/features/classroomIdSlice';
import AssignTeacherCourse from './assign-teacher-course';

const ModalFormAssignTeacherAndCourse = () => {
	const dispatch = useAppDispatch();
	const { modalState } = useAppSelector((state) => state.classroomId);

	const onOpenChange = (value: boolean) => {
		dispatch(resetAssignCourse());
		dispatch(setModalState({ value: { modalFormAssignTeacherAndCourse: value } }));
	};

	return (
		<Dialog open={modalState.modalFormAssignTeacherAndCourse} onOpenChange={onOpenChange}>
			<DialogContent>
				<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar">
					<DialogHeader>
						<DialogTitle>Menambahkan Mata Pelajaran dan Guru</DialogTitle>
					</DialogHeader>
					<hr className="my-4" />

					<AssignTeacherCourse />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ModalFormAssignTeacherAndCourse;
