import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { resetEnrollStudent, setModalState } from '@/store/features/classroomIdSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import EnrollStudent from './enroll-student';

const ModalFormEnrollStudent = () => {
	const dispatch = useAppDispatch();
	const { modalState } = useAppSelector((state) => state.classroomId);

	const onOpenChangeModalFormEnrollStudent = (value: boolean) => {
		if (value === false) {
			dispatch(resetEnrollStudent());
		}
		dispatch(setModalState({ value: { modalFormEnrollStudent: value } }));
	};

	return (
		<Dialog
			open={modalState.modalFormEnrollStudent}
			onOpenChange={onOpenChangeModalFormEnrollStudent}
		>
			<DialogContent>
				<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar">
					<DialogHeader>
						<DialogTitle>Mendaftarkan Siswa</DialogTitle>
					</DialogHeader>
					<hr className="my-4" />
					<EnrollStudent />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ModalFormEnrollStudent;
