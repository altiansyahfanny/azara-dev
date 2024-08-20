import { useAddAttendanceMutation } from "@/api/attendaceApi";
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
    DataSourcesCreateType,
    setDataSourcesCreate,
    setModalState,
} from "@/store/features/attendanceSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
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
    {
        value: "unregistered",
        name: "Tidak Terdaftar",
    },
];

export default function CreateAttendance() {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const { dataSourcesCreate } = useAppSelector((state) => state.attendance);

    const [create, { isLoading }] = useAddAttendanceMutation();

    // console.log("CreateAttendance -> dataSourcesCreate", dataSourcesCreate);

    const onSubmit = async () => {
        // console.log("createAttendance -> onSubmit : ", dataSourcesCreate);

        const payload = dataSourcesCreate
            ?.filter((student) => student.status !== "unregistered")
            .map((student) => ({
                classMeetingId: id,
                studentId: student.studentId,
                status: student.status,
            }));

        console.log("payload", payload);

        // return;

        try {
            const result = await create({ attendances: payload }).unwrap();
            dispatch(setModalState({ value: { modalCreate: false } }));
            console.log(
                "CreateAttebdance -> onFinish -> success : ",
                result.message
            );
            toast.success(result.message);
        } catch (err) {
            catchFunc(err);
        }
    };

    const handleStatusChange = (status: string, studentId: number) => {
        console.log("CreateAttendance -> handleStatusChange -> status", {
            status,
            studentId,
        });

        const newDataSourcesCreate = dataSourcesCreate?.map((student) => {
            if (student.studentId === studentId) {
                return {
                    ...student,
                    status,
                };
            }

            return student;
        });

        dispatch(
            setDataSourcesCreate({
                value: newDataSourcesCreate as DataSourcesCreateType,
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
                    {dataSourcesCreate?.map((student, i) => (
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
