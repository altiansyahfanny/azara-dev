import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { id } from "date-fns/locale"; // Import locale Indonesia
import { useGetUserMeetingsQuery } from "@/api/meetingApi";
import { parseISO, setHours, setMinutes, setSeconds } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setModalState } from "@/store/features/userSlice";
import { useState } from "react";
import { Meeting } from "@/types/meeting.type";
import { teacherAttendaceStatusMapper } from "@/helpers/app-helper";

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

const Schedule: React.FC = () => {
    const { data } = useGetUserMeetingsQuery({
        page: 1,
        limit: 100,
    });

    function combineDateAndTime(dateStr: string, timeStr: string) {
        const date = parseISO(dateStr);
        const [hours, minutes, seconds] = timeStr.split(":").map(Number);

        const combinedDateTime = setSeconds(
            setMinutes(setHours(date, hours), minutes),
            seconds
        );

        return combinedDateTime;
    }

    const dispatch = useAppDispatch();
    const { modalState } = useAppSelector((state) => state.user);

    const onOpenChangeModalDetailEvent = (value: boolean) => {
        dispatch(setModalState({ value: { modalDetailEvent: value } }));
    };

    const [selectedMeeting, setSelectedMeeting] =
        useState<SelectedMeetingType | null>(null);

    return (
        <>
            <Calendar
                localizer={localizer}
                events={data?.data.meetings.map((meeting) => ({
                    // id: meeting.id,
                    title: meeting.subjectMatter,
                    start: combineDateAndTime(
                        meeting.meetingDate,
                        meeting.startTime
                    ),
                    end: combineDateAndTime(
                        meeting.meetingDate,
                        meeting.endTime
                    ),
                    ...meeting,
                }))}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                culture="id" // Setel culture ke Indonesia
                onDoubleClickEvent={(event) => {
                    console.log(event);
                    setSelectedMeeting(event);
                    dispatch(
                        setModalState({ value: { modalDetailEvent: true } })
                    );
                }}
            />

            <Dialog
                open={modalState.modalDetailEvent}
                onOpenChange={onOpenChangeModalDetailEvent}
            >
                <DialogContent>
                    <div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
                        <DialogHeader>
                            <DialogTitle>Detil Pertemuan</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        <div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-5">Subjek</div>
                                <div className="col-span-1">:</div>
                                <div className="col-span-6">
                                    {selectedMeeting?.subjectMatter}
                                </div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-5">
                                    Tanggal Pertemuan
                                </div>
                                <div className="col-span-1">:</div>
                                <div className="col-span-6">
                                    {selectedMeeting?.meetingDate
                                        ? format(
                                              parseISO(
                                                  selectedMeeting.meetingDate
                                              ),
                                              "dd-MM-yyyy"
                                          )
                                        : "-"}
                                </div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-5">Jam Pertemuan</div>
                                <div className="col-span-1">:</div>
                                <div className="col-span-6">{`${selectedMeeting?.startTime} - ${selectedMeeting?.endTime}`}</div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-5">Nama Guru</div>
                                <div className="col-span-1">:</div>
                                <div className="col-span-6">{`${selectedMeeting?.firstName} ${selectedMeeting?.lastName}`}</div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-5">Mata Pelajaran</div>
                                <div className="col-span-1">:</div>
                                <div className="col-span-6">{`${selectedMeeting?.courseName}`}</div>
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-5">Kehadiran Guru</div>
                                <div className="col-span-1">:</div>
                                <div className="col-span-6">{`${
                                    selectedMeeting?.teacherAttendance
                                        ? teacherAttendaceStatusMapper[
                                              selectedMeeting.teacherAttendance
                                          ]
                                        : "-"
                                }`}</div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Schedule;
