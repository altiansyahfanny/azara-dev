import { apiSlice } from '@/api/api';
import { useDeleteStudentPaymentHistoryMutation } from '@/api/studentPaymentHistoryApi';
import ConfirmAlert from '@/components/confirm-alert';
import Table from '@/components/table';
import { Input } from '@/components/ui/input';
import { catchFunc, formatNumber } from '@/helpers/app-helper';
import { TableColumnType, TableProps as TablePropsAntd } from '@/lib/antd';
import {
	setDataUpdateState,
	setFilterState,
	setModalState,
	setPaginationState,
	setSortingState,
} from '@/store/features/studentPaymentHistorySlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { format } from 'date-fns';
import { FilePenLine, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGetStudentPaymentsHistoryQuery } from '@/api/studentPaymentHistoryApi';
import { StudentPaymentHistory, StudentPaymentHistoryFilter } from '@/types/stundentPayment.type';
import UpdateStudentPaymentHistory from './update';
import InputDate from '@/components/ui/input-date';
import MonthPicker from '@/components/ui/month-picker';

const TableBrowse = () => {
	const dispatch = useAppDispatch();

	const { paginationState, filterState, modalState, sortingState } = useAppSelector(
		(state) => state.studentPaymentHistory
	);

	const [idSPHToDelete, SetIdSPHToDelete] = useState<number | null>();

	const [filter, setFilter] = useState<StudentPaymentHistoryFilter>({
		firstName: '',
		lastName: '',
		accountNumber: '',
		bankName: '',
		forMonth: '',
	});

	const {
		data: studentPaymentsHistory,
		isLoading,
		isSuccess,
		isError,
		refetch,
		isFetching,
	} = useGetStudentPaymentsHistoryQuery({
		page: paginationState.page,
		limit: paginationState.pageSize,
		...filterState,
		...sortingState,
	});

	//

	const [searchedColumn, setSearchedColumn] = useState<string>();

	useEffect(() => {
		dispatch(setFilterState({ value: filter }));
		refetch();
	}, []);

	const handleSearch = (dataIndex: keyof StudentPaymentHistoryFilter) => {
		setSearchedColumn(dataIndex);
		dispatch(setFilterState({ value: filter }));
	};

	const handleReset = (dataIndex: keyof StudentPaymentHistoryFilter) => {
		const newFilter = { ...filter, [dataIndex]: '' };
		// delete newFilter[dataIndex];
		setFilter(newFilter);
		dispatch(setFilterState({ value: newFilter }));
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
	};

	const getColumnSearchProps = (
		dataIndex: keyof StudentPaymentHistoryFilter
	): TableColumnType<StudentPaymentHistory> => ({
		filterDropdown: ({ confirm }) => {
			const onSearch = () => {
				handleSearch(dataIndex);
				confirm();
			};

			const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
				if (e.key === 'Enter') onSearch();
			};

			let content;
			if (['paymentDate'].includes(dataIndex)) {
				const value = filter && filter[dataIndex];

				content = (
					<div className="w-52">
						<InputDate
							value={value ? new Date(value as string) : undefined}
							onSelect={(e) => {
								setFilter((prev) => ({
									...prev!,
									[dataIndex]: format(e as Date, 'yyyy-LL-dd'),
								}));
							}}
						/>
					</div>
				);
			} else if (['forMonth'].includes(dataIndex)) {
				const value = filter && filter[dataIndex];

				content = (
					<div className="w-52">
						<MonthPicker
							value={value ? new Date(value as string) : undefined}
							currentMonth={new Date()}
							onMonthChange={(e) => {
								console.log('eeee : ', e);
								setFilter((prev) => ({
									...prev!,
									[dataIndex]: format(e as Date, 'yyyy-LL-dd'),
								}));
							}}
						/>
					</div>
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

			if (['paymentDate'].includes(dataIndex)) {
				return format(new Date(text), 'yyyy-MM-dd');
			}
			if (['forMonth'].includes(dataIndex)) {
				return format(new Date(text), 'MMMM yyyy');
			}

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
				return text;
			}
		},
	});

	const onOpenChangeDelete = (value: boolean) => {
		dispatch(setModalState({ value: { alertDelete: value } }));
	};

	const onClickButtonDelete = (paymentHistory: StudentPaymentHistory) => {
		console.log('onClickButtonDelete -> paymentHistory : ', paymentHistory);
		SetIdSPHToDelete(paymentHistory.id);
		dispatch(setModalState({ value: { alertDelete: true } }));
	};

	const onClickButtonUpdate = (payment: StudentPaymentHistory) => {
		dispatch(setDataUpdateState({ value: payment }));
		dispatch(setModalState({ value: { modalUpdate: true } }));
	};

	const onOpenChangeUpdate = (value: boolean) => {
		dispatch(setModalState({ value: { modalUpdate: value } }));
	};

	const columns: TablePropsAntd['columns'] = [
		{
			title: 'Aksi',
			type: 'action',
			key: 'action',
			textAlign: 'center',
			width: 80,
			render: (studentPaymentHistory: StudentPaymentHistory) => {
				return (
					<div className="flex items-center gap-x-2">
						<Table.ButtonAction
							onClick={() => onClickButtonUpdate(studentPaymentHistory)}
							Icon={FilePenLine}
						/>
						<Table.ButtonAction
							onClick={() => onClickButtonDelete(studentPaymentHistory)}
							Icon={Trash}
							disabled={isLoadingDelete}
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
			title: 'Nomor Rekening',
			dataIndex: 'accountNumber',
			key: 'accountNumber',
			...getColumnSearchProps('accountNumber'),
		},
		{
			title: 'Nama Bank',
			dataIndex: 'bankName',
			key: 'bankName',
			...getColumnSearchProps('bankName'),
		},
		{
			title: 'Untuk Bulan',
			dataIndex: 'forMonth',
			key: 'forMonth',
			sorter: true,
			...getColumnSearchProps('forMonth'),
		},
		{
			title: 'Tanggal Pembayaran',
			dataIndex: 'paymentDate',
			key: 'paymentDate',
			sorter: true,
			...getColumnSearchProps('paymentDate'),
		},
		{
			title: 'Harga Kelas',
			dataIndex: 'originalPrice',
			key: 'originalPrice',
			render: (text: number) => formatNumber(text),
		},
		{
			title: 'Diskon (%)',
			dataIndex: 'discount',
			key: 'discount',
			render: (text: number) => formatNumber(text),
		},
		{
			title: 'Jumlah Pembayaran',
			dataIndex: 'amount',
			key: 'amount',
			render: (text: number) => formatNumber(text),
		},
	];

	//

	const [deleteStudentPaymentHistory, { isLoading: isLoadingDelete }] =
		useDeleteStudentPaymentHistoryMutation();

	const onSubmittedDelete = async () => {
		if (!idSPHToDelete) {
			return toast.error('ID Pembayaran tidak ditemukan');
		}

		try {
			console.log('onSubmittedDelete -> idSPHToDelete : ', idSPHToDelete);

			// return;

			const result = await deleteStudentPaymentHistory({
				id: idSPHToDelete,
			}).unwrap();

			console.log('DeleteStudentPaymentHistory -> onFinish -> success : ', result.message);

			dispatch(setModalState({ value: { alertDelete: false } }));
			toast.success(result.message);
		} catch (err) {
			catchFunc(err);
		} finally {
			SetIdSPHToDelete(null);
		}
	};

	return (
		<>
			<Table
				dataSource={studentPaymentsHistory?.data.payments}
				columns={columns}
				loading={isLoading || isFetching}
				error={isError}
				success={isSuccess}
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

			<Dialog open={modalState.modalUpdate} onOpenChange={onOpenChangeUpdate}>
				<DialogContent>
					<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
						<DialogHeader>
							<DialogTitle>Edit Riwayat Pembayaran</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />

						<UpdateStudentPaymentHistory />
					</div>
				</DialogContent>
			</Dialog>

			<ConfirmAlert
				open={modalState.alertDelete}
				onOpenChange={onOpenChangeDelete}
				title="Hapus Riwayat Pembayaran"
				description="Apakah anda yakin ingin menghapus riwayat pembayaran ini?"
				onSubmit={onSubmittedDelete}
			/>
		</>
	);
};

export default TableBrowse;
