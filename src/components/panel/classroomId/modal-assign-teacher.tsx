import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TableBrowse from '../user/teacher/table-browse';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { resetAssignCourse, setModalState } from '@/store/features/classroomIdSlice';

const ModalAssignTeacher = () => {
	const dispatch = useAppDispatch();
	const { modalState } = useAppSelector((state) => state.classroomId);

	const onOpenChangeModalAssignTeacher = (value: boolean) => {
		dispatch(resetAssignCourse());
		dispatch(setModalState({ value: { modalAssignTeacher: value } }));
	};

	return (
		<Dialog open={modalState.modalAssignTeacher} onOpenChange={onOpenChangeModalAssignTeacher}>
			<DialogContent className="max-w-2xl">
				<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar">
					<DialogHeader>
						<DialogTitle>Menambahkan Guru</DialogTitle>
					</DialogHeader>
					<hr className="my-4" />
					<TableBrowse isBrowse={false} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ModalAssignTeacher;
