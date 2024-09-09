import { apiSlice } from '@/api/api';
import Table from '@/components/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { formatNumber } from '@/helpers/app-helper';
import { TableColumnType, TableProps as TablePropsAntd } from '@/lib/antd';
import {
	setDataCreateState,
	setFilterState,
	setModalState,
	setPaginationState,
	setSortingState,
} from '@/store/features/studentPaymentListSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Filter, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import CreatePayment from './create';
import { useGetStudentPaymentsQuery } from '@/api/studentPaymentApi';
import { Badge } from '@/components/ui/badge';
import { StudentPayment, StudentPaymentFilter } from '@/types/stundentPayment.type';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import FilterPaymentDate from './filter-payment-date';
import { endOfMonth, format, startOfMonth } from 'date-fns';

export const teacherAttendanceStatusMapper = {
	present: <p>Hadir</p>,
	absent: <p>Absen</p>,
	represented: <p>Diwakilkan</p>,
};

const TableBrowse = () => {
	const dispatch = useAppDispatch();

	const { paginationState, filterState, modalState, sortingState } = useAppSelector(
		(state) => state.studentPaymentList
	);

	const {
		data: studentPayments,
		isLoading,
		isSuccess,
		isError,
		refetch,
		isFetching,
	} = useGetStudentPaymentsQuery({
		page: paginationState.page,
		limit: paginationState.pageSize,
		...filterState,
		...sortingState,
	});

	const onOpenChangeCreate = (value: boolean) => {
		dispatch(setModalState({ value: { modalCreate: value } }));
	};

	const onOpenChangeFilter = (value: boolean) => {
		dispatch(setModalState({ value: { modalFilter: value } }));
	};

	//

	const [filter, setFilter] = useState<StudentPaymentFilter>({
		classroomName: '',
		startFrom: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
		endTo: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
	});

	const [searchedColumn, setSearchedColumn] = useState<string>();

	useEffect(() => {
		dispatch(setFilterState({ value: filter }));
		refetch();
	}, []);

	const handleSearch = (dataIndex: keyof StudentPaymentFilter) => {
		setSearchedColumn(dataIndex);
		dispatch(setFilterState({ value: filter }));
	};

	const handleReset = (dataIndex: keyof StudentPaymentFilter) => {
		const newFilter = { ...filter, [dataIndex]: '' };
		// delete newFilter[dataIndex];
		setFilter(newFilter);
		dispatch(setFilterState({ value: newFilter }));
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
	};

	const getColumnSearchProps = (
		dataIndex: keyof StudentPaymentFilter
	): TableColumnType<StudentPayment> => ({
		filterDropdown: ({ confirm }) => {
			const onSearch = () => {
				handleSearch(dataIndex);
				confirm();
			};

			const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
				if (e.key === 'Enter') onSearch();
			};

			let content;

			if (['paymentStatus'].includes(dataIndex)) {
				content = (
					<Select
						onValueChange={(e) =>
							setFilter((prev) => ({
								...prev!,
								paymentStatus: e,
							}))
						}
						value={filter && (filter[dataIndex] as string | undefined)}
					>
						<SelectTrigger className="w-40">
							<SelectValue placeholder={`Pilih Status`} />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value={'true'}>Sudah</SelectItem>
							<SelectItem value={'false'}>Belum</SelectItem>
						</SelectContent>
					</Select>
				);
			} else {
				content = (
					<Input
						name={dataIndex}
						onChange={onChange}
						value={filter && (filter[dataIndex] as string | undefined)}
						onKeyDown={onKeyDown}
						autoComplete="off"
					/>
				);
			}

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

			if (['paymentStatus'].includes(dataIndex)) {
				return (
					<div className="flex justify-center">
						{text ? (
							<Badge variant={'secondary'}>Sudah</Badge>
						) : (
							<Badge variant={'destructive'}>Belum</Badge>
						)}
					</div>
				);
			} else {
				if (searchedColumn === dataIndex) {
					return (
						<Highlighter
							highlightStyle={{
								backgroundColor: '#ffc069',
								padding: 0,
							}}
							searchWords={[searchWords as string]}
							autoEscape
							textToHighlight={text ? text.toString() : ''}
						/>
					);
				} else {
					return text ?? '-';
				}
			}
		},
	});

	const onClickButtonCreate = (studentPayment: StudentPayment) => {
		dispatch(setDataCreateState({ value: studentPayment }));
		dispatch(setModalState({ value: { modalCreate: true } }));
	};

	const columns: TablePropsAntd<StudentPayment>['columns'] = [
		{
			title: 'Aksi',
			type: 'action',
			key: 'action',
			textAlign: 'center',
			width: 80,
			render: (studentPayment: StudentPayment) => {
				return (
					<div className="flex items-center gap-x-2">
						<Table.ButtonAction
							onClick={() => onClickButtonCreate(studentPayment)}
							Icon={PlusCircle}
						/>
					</div>
				);
			},
		},
		{
			title: 'Nama Depan',
			dataIndex: 'firstName',
			key: 'firstName',
			sorter: true,
			...getColumnSearchProps('firstName'),
		},
		{
			title: 'Nama Belakang',
			dataIndex: 'lastName',
			key: 'lastName',
			sorter: true,
			...getColumnSearchProps('lastName'),
		},
		{
			title: 'Kelas',
			dataIndex: 'classroomName',
			key: 'classroomName',
			sorter: true,
			...getColumnSearchProps('classroomName'),
		},
		{
			title: 'Harga Kelas',
			dataIndex: 'classroomPrice',
			key: 'classroomPrice',
			// sorter: true,
			render: (text: number) => formatNumber(text),
		},
		{
			title: 'Status Pembayaran',
			dataIndex: 'paymentStatus',
			key: 'paymentStatus',
			textAlign: 'center',
			// sorter: true,
			...getColumnSearchProps('paymentStatus'),
		},
	];

	//

	return (
		<>
			<Table
				dataSource={studentPayments?.data.students}
				columns={columns}
				loading={isLoading || isFetching}
				error={isError}
				success={isSuccess}
				actions={[
					{
						Icon: Filter,
						text: 'Filter Tanggal',
						onClick: () => {
							dispatch(setModalState({ value: { modalFilter: true } }));
						},
					},
				]}
				pagination={{
					totalPages: paginationState.totalPage,
					itemsPerPage: paginationState.pageSize,
					currentPage: paginationState.page,
					onPageChange: (number) => {
						dispatch(setPaginationState({ value: { page: number } }));
					},
					onPageSizeChange: (number) => {
						dispatch(
							setPaginationState({
								value: {
									pageSize: number,
									page: 1,
								},
							})
						);

						dispatch(apiSlice.util.invalidateTags(['Payments']));
					},
				}}
				onChange={(column, sortDirection) => {
					dispatch(
						setSortingState({
							value: {
								sort: sortDirection ? column : '',
								sortDirection: sortDirection,
							},
						})
					);
				}}
			/>
			<Dialog open={modalState.modalCreate} onOpenChange={onOpenChangeCreate}>
				<DialogContent>
					<div className="max-h-96 px-4 overflow-scroll no-scrollbar bggray">
						<DialogHeader>
							<DialogTitle>Tambah Pembayaran</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						<CreatePayment />
					</div>
				</DialogContent>
			</Dialog>

			<Dialog open={modalState.modalFilter} onOpenChange={onOpenChangeFilter}>
				<DialogContent>
					<div className="max-h-96 px-4 overflow-scroll no-scrollbar bggray">
						<DialogHeader>
							<DialogTitle>Filter Tanggal Pembayaran</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						<FilterPaymentDate />
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default TableBrowse;
