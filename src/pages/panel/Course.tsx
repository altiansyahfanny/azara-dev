import Container from '@/components/core/container';
import CreateCourse from '@/components/panel/course/create';
import TableBrowse from '@/components/panel/course/table-browse';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useTitle from '@/hooks/useTitle';
import { setModalState } from '@/store/features/courseSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { PlusCircle } from 'lucide-react';

const Course = () => {
	useTitle('Mata Pelajaran');

	const dispatch = useAppDispatch();

	const { modalState } = useAppSelector((state) => state.course);

	const onModalCreateChange = (value: boolean) => {
		dispatch(setModalState({ value: { modalCreate: value } }));
	};

	return (
		<Container title="Mata Pelajaran">
			<div className="flex mb-4">
				<div className="ml-auto flex items-center gap-2">
					<Button size="sm" className="h-7 gap-1" onClick={() => onModalCreateChange(true)}>
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Mata Pelajaran</span>
					</Button>
				</div>
			</div>
			<TableBrowse />
			<Dialog open={modalState.modalCreate} onOpenChange={onModalCreateChange}>
				<DialogContent>
					<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar">
						<DialogHeader>
							<DialogTitle>Tambah Mata Pelajaran</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						<CreateCourse />
					</div>
				</DialogContent>
			</Dialog>
		</Container>
	);
};

export default Course;
