import { useGetCoursesQuery } from '@/api/courseApi';
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
import { setAssignCourse, setModalState } from '@/store/features/classroomIdSlice';
import { setPaginationState } from '@/store/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Course } from '@/types/course.type';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';

interface TableBrowseProps {
	isBrowse?: boolean;
}

const TableBrowse: React.FC<TableBrowseProps> = ({ isBrowse = true }) => {
	const dispatch = useAppDispatch();

	const onEnroll = (course: Course) => {
		dispatch(setAssignCourse({ value: { course } }));
		dispatch(setModalState({ value: { modalAssignTeacher: true } }));
		dispatch(setModalState({ value: { modalAssignCourse: false } }));
	};

	const { paginationState } = useAppSelector((state) => state.course);

	const {
		data: courses,
		isLoading,
		isSuccess,
	} = useGetCoursesQuery({ page: paginationState.page, limit: paginationState.pageSize });

	let content;

	if (isLoading) content = <SkeletonLoading />;

	if (isSuccess) {
		content = (
			<>
				<Table>
					<TableHeader>
						<TableRow>
							{!isBrowse && <TableHead className="w-[80px]">Aksi</TableHead>}
							<TableHead>Mata Pelajaran</TableHead>
							<TableHead>Keterangan</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{courses?.data.courses.map((course, key) => {
							return (
								<TableRow key={key}>
									{!isBrowse && (
										<TableCell>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														size="sm"
														className="h-7 gap-1 p-1"
														onClick={() => onEnroll(course)}
													>
														<ArrowUpRight className="h-5 w-5" />
													</Button>
												</TooltipTrigger>
												<TooltipContent>Daftarkan</TooltipContent>
											</Tooltip>
										</TableCell>
									)}
									<TableCell className="font-medium">{course.courseName}</TableCell>
									<TableCell className="font-medium">{course.description}</TableCell>
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
