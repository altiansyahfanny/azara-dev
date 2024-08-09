import { useGetStudentsQuery } from '@/api/studentApi';
import { DummyProfile } from '@/assets/dashboard/img';
import Table from '@/components/table';
import { Input } from '@/components/ui/input';
import { TableColumnType, TableProps as TablePropsAntd } from '@/lib/antd';
import { setEnrollStudent, setModalState } from '@/store/features/classroomIdSlice';
import {  setModalState as setModalStateTeacher } from '@/store/features/studentSlice';
import { setDataState, setFilterState, setPaginationState } from '@/store/features/studentSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Student, StudentFilter } from '@/types/user.type';
import { FilePenLine, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UpdateStudent from './update';


interface TableBrowseProps {
	isBrowse?: boolean;
}

const TableBrowse: React.FC<TableBrowseProps> = ({ isBrowse = true }) => {
	const dispatch = useAppDispatch();

	const { paginationState, filterState,  } = useAppSelector((state) => state.student);
	const { modalState } = useAppSelector((state) => state.student);

	const {
		data: students,
		isLoading,
		isError,
		isSuccess,
		refetch,
	} = useGetStudentsQuery({
		page: paginationState.page,
		limit: paginationState.pageSize,
		...filterState,
	});

	const onEnroll = (student: Student) => {
		dispatch(setEnrollStudent({ value: { student } }));
		dispatch(setModalState({ value: { modalEnrollStudent: false } }));
		dispatch(setModalState({ value: { modalFormEnrollStudent: true } }));
	};

	const onClickButtonUpdate = (student: Student) => {
		console.log('student : ', student)

		dispatch(setDataState({ value: student }));
		dispatch(setModalStateTeacher({ value: { modalUpdate: true } }));
	}

	const onOpenChangeUpdate = (value: boolean) => {
		dispatch(setModalStateTeacher({ value: { modalUpdate: value } }));
	};

	const [filter, setFilter] = useState<StudentFilter>({ firstName: '', lastName: '' });
	const [searchedColumn, setSearchedColumn] = useState<string>();

	useEffect(() => {
		dispatch(setFilterState({ value: filter }));
		refetch();
	}, []);

	const handleSearch = (dataIndex: keyof StudentFilter) => {
		setSearchedColumn(dataIndex);
		dispatch(setFilterState({ value: filter }));
	};

	const handleReset = (dataIndex: keyof StudentFilter) => {
		const newFilter = { ...filter, [dataIndex]: '' };
		// delete newFilter[dataIndex];
		setFilter(newFilter);
		dispatch(setFilterState({ value: newFilter }));
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
	};

	const getColumnSearchProps = (dataIndex: keyof StudentFilter): TableColumnType<Student> => ({
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

	const columns: TablePropsAntd<Student>['columns'] = [
		{
			title: 'Aksi',
			type: 'action',
			key: 'action',
			textAlign: 'center',
			width: 80,
			render: (student: Student) => {
				return (
					<div className='flex gap-x-2'>
						{
							!isBrowse && (
								<Table.ButtonAction onClick={() => onEnroll(student)} Icon={Plus} />
							)
						}
						{
							isBrowse && (
								<Table.ButtonAction onClick={() => onClickButtonUpdate(student)} Icon={FilePenLine} />
							)
						}
					</div>
				);
			},
		},
		{
			title: 'Pic.',
			key: 'pic',
			textAlign: 'center',
			width: 100,
			render: (student: Student) => {
				return (
					<img
						alt="Product image"
						className="aspect-square rounded-md object-cover"
						height="64"
						src={student?.imageUrl ?? DummyProfile}
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


	return (
		<>
		
			<Table
				dataSource={students?.data.students}
				columns={columns}
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

			<Dialog open={modalState.modalUpdate} onOpenChange={onOpenChangeUpdate}>
				<DialogContent>
					<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
						<DialogHeader>
							<DialogTitle>Edit Siswa</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						<UpdateStudent />
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default TableBrowse;
