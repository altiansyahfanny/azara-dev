import Container from '@/components/core/container';
import TableBrowse from '@/components/panel/meeting/table-browse';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useTitle from '@/hooks/useTitle';
// import { setModalState } from '@/store/features/cycleSlice';
// import { useAppDispatch, useAppSelector } from '@/store/store';

const Meeting = () => {
	useTitle('Pertemuan');

	// const dispatch = useAppDispatch();

	// const { modalState } = useAppSelector((state) => state.cycle);

	// const onOpenChange = (value: boolean) => {
	// 	dispatch(setModalState({ value: { modalCreate: value } }));
	// };

	return (
		<Container title="Pertemuan">
			<TableBrowse />
			{/* <Dialog open={modalState.modalCreate} onOpenChange={onOpenChange}>
				<DialogContent>
					<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
						<DialogHeader>
							<DialogTitle>Tambah Tahun Ajaran</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						<CreateCycle />
					</div>
				</DialogContent>
			</Dialog> */}
		</Container>
	);
};

export default Meeting;
