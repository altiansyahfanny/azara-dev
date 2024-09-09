import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { id } from 'date-fns/locale'; // Import locale Indonesia
import { useGetUserMeetingsQuery } from '@/api/meetingApi';
import { parseISO, setHours, setMinutes, setSeconds } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setModalState } from '@/store/features/userSlice';
import { useState } from 'react';
import { Meeting } from '@/types/meeting.type';
import { formatTime, teacherAttendaceStatusMapper } from '@/helpers/app-helper';

const locales = { id: id };

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
	getDay,
	locales,
});

type SelectedMeetingType = Meeting & {
	title: string;
	start: Date;
	end: Date;
};

const TextItem = ({ title, value }: { title: string; value: string | number }) => (
	<div className="grid grid-cols-12">
		<div className="col-span-5">{title}</div>
		<div className="col-span-1">:</div>
		<div className="col-span-6">{value}</div>
	</div>
);

const Schedule: React.FC = () => {
	const { data } = useGetUserMeetingsQuery({
		page: 1,
		limit: 100,
	});
	console.log('data : ', data);

	function combineDateAndTime(dateStr: string, timeStr: string) {
		const date = parseISO(dateStr);
		const [hours, minutes, seconds] = timeStr.split(':').map(Number);

		const combinedDateTime = setSeconds(setMinutes(setHours(date, hours), minutes), seconds);

		return combinedDateTime;
	}

	const dispatch = useAppDispatch();
	const { modalState } = useAppSelector((state) => state.user);

	const onOpenChangeModalDetailEvent = (value: boolean) => {
		dispatch(setModalState({ value: { modalDetailEvent: value } }));
	};

	const [selectedMeeting, setSelectedMeeting] = useState<SelectedMeetingType | null>(null);

	const colors = [
		'#FF5733', // Bright Red-Orange
		'#33B679', // Fresh Green
		'#2980B9', // Vivid Blue
		'#F1C40F', // Bright Yellow
		'#8E44AD', // Deep Purple
		'#E74C3C', // Strong Red
		'#1ABC9C', // Aqua Green
		'#D35400', // Pumpkin Orange
		'#34495E', // Navy Blue
		'#2ECC71', // Emerald Green
	];

	const eventStyleGetter = (event: { title: string; start: Date; end: Date } & Meeting) => {
		// Find the index of the event
		const eventIndex = data?.data.meetings.findIndex((e) => e.id === event.id) ?? 0;

		// Determine the color using the modulus operator
		const backgroundColor = colors[eventIndex % colors.length];

		return {
			style: {
				backgroundColor,
				color: '#fff', // Optional: Text color
			},
		};
	};

	return (
		<>
			<Calendar
				localizer={localizer}
				events={data?.data.meetings.map((meeting) => ({
					// key: meeting.id,
					title: meeting.subjectMatter,
					start: combineDateAndTime(meeting.meetingDate, meeting.startTime),
					end: combineDateAndTime(meeting.meetingDate, meeting.endTime),
					...meeting,
				}))}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500 }}
				culture="id" // Setel culture ke Indonesia
				onDoubleClickEvent={(event) => {
					console.log(event);
					setSelectedMeeting(event);
					dispatch(setModalState({ value: { modalDetailEvent: true } }));
				}}
				eventPropGetter={eventStyleGetter}
			/>

			<Dialog open={modalState.modalDetailEvent} onOpenChange={onOpenChangeModalDetailEvent}>
				<DialogContent className="max-w-xs lg:min-w-max">
					<div className=" max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
						<DialogHeader>
							<DialogTitle>Detil Pertemuan</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						<div>
							<TextItem title="Subjek" value={selectedMeeting?.subjectMatter ?? '-'} />
							<TextItem title="Nomor Pertemuan" value={selectedMeeting?.meetingNumber ?? '-'} />
							<TextItem title="Kelas" value={selectedMeeting?.classroomName ?? '-'} />
							<TextItem
								title="Tanggal Pertemuan"
								value={
									selectedMeeting?.meetingDate
										? format(parseISO(selectedMeeting.meetingDate), 'dd-MM-yyyy')
										: '-'
								}
							/>
							<TextItem
								title="Jam Pertemuan"
								value={
									selectedMeeting?.startTime && selectedMeeting?.endTime
										? `${formatTime(selectedMeeting.startTime)} - ${formatTime(
												selectedMeeting.endTime
										  )}`
										: '-'
								}
							/>
							<TextItem
								title="Nama Guru"
								value={
									selectedMeeting?.firstName && selectedMeeting?.lastName
										? `${selectedMeeting.firstName} ${selectedMeeting.lastName}`
										: '-'
								}
							/>
							<TextItem title="Mata Pelajaran" value={selectedMeeting?.courseName ?? '-'} />
							<TextItem
								title="Kehadiran Guru"
								value={`${
									selectedMeeting?.teacherAttendance
										? teacherAttendaceStatusMapper[selectedMeeting.teacherAttendance]
										: '-'
								}`}
							/>
							<TextItem title="Diwakilkan Oleh" value={selectedMeeting?.representedBy ?? '-'} />
							<TextItem title="Link Buku Panduan" value={`${selectedMeeting?.handBook ?? '-'}`} />
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default Schedule;
