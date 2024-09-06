import { useDeleteAttendanceMutation, useGetAttendacesQuery } from '@/api/attendaceApi';
import ConfirmAlert from '@/components/confirm-alert';
import Table from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { catchFunc } from '@/helpers/app-helper';
import { TableProps as TablePropsAntd } from '@/lib/antd';
import { setModalState } from '@/store/features/attendanceSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { MeetingAttendance } from '@/types/meetingId.type';
import { FilePenLine, PlusCircle, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import CreateAttendance from './create-attendance';
import UpdateAttendace from './update-attendance';

const teacherAttendaceStatusMapper = {
	present: <Badge>Hadir</Badge>,
	absent: <Badge>Absen</Badge>,
	leave: <Badge>Izin</Badge>,
};

const TableAttendance = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const [idAttendanceToDelete, setIdAttendanceToDelete] = useState<number | null>();
	const { modalState } = useAppSelector((state) => state.attendance);

	const {
		data: attendances,
		isLoading,
		isError,
		isSuccess,
		isFetching,
	} = useGetAttendacesQuery({ id: id as string });

	const onClickButtonDelete = (id: number) => {
		console.log('onClickButtonDelete -> meeting : ', id);
		setIdAttendanceToDelete(id);
		dispatch(setModalState({ value: { alartDelete: true } }));
	};

	const columns: TablePropsAntd<MeetingAttendance>['columns'] = [
		{
			title: 'Aksi',
			type: 'action',
			key: 'action',
			textAlign: 'center',
			width: 80,
			render: (meetingAttendance: MeetingAttendance) => {
				return (
					<div className="flex items-center gap-x-2">
						<Table.ButtonAction
							onClick={() => onClickButtonDelete(meetingAttendance.id)}
							Icon={Trash}
						/>
					</div>
				);
			},
		},
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
			type: 'status',
			key: 'status',
			textAlign: 'center',
			dataIndex: 'status',
			width: 80,
			render: (text: 'present' | 'absent') => (
				<div className="flex justify-center">{teacherAttendaceStatusMapper[text]}</div>
			),
		},
	];

	const onClickButtonUpdate = () => {
		dispatch(setModalState({ value: { modalUpdate: true } }));
	};

	const onClickButtonCreate = () => {
		dispatch(setModalState({ value: { modalCreate: true } }));
	};

	const onOpenChange = (value: boolean) => {
		dispatch(setModalState({ value: { modalUpdate: value } }));
	};

	const onOpenChangeCreate = (value: boolean) => {
		dispatch(setModalState({ value: { modalCreate: value } }));
	};

	const onOpenChangeDelete = (value: boolean) => {
		dispatch(setModalState({ value: { alartDelete: value } }));
	};

	const [deleteAttendance] = useDeleteAttendanceMutation();

	const onSubmittedDelete = async () => {
		if (!idAttendanceToDelete) {
			return toast.error('ID Kehadiran tidak ditemukan');
		}

		try {
			console.log('onSubmittedDelete -> idAttendanceToDelete : ', idAttendanceToDelete);

			// return;

			const result = await deleteAttendance({
				id: idAttendanceToDelete,
			}).unwrap();

			dispatch(setModalState({ value: { alartDelete: false } }));
			toast.success(result.message);
		} catch (err) {
			catchFunc(err);
		} finally {
			setIdAttendanceToDelete(null);
		}
	};

	return (
		<>
			<div>
				<Table
					dataSource={attendances?.data}
					columns={columns}
					loading={isLoading || isFetching}
					error={isError}
					success={isSuccess}
					actions={[
						{
							Icon: FilePenLine,
							text: 'Edit',
							onClick: onClickButtonUpdate,
						},
						{
							Icon: PlusCircle,
							text: 'Tambah',
							onClick: onClickButtonCreate,
						},
					]}
				/>
			</div>

			<Dialog open={modalState.modalUpdate} onOpenChange={onOpenChange}>
				<DialogContent className="max-w-4xl">
					<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar">
						<DialogHeader>
							<DialogTitle>Edit Kehadiran</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						<UpdateAttendace />
					</div>
				</DialogContent>
			</Dialog>

			<Dialog open={modalState.modalCreate} onOpenChange={onOpenChangeCreate}>
				<DialogContent className="max-w-4xl">
					<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar">
						<DialogHeader>
							<DialogTitle>Tambah Kehadiran</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						<CreateAttendance />
					</div>
				</DialogContent>
			</Dialog>

			<ConfirmAlert
				open={modalState.alartDelete}
				onOpenChange={onOpenChangeDelete}
				title="Hapus Kehadiran"
				description="Apakah anda yakin ingin menghapus kehadiran ini?"
				onSubmit={onSubmittedDelete}
			/>
		</>
	);
};

export default TableAttendance;
