import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TableBrowse from '../user/student/table-browse';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { resetEnrollStudent, setModalState } from '@/store/features/classroomIdSlice';

const ModalEnrollStudent = () => {
	const dispatch = useAppDispatch();
	const { modalState } = useAppSelector((state) => state.classroomId);

	const onOpenChangeModalAssignStudent = (value: boolean) => {
		dispatch(resetEnrollStudent());
		dispatch(setModalState({ value: { modalEnrollStudent: value } }));
	};
	return (
		<Dialog open={modalState.modalEnrollStudent} onOpenChange={onOpenChangeModalAssignStudent}>
			<DialogContent className="max-w-2xl">
				<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar">
					<DialogHeader>
						<DialogTitle>Menambahkan Siswa</DialogTitle>
					</DialogHeader>
					<hr className="my-4" />
					<TableBrowse isBrowse={false} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ModalEnrollStudent;
