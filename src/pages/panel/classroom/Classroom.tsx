import { useGetClassroomsQuery } from '@/api/classroomApi';
import Container from '@/components/core/container';
import Pagination from '@/components/pagination';
import CreateClassroom from '@/components/panel/classroom/create';
import SkeletonLoading from '@/components/skeleton-loading';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { setModalState, setPaginationState } from '@/store/features/classroomSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Classroom = () => {
	const dispatch = useAppDispatch();

	const { paginationState, modalState } = useAppSelector((state) => state.classroom);

	const {
		data: classrooms,
		isLoading,
		isSuccess,
	} = useGetClassroomsQuery({ page: paginationState.page, limit: paginationState.pageSize });

	const onOpenChange = (value: boolean) => {
		dispatch(setModalState({ value: { modalCreate: value } }));
	};

	let content;

	if (isLoading) content = <SkeletonLoading />;

	if (isSuccess) {
		content = (
			<>
				<div className="flex mb-4">
					<div className="ml-auto flex items-center gap-2">
						<Button size="sm" className="h-7 gap-1" onClick={() => onOpenChange(true)}>
							<PlusCircle className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Kelas</span>
						</Button>
					</div>
				</div>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Kelas</TableHead>
							<TableHead>Keterangan Tahun Ajaran</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{classrooms?.data.classrooms.map((classroom, key) => {
							return (
								<TableRow key={key}>
									<TableCell className="font-medium">
										<Link to={`./${classroom.id}`}>{classroom.classroomName}</Link>
									</TableCell>
									<TableCell className="font-medium">{classroom.cycleDescription}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>

				<Pagination
					totalItems={paginationState.total}
					itemsPerPage={paginationState.pageSize}
					currentPage={paginationState.page}
					onPageChange={(number) => {
						dispatch(setPaginationState({ value: { page: number } }));
					}}
					onPageSizeChange={(number) =>
						dispatch(setPaginationState({ value: { pageSize: number } }))
					}
					className="mt-8"
				/>

				<Dialog open={modalState.modalCreate} onOpenChange={onOpenChange}>
					<DialogContent>
						<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar">
							<DialogHeader>
								<DialogTitle>Tambah Kelas</DialogTitle>
							</DialogHeader>
							<hr className="my-4" />
							<CreateClassroom />
						</div>
					</DialogContent>
				</Dialog>
			</>
		);
	}

	return <Container title="Kelas">{content}</Container>;
};

export default Classroom;
