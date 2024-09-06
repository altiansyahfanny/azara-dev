import { useAddAttendanceMutation } from '@/api/attendaceApi';
import Table from '@/components/table';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TableProps as TablePropsAntd } from '@/lib/antd';
import { catchFunc } from '@/helpers/app-helper';
import {
	AttendanceStatusType,
	DataSourcesCreateType,
	setDataSourcesCreate,
	setModalState,
} from '@/store/features/attendanceSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { MeetingStudent } from '@/types/meetingId.type';
import { useEffect, useState } from 'react';

const statuses = [
	{
		value: 'present',
		name: 'Hadir',
	},
	{
		value: 'absent',
		name: 'Absen',
	},
	{
		value: 'leave',
		name: 'Izin',
	},
	{
		value: 'unregistered',
		name: 'Tidak Terdaftar',
	},
];

export default function CreateAttendance() {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const { dataSourcesCreate } = useAppSelector((state) => state.attendance);

	const [create, { isLoading }] = useAddAttendanceMutation();

	const [pagination, setPagination] = useState({
		totalPage: Math.ceil((dataSourcesCreate?.length as number) / 2),
		pageSize: 2,
		page: 1,
	});

	const onSubmit = async () => {
		const payload = dataSourcesCreate
			?.filter((student) => student.status !== 'unregistered')
			.map((student) => ({
				classMeetingId: id,
				studentId: student.studentId,
				status: student.status,
			}));

		console.log('CreateAttendance -> onSubmit -> payload : ', payload);

		// return;

		try {
			const result = await create({ attendances: payload }).unwrap();
			dispatch(setModalState({ value: { modalCreate: false } }));
			toast.success(result.message);
		} catch (err) {
			catchFunc(err);
		}
	};

	// Handle status change for a student
	const handleStatusChange = (status: string, studentId: number) => {
		const updatedDataSourcesCreate = dataSourcesCreate?.map((student) => {
			if (student.studentId === studentId) {
				return { ...student, status };
			}
			return student;
		});

		// Dispatch the updated data
		dispatch(setDataSourcesCreate({ value: updatedDataSourcesCreate as DataSourcesCreateType }));
	};

	// Effect to handle pagination changes
	useEffect(() => {
		setPagination((prev) => ({
			...prev,
			totalPage: Math.ceil((dataSourcesCreate?.length || 0) / prev.pageSize),
		}));
	}, [dataSourcesCreate]);

	const columns: TablePropsAntd['columns'] = [
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
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (_text: any, student: MeetingStudent & { status: AttendanceStatusType }) => (
				<RadioGroup
					className="flex items-center gap-x-4"
					onValueChange={(value) => {
						handleStatusChange(value, student.studentId);
					}}
					value={student.status}
				>
					{statuses.map((status, i) => (
						<div key={i} className="flex items-center space-x-2">
							<RadioGroupItem value={status.value} id={status.value} />
							<Label htmlFor="r1">{`${status.name}`}</Label>
						</div>
					))}
				</RadioGroup>
			),
		},
	];

	// Calculate paginated data
	const paginatedData = dataSourcesCreate?.slice(
		(pagination.page - 1) * pagination.pageSize,
		pagination.page * pagination.pageSize
	);

	return (
		<>
			<Table
				dataSource={paginatedData}
				columns={columns}
				pagination={{
					totalPages: pagination.totalPage,
					itemsPerPage: pagination.pageSize,
					currentPage: pagination.page,
					onPageChange: (number) => {
						setPagination((prev) => ({ ...prev, page: number }));
					},
				}}
			/>

			<div className="flex gap-2 items-center justify-end mt-4">
				<Button type="submit" disabled={isLoading} onClick={onSubmit}>
					Simpan
				</Button>
			</div>
		</>
	);
}
