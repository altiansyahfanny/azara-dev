import { useGetTeachersQuery } from '@/api/teacherApi';
import { DummyProfile } from '@/assets/dashboard/img';
import Table from '@/components/table';
import { Input } from '@/components/ui/input';
import { TableColumnType, TableProps as TablePropsAntd } from '@/lib/antd';
import { setAssignCourse, setModalState } from '@/store/features/classroomIdSlice';
import { setFilterState, setPaginationState } from '@/store/features/teacherSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Teacher, TeacherFilter } from '@/types/user.type';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';

interface TableBrowseProps {
	isBrowse?: boolean;
}

const TableBrowse: React.FC<TableBrowseProps> = ({ isBrowse = true }) => {
	const dispatch = useAppDispatch();

	const { paginationState, filterState } = useAppSelector((state) => state.teacher);

	const {
		data: teachers,
		isLoading,
		isError,
		isSuccess,
		refetch,
	} = useGetTeachersQuery({
		page: paginationState.page,
		limit: paginationState.pageSize,
		...filterState,
	});

	const onEnroll = (teacher: Teacher) => {
		dispatch(setAssignCourse({ value: { teacher } }));
		dispatch(setModalState({ value: { modalFormAssignTeacherAndCourse: true } }));
		dispatch(setModalState({ value: { modalAssignTeacher: false } }));
	};

	const [filter, setFilter] = useState<TeacherFilter>({ firstName: '', lastName: '' });
	const [searchedColumn, setSearchedColumn] = useState<string>();

	useEffect(() => {
		dispatch(setFilterState({ value: filter }));
		refetch();
	}, []);

	const handleSearch = (dataIndex: keyof TeacherFilter) => {
		setSearchedColumn(dataIndex);
		dispatch(setFilterState({ value: filter }));
	};

	const handleReset = (dataIndex: keyof TeacherFilter) => {
		const newFilter = { ...filter, [dataIndex]: '' };
		// delete newFilter[dataIndex];
		setFilter(newFilter);
		dispatch(setFilterState({ value: newFilter }));
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
	};

	const getColumnSearchProps = (dataIndex: keyof TeacherFilter): TableColumnType<Teacher> => ({
		filterDropdown: ({ confirm }) => {
			const onSearch = () => {
				handleSearch(dataIndex);
				confirm();
			};

			const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
				if (e.key === 'Enter') onSearch();
			};

			let content = (
				<Input
					name={dataIndex}
					onChange={onChange}
					value={filter && (filter[dataIndex] as string | undefined)}
					onKeyDown={onKeyDown}
					autoComplete="off"
				/>
			);

			return (
				<div className="flex flex-col gap-2">
					<div onKeyDown={(e) => e.stopPropagation()}>{content}</div>
					<div className="flex items-center gap-2">
						<Table.ButtonFilter
							type="search"
							onClick={() => {
								onSearch();
							}}
						/>
						<Table.ButtonFilter
							type="reset"
							onClick={() => {
								handleReset(dataIndex);
								confirm();
							}}
						/>
					</div>
				</div>
			);
		},
		render: (text: any) => {
			const searchWords = filter[dataIndex];

			if (searchedColumn === dataIndex) {
				return (
					<Highlighter
						highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
						searchWords={[searchWords as string]}
						autoEscape
						textToHighlight={text ? text.toString() : ''}
					/>
				);
			} else {
				return text;
			}
		},
	});

	const columns: TablePropsAntd<Teacher>['columns'] = [
		{
			title: 'Pic.',
			key: 'pic',
			textAlign: 'center',
			width: 100,
			render: (teacher: Teacher) => {
				return (
					<img
						alt="Product image"
						className="aspect-square rounded-md object-cover"
						height="64"
						src={teacher?.imageUrl ?? DummyProfile}
						width="64"
					/>
				);
			},
		},
		{
			title: 'Nama Depan',
			dataIndex: 'firstName',
			key: 'firstName',
			...getColumnSearchProps('firstName'),
		},
		{
			title: 'Nama Belakang',
			dataIndex: 'lastName',
			key: 'lastName',
			...getColumnSearchProps('lastName'),
		},
	];

	const columnsWithAction = [
		{
			title: 'Aksi',
			type: 'action',
			key: 'action',
			textAlign: 'center',
			width: 80,
			render: (teacher: Teacher) => {
				return <Table.ButtonAction onClick={() => onEnroll(teacher)} Icon={Plus} />;
			},
		},
		...columns,
	];

	return (
		<Table
			dataSource={teachers?.data.teachers}
			columns={isBrowse ? columns : columnsWithAction}
			loading={isLoading}
			error={isError}
			success={isSuccess}
			pagination={{
				totalItems: paginationState.total,
				itemsPerPage: paginationState.pageSize,
				currentPage: paginationState.page,
				onPageChange: (number) => {
					dispatch(setPaginationState({ value: { page: number } }));
				},
				onPageSizeChange: (number) => dispatch(setPaginationState({ value: { pageSize: number } })),
			}}
		/>
	);
};

export default TableBrowse;
