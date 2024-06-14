import Container from '@/components/core/container';
import CreateClassroom from '@/components/panel/classroom/create';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useTitle from '@/hooks/useTitle';
import { setModalState } from '@/store/features/classroomSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import TableBrowse from '@/components/panel/classroom/table-browse';

const Classroom = () => {
	useTitle('Kelas');

	const dispatch = useAppDispatch();

	const { modalState } = useAppSelector((state) => state.classroom);

	const onOpenChange = (value: boolean) => {
		dispatch(setModalState({ value: { modalCreate: value } }));
	};

	return (
		<Container title="Kelas">
			<TableBrowse />
			<Dialog open={modalState.modalCreate} onOpenChange={onOpenChange}>
				<DialogContent>
					<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
						<DialogHeader>
							<DialogTitle>Tambah Kelas</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						<CreateClassroom />
					</div>
				</DialogContent>
			</Dialog>
		</Container>
	);
};

export default Classroom;
