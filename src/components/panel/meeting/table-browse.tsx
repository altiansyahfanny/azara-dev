import { useGetMeetingsQuery } from '@/api/meetingApi';
import Table from '@/components/table';
import { Input } from '@/components/ui/input';
import InputDate from '@/components/ui/input-date';
import { TableColumnType, TableProps as TablePropsAntd } from '@/lib/antd';
import { setFilterState, setModalState, setPaginationState } from '@/store/features/meetingSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Meeting, MeetingFilter } from '@/types/meeting.type';
import { format } from 'date-fns';
import { FilePenLine, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';

const TableBrowse = () => {
	const dispatch = useAppDispatch();

	const { paginationState, filterState } = useAppSelector((state) => state.meeting);

	const {
		data: meetings,
		isLoading,
		isSuccess,
		isError,
		refetch,
	} = useGetMeetingsQuery({
		page: paginationState.page,
		limit: paginationState.pageSize,
		...filterState,
	});

	const onOpenChange = (value: boolean) => {
		dispatch(setModalState({ value: { modalCreate: value } }));
	};

	// const onOpenChangeUpdate = (value: boolean) => {
	// 	dispatch(setModalState({ value: { modalUpdate: value } }));
	// };

	//

	const [filter, setFilter] = useState<MeetingFilter>({ classroomName: '', isVerified: false });
	const [searchedColumn, setSearchedColumn] = useState<string>();

	useEffect(() => {
		dispatch(setFilterState({ value: filter }));
		refetch();
	}, []);

	const handleSearch = (dataIndex: keyof MeetingFilter) => {
		setSearchedColumn(dataIndex);
		dispatch(setFilterState({ value: filter }));
	};

	const handleReset = (dataIndex: keyof MeetingFilter) => {
		const newFilter = { ...filter, [dataIndex]: '' };
		// delete newFilter[dataIndex];
		setFilter(newFilter);
		dispatch(setFilterState({ value: newFilter }));
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
	};

	const getColumnSearchProps = (dataIndex: keyof MeetingFilter): TableColumnType<Meeting> => ({
		filterDropdown: ({ confirm }) => {
			const onSearch = () => {
				handleSearch(dataIndex);
				confirm();
			};

			const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
				if (e.key === 'Enter') onSearch();
			};

			let content;
			if (['meetingDate'].includes(dataIndex)) {
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
				if (['meetingDate'].includes(dataIndex)) {
					return 'Hallo'
				}
				return text;
			}
		},
	});

	const onClickButtonUpdate = (meeting: Meeting) => {
		console.log('meeting : ', meeting);
		// // return;
		// dispatch(setDataState({ value: meeting }));
		// dispatch(setModalState({ value: { modalUpdate: true } }));
	};

	const columns: TablePropsAntd<Meeting>['columns'] = [
		{
			title: 'Aksi',
			type: 'action',
			key: 'action',
			textAlign: 'center',
			width: 80,
			render: (meeting: Meeting) => {
				return (
					<div className="flex items-center gap-x-2">
						<Table.ButtonAction onClick={() => onClickButtonUpdate(meeting)} Icon={FilePenLine} />
					</div>
				);
			},
		},
		{
			title: 'Jam Mulai',
			dataIndex: 'startTime',
			key: 'startTime',
			// ...getColumnSearchProps('courseName'),
		},
		{
			title: 'Jam Selesai',
			dataIndex: 'endTime',
			key: 'endTime',
			// ...getColumnSearchProps('courseName'),
		},
		{
			title: 'Tanggal Pertemuan',
			dataIndex: 'meetingDate',
			key: 'meetingDate',
			// ...getColumnSearchProps('meetingDate'),
			render: (text:string) => {
				return <p>{format(text, 'yyyy-LL-dd')}</p>
			}
		},
		{
			title: 'Nomor Pertemuan',
			dataIndex: 'meetingNumber',
			key: 'meetingNumber',
			// ...getColumnSearchProps('courseName'),
		},
		// {} teacher attendance
		// {} representes by
		// {} isVerified
		// {} evidenceImageUrl
		{
			title: 'Mata Pelajaran',
			dataIndex: 'courseName',
			key: 'courseName',
			// ...getColumnSearchProps('courseName'),
		},
		{
			title: 'Nama Depan Guru',
			dataIndex: 'firstName',
			key: 'firstName',
			// ...getColumnSearchProps('courseName'),
		},
		{
			title: 'Nama Belakang Guru',
			dataIndex: 'lastName',
			key: 'lastName',
			// ...getColumnSearchProps('courseName'),
		},
		{
			title: 'Kelas',
			dataIndex: 'classroomName',
			key: 'classroomName',
			...getColumnSearchProps('classroomName'),
		},
		
		
		
	];
	//

	return (
		<>
			<Table
				dataSource={meetings?.data.meetings}
				columns={columns}
				loading={isLoading}
				error={isError}
				success={isSuccess}
				actions={[{ Icon: PlusCircle, text: 'Pertemuan', onClick: () => onOpenChange(true) }]}
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

			{/* <Dialog open={modalState.modalUpdate} onOpenChange={onOpenChangeUpdate}>
				<DialogContent>
					<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
						<DialogHeader>
							<DialogTitle>Edit Tahun Ajaran</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						<UpdateMeeting />
					</div>
				</DialogContent>
			</Dialog> */}
		</>
	);
};

export default TableBrowse;
