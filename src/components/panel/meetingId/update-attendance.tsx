import { useUpdateAttendanceMutation } from "@/api/attendaceApi";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { catchFunc } from "@/helpers/app-helper";
import {
    setDataSourcesUpdate,
    setModalState,
} from "@/store/features/attendanceSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { MeetingAttendance } from "@/types/meetingId.type";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const statuses = [
    {
        value: "present",
        name: "Hadir",
    },
    {
        value: "absent",
        name: "Absen",
    },
    {
        value: "leave",
        name: "Izin",
    },
];

export default function UpdateAttendace() {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const { dataSourcesUpdate } = useAppSelector((state) => state.attendance);

    console.log("dataSourcesUpdate : ", dataSourcesUpdate);

    const [update, { isLoading }] = useUpdateAttendanceMutation();

    // console.log("UpdateAttendace -> dataSourcesUpdate", dataSourcesUpdate);

    const onSubmit = async () => {
        console.log("updateAttendace -> onSubmit : ", dataSourcesUpdate);

        const payload = dataSourcesUpdate?.map((student) => ({
            id: student.id,
            status: student.status,
        }));

        console.log("payload", payload);

        // return;
        try {
            const result = await update({
                id: id as string,
                attendances: payload,
            }).unwrap();
            dispatch(setModalState({ value: { modalUpdate: false } }));
            console.log(
                "UpdateAttendance -> onFinish -> success : ",
                result.message
            );
            toast.success(result.message);
        } catch (err) {
            catchFunc(err);
        }
    };

    const handleStatusChange = (status: string, studentId: number) => {
        console.log("UpdateAttendace -> handleStatusChange -> status", {
            status,
            studentId,
        });

        const newDataSourcesUpdate = dataSourcesUpdate?.map((student) => {
            if (student.studentId === studentId) {
                return {
                    ...student,
                    status,
                };
            }

            return student;
        });

        dispatch(
            setDataSourcesUpdate({
                value: newDataSourcesUpdate as MeetingAttendance[],
            })
        );
    };

    return (
        <>
            <Table className="overflow-x-scroll border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="whitespace-nowrap border">
                            Nama Depan Siswa
                        </TableHead>
                        <TableHead className="whitespace-nowrap border">
                            Nama Belakang Siswa
                        </TableHead>
                        <TableHead className="w-[100px] text-center border">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataSourcesUpdate?.map((student, i) => (
                        <TableRow key={i} className="border">
                            <TableCell>{student.firstName}</TableCell>
                            <TableCell>{student.lastName}</TableCell>
                            <TableCell className="font-medium whitespace-nowrap border">
                                <RadioGroup
                                    className="flex items-center gap-x-4"
                                    onValueChange={(value) => {
                                        handleStatusChange(
                                            value,
                                            student.studentId
                                        );
                                    }}
                                    defaultValue={student.status}
                                >
                                    {statuses.map((status, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center space-x-2"
                                        >
                                            <RadioGroupItem
                                                value={status.value}
                                                id={status.value}
                                            />
                                            <Label htmlFor="r1">
                                                {status.name}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex gap-2 items-center justify-end mt-4">
                <Button type="submit" disabled={isLoading} onClick={onSubmit}>
                    Simpan
                </Button>
            </div>
        </>
    );
}
