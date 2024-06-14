import Table from '@/components/table';
import React from 'react';
import { TableProps as TablePropsAntd } from '@/lib/antd';
import { ApiResponse } from '@/types/api.type';
import { ClassroomId, ClassroomStudent } from '@/types/classroom.type';
import SkeletonLoading from '@/components/skeleton-loading';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { setEnrollStudent, setModalState } from '@/store/features/classroomIdSlice';
import { useAppDispatch } from '@/store/store';

interface TableStudentProps {
	classroom: ApiResponse<ClassroomId> | undefined;
	isLoading: boolean;
	isSuccess: boolean;
}

const columns: TablePropsAntd<ClassroomStudent>['columns'] = [
	{
		title: 'Nama Depan',
		dataIndex: 'firstName',
		key: 'firstName',
		render: (text: any) => text,
	},
	{
		title: 'Nama Belakang',
		dataIndex: 'lastName',
		key: 'lastName',
		render: (text: any) => text,
	},
];

const TableStudent: React.FC<TableStudentProps> = ({ classroom, isLoading, isSuccess }) => {
	const dispatch = useAppDispatch();

	let content;

	if (isLoading) {
		content = <SkeletonLoading />;
	}

	if (isSuccess) {
		content = (
			<div className="flex">
				<h2 className="text-xl font-semibold leading-none tracking-tight">Siswa</h2>
				<div className="ml-auto flex items-center gap-2">
					<Button
						size="sm"
						className="h-7 gap-1"
						onClick={() => {
							dispatch(setModalState({ value: { modalEnrollStudent: true } }));
							dispatch(setEnrollStudent({ value: { classroom: classroom?.data } }));
						}}
					>
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Siswa</span>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="border rounded-lg p-4 grid gap-4">
			{content}
			<Table dataSource={classroom?.data.students} columns={columns} loading={isLoading} />
		</div>
	);
};

export default TableStudent;
