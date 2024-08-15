import Container from '@/components/core/container';
import CreateMeeting from '@/components/panel/meeting/create';
import TableBrowse from '@/components/panel/meeting/table-browse';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useTitle from '@/hooks/useTitle';
import { setModalState } from '@/store/features/meetingSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

const Meeting = () => {
	useTitle('Pertemuan');

	const dispatch = useAppDispatch();

	const { modalState } = useAppSelector((state) => state.meeting);

	const onOpenChange = (value: boolean) => {
		dispatch(setModalState({ value: { modalCreate: value } }));
	};

	return (
		<Container title="Pertemuan">
			<TableBrowse />
			<Dialog open={modalState.modalCreate} onOpenChange={onOpenChange}>
				<DialogContent>
					<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
						<DialogHeader>
							<DialogTitle>Tambah Pertemuan</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						<CreateMeeting />
					</div>
				</DialogContent>
			</Dialog>
		</Container>
	);
};

export default Meeting;
