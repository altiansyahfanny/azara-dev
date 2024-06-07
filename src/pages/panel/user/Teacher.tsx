import { DummyProfile } from '@/assets/dashboard/img';
import Container from '@/components/core/container';
import Pagination from '@/components/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useGetTeachersQuery } from '@/api/teacherApi';
import { setPaginationState } from '@/store/features/teacherSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import useTitle from '@/hooks/useTitle';

const Teacher = () => {
	useTitle('Pengguna - Guru');
	const dispatch = useAppDispatch();

	const { paginationState } = useAppSelector((state) => state.teacher);

	const {
		data: teachers,
		isLoading,
		isSuccess,
	} = useGetTeachersQuery({ page: paginationState.page, limit: paginationState.pageSize });

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
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="hidden w-[100px] sm:table-cell">
								<span className="sr-only">Image</span>
							</TableHead>
							<TableHead>Nama Depan</TableHead>
							<TableHead>Nama Belakang</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{teachers?.data.teachers.map((user, key) => {
							return (
								<TableRow key={key}>
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
					onPageSizeChange={(number) =>
						dispatch(setPaginationState({ value: { pageSize: number } }))
					}
					currentPage={paginationState.page}
					onPageChange={(number) => {
						dispatch(setPaginationState({ value: { page: number } }));
					}}
					className="mt-8"
				/>
			</>
		);
	}

	return <Container title="Guru">{content}</Container>;
};

export default Teacher;
