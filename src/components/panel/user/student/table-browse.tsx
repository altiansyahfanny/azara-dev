import { useGetStudentsQuery } from '@/api/studentApi';
import { DummyProfile } from '@/assets/dashboard/img';
import Pagination from '@/components/pagination';
import SkeletonLoading from '@/components/skeleton-loading';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { setEnrollStudent, setModalState } from '@/store/features/classroomIdSlice';
import { setPaginationState } from '@/store/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Student } from '@/types/user.type';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';

interface TableBrowseProps {
	isBrowse?: boolean;
}

const TableBrowse: React.FC<TableBrowseProps> = ({ isBrowse = true }) => {
	const dispatch = useAppDispatch();

	const { paginationState } = useAppSelector((state) => state.student);

	const {
		data: students,
		isLoading,
		isSuccess,
	} = useGetStudentsQuery({ page: paginationState.page, limit: paginationState.pageSize });

	const onEnroll = (student: Student) => {
		dispatch(setEnrollStudent({ value: { student } }));
		dispatch(setModalState({ value: { modalEnrollStudent: false } }));
		dispatch(setModalState({ value: { modalFormEnrollStudent: true } }));
	};

	let content;

	if (isLoading) content = <SkeletonLoading />;

	if (isSuccess) {
		content = (
			<>
				<Table>
					<TableHeader>
						<TableRow>
							{!isBrowse && <TableHead className="w-[80px]">Aksi</TableHead>}
							<TableHead className="hidden w-[100px] sm:table-cell">
								<span className="sr-only">Image</span>
							</TableHead>
							<TableHead>Nama Depan</TableHead>
							<TableHead>Nama Belakang</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{students?.data.students.map((user, key) => {
							return (
								<TableRow key={key}>
									{!isBrowse && (
										<TableCell>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														size="sm"
														className="h-7 gap-1 p-1"
														onClick={() => onEnroll(user)}
													>
														<ArrowUpRight className="h-5 w-5" />
													</Button>
												</TooltipTrigger>
												<TooltipContent>Daftarkan</TooltipContent>
											</Tooltip>
										</TableCell>
									)}
									<TableCell className="hidden sm:table-cell">
										<img
											alt="Product image"
											className="aspect-square rounded-md object-cover"
											height="64"
											src={user.imageUrl ?? DummyProfile}
											width="64"
										/>
									</TableCell>
									<TableCell className="font-medium">{user.firstName}</TableCell>
									<TableCell className="font-medium">{user.lastName}</TableCell>
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
