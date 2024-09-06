import { useGetMeetingQuery } from '@/api/meetingApi';
import Container from '@/components/core/container';
import PageError from '@/components/page-error';
import TableAttendance from '@/components/panel/meetingId/table-attendance';
import TableStudent from '@/components/panel/meetingId/Table-student';
import SkeletonLoading from '@/components/skeleton-loading';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/helpers/app-helper';
import useTitle from '@/hooks/useTitle';
import { format, parse } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';

const MeetingItem = ({ label, value }: { label: string; value: any }) => {
	return (
		<div className="grid grid-cols-12 w-full text-lg gap-4">
			<div className="col-span-3">{label}</div>
			<div className="col-span-1 text-right">:</div>
			<div className="col-span-8">{value}</div>
		</div>
	);
};

const teacherAttendanceMapper = {
	present: 'Hadir',
	represented: 'Diwakilkan',
	absent: 'Izin',
};

const MeetingId = () => {
	useTitle('Pertemuan');

	const { id } = useParams();
	const navigate = useNavigate();

	const {
		data: meeting,
		isLoading,
		isError,
		isSuccess,
		isFetching,
	} = useGetMeetingQuery(id as string);

	let content: any;

	if (isError) return <PageError />;

	if (isLoading) content = <SkeletonLoading />;

	if (isSuccess) {
		const handBookContent = meeting.data.handBook ? (
			<a href={meeting.data.handBook} target="_blank" className="text-blue-500 underline">
				{meeting.data.handBook}
			</a>
		) : (
			'-'
		);
		content = (
			<div className="w-full">
				<div>
					<MeetingItem label="Nomor Pertemuan" value={meeting.data.meetingNumber.toString()} />
					<MeetingItem
						label="Tanggal Pertemuan"
						value={format(meeting.data.meetingDate, 'yyyy-MM-dd')}
					/>
					<MeetingItem
						label="Jam Mulai"
						value={format(parse(meeting.data.startTime, 'HH:mm:ss', new Date()), 'HH:mm')}
					/>
					<MeetingItem
						label="Jam Selesai"
						value={format(parse(meeting.data.endTime, 'HH:mm:ss', new Date()), 'HH:mm')}
					/>
					<MeetingItem
						label="Kehadiran Guru"
						value={teacherAttendanceMapper[meeting.data.teacherAttendance]}
					/>
					<MeetingItem label="Perwakilan Guru" value={meeting.data.representedBy} />
					<MeetingItem label="Verifikasi" value={meeting.data.isVerified ? 'Sudah' : 'Belum'} />
					<MeetingItem label="Buku Panduan" value={handBookContent} />
					<MeetingItem label="Catatan" value={meeting.data.notes} />
				</div>

				<div className="mt-4">
					<p className="font-semibold text-xl">Guru</p>
					<div className="mt-2">
						<MeetingItem label="Nama Depan" value={meeting.data.teacher.firstName} />
						<MeetingItem label="Nama Belakang" value={meeting.data.teacher.lastName} />
					</div>
				</div>

				<div className="mt-4">
					<p className="font-semibold text-xl">Mata Pelajaran</p>
					<div className="mt-2">
						<MeetingItem label="Nama Mata Pelajaran" value={meeting.data.course.courseName} />
						<MeetingItem label="Keterangan" value={meeting.data.course.description} />
					</div>
				</div>

				<div className="mt-4">
					<p className="font-semibold text-xl">Kelas</p>
					<div className="mt-2">
						<MeetingItem label="Nama Kelas" value={meeting.data.classroom.classroomName} />
						<MeetingItem label="Harga" value={formatNumber(meeting.data.classroom.price)} />
					</div>
				</div>

				<div className="mt-4">
					<p className="font-semibold text-xl">Tahun Ajaran</p>
					<div className="mt-2">
						<MeetingItem label="Tanggal Mulai" value={meeting.data.cycle.startDate} />
						<MeetingItem label="Tanggal Selesai" value={meeting.data.cycle.endDate} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<Container title="Detil Pertemuan">
			<div className="grid gap-4  border rounded-lg p-4 ">
				{content}
				<TableStudent isLoading={isLoading || isFetching} isSuccess={isSuccess} meeting={meeting} />

				<TableAttendance />

				<div className="flex justify-end">
					<Button type="button" onClick={() => navigate(-1)}>
						Kembali
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default MeetingId;
