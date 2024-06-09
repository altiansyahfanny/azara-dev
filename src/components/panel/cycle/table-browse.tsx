import { useGetCyclesQuery } from '@/api/cycleApi';
import SkeletonLoading from '@/components/skeleton-loading';
import Table from '@/components/table';
import { Input } from '@/components/ui/input';
import InputDate from '@/components/ui/input-date';
import { TableColumnType, TableProps as TablePropsAntd } from '@/lib/antd';
import { setFilterState, setModalState, setPaginationState } from '@/store/features/cycleSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Cycle, CycleFilter } from '@/types/cycle.type';
import { format } from 'date-fns';
import { Download, PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';

const TableBrowse = () => {
	const dispatch = useAppDispatch();

	const { paginationState, filterState } = useAppSelector((state) => state.cycle);

	const {
		data: cycles,
		isLoading,
		isSuccess,
	} = useGetCyclesQuery({
		page: paginationState.page,
		limit: paginationState.pageSize,
		...filterState,
	});

	const onOpenChange = (value: boolean) => {
		dispatch(setModalState({ value: { modalCreate: value } }));
	};

	//

	const [filter, setFilter] = useState<CycleFilter>({ description: '' });
	const [searchedColumn, setSearchedColumn] = useState<string>();

	const handleSearch = (dataIndex: keyof CycleFilter) => {
		setSearchedColumn(dataIndex);
		dispatch(setFilterState({ value: filter }));
	};

	const handleReset = (dataIndex: keyof CycleFilter) => {
		const newFilter = { ...filter, [dataIndex]: '' };
		// delete newFilter[dataIndex];
		setFilter(newFilter);
		dispatch(setFilterState({ value: newFilter }));
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
	};

	const getColumnSearchProps = (dataIndex: keyof CycleFilter): TableColumnType<Cycle> => ({
		filterDropdown: ({ confirm }) => {
			const onSearch = () => {
				handleSearch(dataIndex);
				confirm();
			};

			const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
				if (e.key === 'Enter') onSearch();
			};

			let content;
			if (['endDate', 'startDate'].includes(dataIndex)) {
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
			let content;
			if (['endDate', 'startate'].includes(dataIndex)) {
				content = text;
			} else {
				content = text;
			}

			if (searchedColumn === dataIndex) {
				return (
					<Highlighter
						highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
						searchWords={[searchWords as string]}
						autoEscape
						textToHighlight={content ? content.toString() : ''}
					/>
				);
			} else {
				return content;
			}
		},
	});

	const columns: TablePropsAntd<Cycle>['columns'] = [
		{
			title: 'Aksi',
			type: 'action',
			key: 'action',
			textAlign: 'center',
			width: 80,
			render: (cycle: Cycle) => {
				return <Table.ButtonAction onClick={() => console.log('id: ', cycle.id)} Icon={Download} />;
			},
		},
		{
			title: 'Tanggal Mulai',
			dataIndex: 'startDate',
			key: 'startDate',
			...getColumnSearchProps('startDate'),
		},
		{
			title: 'Tanggal Selesai',
			dataIndex: 'endDate',
			key: 'endDate',
			...getColumnSearchProps('endDate'),
		},
		{
			title: 'Keterangan',
			dataIndex: 'description',
			key: 'description',
			...getColumnSearchProps('description'),
		},
	];
	//

	let content;

	if (isLoading) content = <SkeletonLoading />;

	if (isSuccess) {
		content = (
			<Table
				dataSource={cycles.data.cycles}
				columns={columns}
				actions={[{ Icon: PlusCircle, text: 'Tahun Ajaran', onClick: () => onOpenChange(true) }]}
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
		);
	}

	return content;
};

export default TableBrowse;
