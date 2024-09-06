import { useGetPaymentsQuery } from '@/api/paymentApi';
import Table from '@/components/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { TableColumnType, TableProps as TablePropsAntd } from '@/lib/antd';
import {
	setDataCreateState,
	setFilterState,
	setModalState,
	setPaginationState,
	setSortingState,
} from '@/store/features/paymentListSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Payment, PaymentFilter } from '@/types/payment.type';
import { Filter, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { apiSlice } from '@/api/api';
import { formatNumber } from '@/helpers/app-helper';
import CreatePayment from './create';
import FilterPaymentDate from './filter-payment-date';
// import { Badge } from "@/components/ui/badge";

export const teacherAttendanceStatusMapper = {
	present: <p>Hadir</p>,
	absent: <p>Absen</p>,
	represented: <p>Diwakilkan</p>,
};

const TableBrowse = () => {
	const dispatch = useAppDispatch();

	const { paginationState, filterState, modalState, sortingState } = useAppSelector(
		(state) => state.paymentList
	);

	const {
		data: payments,
		isLoading,
		isSuccess,
		isError,
		refetch,
		isFetching,
	} = useGetPaymentsQuery({
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

	const [filter, setFilter] = useState<PaymentFilter>({
		representedBy: '',
		firstName: '',
		lastName: '',
		teacherAttendance: '',
		accountNumber: '',
		bankName: '',
		totalPayment: '',
		startFrom: '2024-09-01',
		endTo: '2024-09-30',
	});

	const [searchedColumn, setSearchedColumn] = useState<string>();

	useEffect(() => {
		dispatch(setFilterState({ value: filter }));
		refetch();
	}, []);

	const handleSearch = (dataIndex: keyof PaymentFilter) => {
		setSearchedColumn(dataIndex);
		dispatch(setFilterState({ value: filter }));
	};

	const handleReset = (dataIndex: keyof PaymentFilter) => {
		const newFilter = { ...filter, [dataIndex]: '' };
		// delete newFilter[dataIndex];
		setFilter(newFilter);
		dispatch(setFilterState({ value: newFilter }));
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
	};

	const getColumnSearchProps = (dataIndex: keyof PaymentFilter): TableColumnType<Payment> => ({
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
		},
	});

	const onClickButtonCreate = (payment: Payment) => {
		dispatch(setDataCreateState({ value: payment }));
		dispatch(setModalState({ value: { modalCreate: true } }));
	};

	const columns: TablePropsAntd<Payment>['columns'] = [
		{
			title: 'Aksi',
			type: 'action',
			key: 'action',
			textAlign: 'center',
			width: 80,
			render: (payment: Payment) => {
				return (
					<div className="flex items-center gap-x-2">
						<Table.ButtonAction onClick={() => onClickButtonCreate(payment)} Icon={PlusCircle} />
					</div>
				);
			},
		},
		{
			title: 'Nama Depan Guru',
			dataIndex: 'firstName',
			key: 'firstName',
			...getColumnSearchProps('firstName'),
		},
		{
			title: 'Nama Belakang Guru',
			dataIndex: 'lastName',
			key: 'lastName',
			...getColumnSearchProps('lastName'),
		},
		{
			title: 'Kehadiran Guru',
			dataIndex: 'teacherAttendance',
			key: 'teacherAttendance',
			render: (text: 'present' | 'absent' | 'represented') => (
				<div className="flex">{text ? teacherAttendanceStatusMapper[text] : '-'}</div>
			),
		},
		{
			title: 'Diwakilkan Oleh',
			dataIndex: 'representedBy',
			key: 'representedBy',
			...getColumnSearchProps('representedBy'),
			// render: (text: string) => text || "-",
		},
		{
			title: 'Nomor Rekening',
			dataIndex: 'accountNumber',
			key: 'accountNumber',
			render: (text: string) => text || '-',
		},
		{
			title: 'Nama Bank',
			dataIndex: 'bankName',
			key: 'bankName',
			render: (text: string) => text || '-',
		},
		{
			title: 'Total Pembayaran',
			dataIndex: 'totalPayment',
			key: 'totalPayment',
			sorter: true,
			render: (text: number) => formatNumber(text),
		},
	];

	//

	return (
		<>
			<Table
				dataSource={payments?.data.payments}
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
