import { useGetAttendacesQuery } from "@/api/attendaceApi";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import { TableProps as TablePropsAntd } from "@/lib/antd";
import {
    setDataSources,
    setModalState,
} from "@/store/features/attendanceSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { MeetingAttendance } from "@/types/meetingId.type";
import { FilePenLine } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const statusMapper = {
    present: <Badge>Hadir</Badge>,
    absent: <Badge>Izin</Badge>,
};

const TableAttendance = () => {
    const dispatch = useAppDispatch();
    const { modalState, dataSources } = useAppSelector(
        (state) => state.attendance
    );

    console.log("dataSources : ", dataSources);

    const {
        data: attendances,
        isLoading,
        isError,
        isSuccess,
    } = useGetAttendacesQuery({ id: 1 });

    console.log("attendances : ", attendances);
    const onChangeCheckbox = (
        value: boolean,
        row: MeetingAttendance,
        key: any
    ) => {
        console.log({
            value,
            row,
            key,
        });

        const newDataSources = dataSources?.map((item) => {
            if (item.id === row.id) {
                return {
                    ...item,
                    status: value ? "present" : "absent",
                };
            }

            return item;
        });

        dispatch(
            setDataSources({ value: newDataSources as MeetingAttendance[] })
        );
    };

    const columns: TablePropsAntd<MeetingAttendance>["columns"] = [
        {
            title: "Edit Status",
            type: "action",
            key: "editStatus",
            width: 80,
            render: (row: MeetingAttendance, key: any) => {
                return (
                    <div className="flex justify-center w-full mr-4">
                        <Checkbox
                            checked={row.status === "present"}
                            onCheckedChange={(value) => {
                                console.log("value : ", value);
                                onChangeCheckbox(value as boolean, row, key);
                            }}
                        />
                    </div>
                );
            },
        },
        {
            title: "Nama Depan",
            dataIndex: "firstName",
            key: "firstName",
            render: (text: any) => text,
        },
        {
            title: "Nama Belakang",
            dataIndex: "lastName",
            key: "lastName",
            render: (text: any) => text,
        },
        {
            title: "Status",
            type: "status",
            key: "status",
            textAlign: "center",
            dataIndex: "status",
            width: 80,
            render: (text: "present" | "absent") => (
                <div className="flex justify-center">{statusMapper[text]}</div>
            ),
        },
    ];

    const onClickButtonUpdate = () => {
        console.log("Update");
        dispatch(setModalState({ value: { modalUpdate: true } }));
    };

    const onOpenChange = (value: boolean) => {
        dispatch(setModalState({ value: { modalUpdate: value } }));
    };

    return (
        <>
            <div>
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-xl mb-2">Kehadiran</p>
                    <Button
                        size="sm"
                        className="h-7 gap-1"
                        onClick={onClickButtonUpdate}
                    >
                        <FilePenLine className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Kehadiran
                        </span>
                    </Button>
                </div>
                <Table
                    dataSource={dataSources}
                    columns={columns}
                    loading={isLoading}
                    error={isError}
                    success={isSuccess}
                />
            </div>

            <Dialog open={modalState.modalUpdate} onOpenChange={onOpenChange}>
                <DialogContent>
                    <div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
                        <DialogHeader>
                            <DialogTitle>Edit Kehadiran</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        {/* <UpdateEnrollStudent /> */}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TableAttendance;
