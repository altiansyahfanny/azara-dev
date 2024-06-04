import { useGetCyclesQuery } from '@/api/cycleApi';
import Container from '@/components/core/container';
import Pagination from '@/components/pagination';
import CreateCycle from '@/components/panel/cycle/create';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { setModalState, setPaginationState } from '@/store/features/cycleSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { PlusCircle } from 'lucide-react';

const Cycle = () => {
	const dispatch = useAppDispatch();

	const { paginationState, modalState } = useAppSelector((state) => state.cycle);

	const {
		data: cycles,
		isLoading,
		isSuccess,
	} = useGetCyclesQuery({ page: paginationState.page, limit: paginationState.pageSize });

	const onOpenChange = (value: boolean) => {
		dispatch(setModalState({ value: { modalCreate: value } }));
	};

	let content;

	if (isLoading) {
		content = (
			<div className="flex items-center space-x-4">
				<Skeleton className="h-12 w-12 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[250px]" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
			</div>
		);
	}

	if (isSuccess) {
		content = (
			<>
				<div className="flex mb-4">
					<div className="ml-auto flex items-center gap-2">
						<Button size="sm" className="h-7 gap-1" onClick={() => onOpenChange(true)}>
							<PlusCircle className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Tahun Ajaran</span>
						</Button>
					</div>
				</div>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tanggal Mulai</TableHead>
							<TableHead>Tanggal Selesai</TableHead>
							<TableHead>Keterangan</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{cycles?.data.cycles.map((cycle, key) => {
							return (
								<TableRow key={key}>
									<TableCell className="font-medium">{cycle.startDate}</TableCell>
									<TableCell className="font-medium">{cycle.endDate}</TableCell>
									<TableCell className="font-medium">{cycle.description}</TableCell>
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
								<DialogTitle>Tambah Tahun Ajaran</DialogTitle>
							</DialogHeader>
							<hr className="my-4" />
							<CreateCycle />
						</div>
					</DialogContent>
				</Dialog>
			</>
		);
	}

	return <Container title="Tahun Ajaran">{content}</Container>;
};

export default Cycle;
