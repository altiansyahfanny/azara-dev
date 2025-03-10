import { useGetCoursesQuery } from '@/api/courseApi';
import Table from '@/components/table';
import { Input } from '@/components/ui/input';
import { TableColumnType, TableProps as TablePropsAntd } from '@/lib/antd';
import { setAssignCourse } from '@/store/features/classroomIdSlice';
import { setFilterState, setModalState, setPaginationState } from '@/store/features/courseSlice';
import { setModalState as setModalStateTeacherSlice } from '@/store/features/classroomIdSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Course, CourseFilter } from '@/types/course.type';
import { Plus, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';

interface TableBrowseProps {
	isBrowse?: boolean;
}

const TableBrowse: React.FC<TableBrowseProps> = ({ isBrowse = true }) => {
	const dispatch = useAppDispatch();

	const { paginationState, filterState } = useAppSelector((state) => state.course);

	const onAssign = (course: Course) => {
		dispatch(setAssignCourse({ value: { course } }));
		dispatch(setModalStateTeacherSlice({ value: { modalAssignTeacher: true } }));
		dispatch(setModalStateTeacherSlice({ value: { modalAssignCourse: false } }));
	};

	const {
		data: courses,
		isLoading,
		isSuccess,
		isError,
		refetch,
	} = useGetCoursesQuery({
		page: paginationState.page,
		limit: paginationState.pageSize,
		...filterState,
	});

	const onOpenChange = (value: boolean) => {
		dispatch(setModalState({ value: { modalCreate: value } }));
	};

	//

	const [filter, setFilter] = useState<CourseFilter>({ description: '', courseName: '' });
	const [searchedColumn, setSearchedColumn] = useState<string>();

	useEffect(() => {
		dispatch(setFilterState({ value: filter }));
		refetch();
	}, []);

	const handleSearch = (dataIndex: keyof CourseFilter) => {
		setSearchedColumn(dataIndex);
		dispatch(setFilterState({ value: filter }));
	};

	const handleReset = (dataIndex: keyof CourseFilter) => {
		const newFilter = { ...filter, [dataIndex]: '' };
		// delete newFilter[dataIndex];
		setFilter(newFilter);
		dispatch(setFilterState({ value: newFilter }));
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
	};

	const getColumnSearchProps = (dataIndex: keyof CourseFilter): TableColumnType<Course> => ({
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

	const columns: TablePropsAntd<Course>['columns'] = [
		{
			title: 'Nama Mata Pelajaran',
			dataIndex: 'courseName',
			key: 'courseName',
			...getColumnSearchProps('courseName'),
		},

		{
			title: 'Keterangan',
			dataIndex: 'description',
			key: 'description',
			...getColumnSearchProps('description'),
		},
	];

	const columnsWithAction = [
		{
			title: 'Aksi',
			type: 'action',
			key: 'action',
			textAlign: 'center',
			width: 80,
			render: (course: Course) => {
				return <Table.ButtonAction onClick={() => onAssign(course)} Icon={Plus} />;
			},
		},
		...columns,
	];
	//

	return (
		<Table
			dataSource={courses?.data.courses}
			columns={isBrowse ? columns : columnsWithAction}
			loading={isLoading}
			error={isError}
			success={isSuccess}
			actions={
				isBrowse
					? [{ Icon: PlusCircle, text: 'Mata Pelajaran', onClick: () => onOpenChange(true) }]
					: []
			}
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
