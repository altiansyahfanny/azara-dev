import { useGetClassroomsQuery } from '@/api/classroomApi';
import Table from '@/components/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { formatNumber } from '@/helpers/app-helper';
import { TableColumnType, TableProps as TablePropsAntd } from '@/lib/antd';
import { setFilterState, setModalState, setPaginationState } from '@/store/features/classroomSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Classroom, ClassroomFilter } from '@/types/classroom.type';
import { Eye, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import UpdateClassroom from './update';

const TableBrowse = () => {
	const dispatch = useAppDispatch();

	const { paginationState, filterState, modalState } = useAppSelector((state) => state.classroom);

	const {
		data: classrooms,
		isLoading,
		isSuccess,
		isError,
		refetch,
	} = useGetClassroomsQuery({
		page: paginationState.page,
		limit: paginationState.pageSize,
		...filterState,
	});

	const onOpenChange = (value: boolean) => {
		dispatch(setModalState({ value: { modalCreate: value } }));
	};

	const onOpenChangeUpdate = (value: boolean) => {
		dispatch(setModalState({ value: { modalUpdate: value } }));
	};

	const [filter, setFilter] = useState<ClassroomFilter>({
		cycleDescription: '',
		classroomName: '',
		price: '',
	});
	const [searchedColumn, setSearchedColumn] = useState<string>();

	useEffect(() => {
		dispatch(setFilterState({ value: filter }));
		refetch();
	}, []);

	const handleSearch = (dataIndex: keyof ClassroomFilter) => {
		setSearchedColumn(dataIndex);
		dispatch(setFilterState({ value: filter }));
	};

	const handleReset = (dataIndex: keyof ClassroomFilter) => {
		const newFilter = { ...filter, [dataIndex]: '' };
		// delete newFilter[dataIndex];
		setFilter(newFilter);
		dispatch(setFilterState({ value: newFilter }));
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
	};

	const getColumnSearchProps = (dataIndex: keyof ClassroomFilter): TableColumnType<Classroom> => ({
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

			if (dataIndex === 'price') {
				return (
					<Highlighter
						highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
						searchWords={[searchWords as string]}
						autoEscape
						textToHighlight={text ? formatNumber(text as number).toString() : ''}
					/>
				);
			} else {
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
			}
		},
	});

	const navigate = useNavigate();

	const columns: TablePropsAntd<Classroom>['columns'] = [
		{
			title: 'Aksi',
			type: 'action',
			key: 'action',
			textAlign: 'center',
			width: 80,
			render: (classroom: Classroom) => {
				return (
					<div className="flex items-center gap-x-2">
						<Table.ButtonAction onClick={() => navigate(`${classroom.id}`)} Icon={Eye} />
					</div>
				);
			},
		},
		{
			title: 'Nama Mata Pelajaran',
			dataIndex: 'classroomName',
			key: 'classroomName',
			...getColumnSearchProps('classroomName'),
		},
		{
			title: 'Keterangan',
			dataIndex: 'cycleDescription',
			key: 'cycleDescription',
			...getColumnSearchProps('cycleDescription'),
		},
		{
			title: 'Harga',
			dataIndex: 'price',
			key: 'price',
			...getColumnSearchProps('price'),
		},
	];

	//

	return (
		<>
			<Table
				dataSource={classrooms?.data.classrooms}
				columns={columns}
				loading={isLoading}
				error={isError}
				success={isSuccess}
				actions={[{ Icon: PlusCircle, text: 'Tambah Kelas', onClick: () => onOpenChange(true) }]}
				pagination={{
					totalItems: paginationState.total,
					itemsPerPage: paginationState.pageSize,
					currentPage: paginationState.page,
					onPageChange: (number) => {
						dispatch(setPaginationState({ value: { page: number } }));
					},
					onPageSizeChange: (number) =>
						dispatch(setPaginationState({ value: { pageSize: number } })),
				}}
			/>

			<Dialog open={modalState.modalUpdate} onOpenChange={onOpenChangeUpdate}>
				<DialogContent>
					<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
						<DialogHeader>
							<DialogTitle>Edit Kelas</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						<UpdateClassroom />
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default TableBrowse;
