import { useGetCyclesQuery } from '@/api/cycleApi';
import Pagination from '@/components/pagination';
import SkeletonLoading from '@/components/skeleton-loading';
import TableFilter from '@/components/table-filter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
import { PlusCircle, Search } from 'lucide-react';
import React from 'react';

interface TableBrowseProps {
	// data: Cycle[];
}

// const HEAD = {

// }

const TableBrowse: React.FC<TableBrowseProps> = ({}) => {
	const dispatch = useAppDispatch();

	const { paginationState } = useAppSelector((state) => state.cycle);

	const {
		data: cycles,
		isLoading,
		isSuccess,
	} = useGetCyclesQuery({ page: paginationState.page, limit: paginationState.pageSize });

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
						<TableFilter />
						<Button size="sm" className="h-7 gap-1" onClick={() => onOpenChange(true)}>
							<PlusCircle className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Tahun Ajaran</span>
						</Button>
					</div>
				</div>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<div className="flex justify-between items-center">
									<span>Tanggal Mulai</span>
									<Popover>
										<PopoverTrigger asChild>
											<button>
												<Search className="h-4 w-4" />
											</button>
										</PopoverTrigger>
										<PopoverContent className="w-52" align="end">
											<div className="flex flex-col gap-2">
												<Input id="startDate" className="col-span-2 h-8" />
												<div className="flex items-center gap-2">
													<Button size={'sm'} className="h-7 gap-1 flex-1">
														Cari
													</Button>
													<Button size={'sm'} variant={'outline'} className="h-7 gap-1 flex-1">
														Reset
													</Button>
												</div>
											</div>
										</PopoverContent>
									</Popover>
								</div>
							</TableHead>
							<TableHead>Tanggal Selesai</TableHead>
							<TableHead>Keterangan</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{cycles.data.cycles.map((cycle, key) => {
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
			</>
		);
	}

	return content;
};

export default TableBrowse;
