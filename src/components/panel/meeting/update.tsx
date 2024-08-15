import { useUpdateMeetingMutation } from "@/api/meetingApi";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updateMeetingSchema } from "@/schema/meeting";
import { setModalState } from "@/store/features/meetingSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ApiResponse, ErrorResponse } from "@/types/api.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import FormLib from "@/components/form-lib";
import { ReactNode } from "react";
import { useFetchClassroomCoursesQuery } from "@/api/classroomApi";
import { LoaderCircle } from "lucide-react";
import { SelectItem } from "@/components/ui/select";
const teacherAttendanceList = ["present", "represented", "absent"];

export default function UpdateMeeting() {
    const dispatch = useAppDispatch();

    const { dataState } = useAppSelector((state) => state.meeting);

    const [update, { isLoading }] = useUpdateMeetingMutation();

    const form = useForm<z.infer<typeof updateMeetingSchema>>({
        resolver: zodResolver(updateMeetingSchema),
        mode: "onChange",
        defaultValues: {
            classroomCourseId: dataState?.classroomCourseId?.toString(),
            startTime: dataState?.startTime,
            endTime: dataState?.endTime,
            meetingDate: new Date(dataState?.meetingDate as string),
            teacherAttendance: dataState?.teacherAttendance,
            representedBy: dataState?.representedBy,
            subjectMatter: dataState?.subjectMatter,
            handBook: dataState?.handBook,
        },
    });

    const onSubmit = async (payload: z.infer<typeof updateMeetingSchema>) => {
        try {
            console.log("CreateMeeting -> dataState : ", dataState);
            console.log("CreateMeeting -> payload : ", payload);

            const newPayload = {
                ...payload,
                id: dataState.id as number,
            };

            console.log("UpdateMeeting -> newPayload : ", newPayload);

            return;

            const result = await update(newPayload).unwrap();

            console.log(
                "UpdateMeeting -> onFinish -> success : ",
                result.message
            );

            dispatch(setModalState({ value: { modalUpdate: false } }));
            toast.success(result.message);
        } catch (err) {
            const error = err as ApiResponse<ErrorResponse>;
            console.log(
                "UpdateMeeting -> onFinish -> error : ",
                error.data.message
            );
            toast.error(error.data.message);
        }
    };

    const {
        data: classroomCourses,
        isLoading: isLoadingClassroomCourses,
        isSuccess: isSuccessClassroomCourses,
        isError: isErrorClassroomCourses,
    } = useFetchClassroomCoursesQuery();

    let classroomCoursesContent: ReactNode;

    if (isLoadingClassroomCourses) {
        classroomCoursesContent = (
            <div className="bg-red-500x min-h-20 grid place-content-center">
                <LoaderCircle className="animate-spin" />
            </div>
        );
    }

    if (isErrorClassroomCourses) {
        classroomCoursesContent = (
            <div className="bg-red-500x min-h-20 grid place-content-center">
                <p className="text-sm">Tidak dapat memuat pelajaran kelas.</p>
            </div>
        );
    }

    if (isSuccessClassroomCourses) {
        if (classroomCourses.data.classroomCourses.length === 0) {
            classroomCoursesContent = (
                <div className="bg-red-500x min-h-20 grid place-content-center">
                    <p className="text-sm">Tidak ada pelajaran kelas.</p>
                </div>
            );
        } else {
            classroomCoursesContent =
                classroomCourses?.data.classroomCourses.map((cc, key) => (
                    <SelectItem key={key} value={cc.id.toString()}>
                        {`${cc.classroomName} - ${cc.courseName}`}
                    </SelectItem>
                ));
        }
    }

    const teacherAttendanceOptions = teacherAttendanceList.map(
        (value, index) => (
            <SelectItem key={index} value={value}>
                {value}
            </SelectItem>
        )
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormLib
                    form={form}
                    name="classroomCourseId"
                    label="Pelajaran Kelas"
                    type="select"
                    options={classroomCoursesContent}
                />
                <FormLib
                    form={form}
                    name="startTime"
                    label="Waktu Mulai"
                    type="time"
                />
                <FormLib
                    form={form}
                    name="endTime"
                    label="Waktu Selesai"
                    type="time"
                />
                <FormLib
                    form={form}
                    name="meetingDate"
                    label="Tanggal Pertemuan"
                    type="date"
                />
                <FormLib form={form} name="subjectMatter" label="Subjek" />
                {/* <FormLib
                    form={form}
                    name="meetingNumber"
                    label="Nomor Pertemuan"
                /> */}
                <FormLib
                    form={form}
                    name="teacherAttendance"
                    label="Kehadiran Guru"
                    type="select"
                    options={teacherAttendanceOptions}
                />
                <FormLib
                    form={form}
                    name="representedBy"
                    label="Perwakilan"
                    disabled={form.getValues("teacherAttendance") === "present"}
                />

                <FormLib form={form} name="handBook" label="handBook" />

                <div className="flex gap-2 items-center justify-end">
                    <Button type="submit" disabled={isLoading}>
                        Simpan
                    </Button>
                </div>
            </form>
        </Form>
    );
}
