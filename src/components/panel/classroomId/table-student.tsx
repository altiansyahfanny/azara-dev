import Table from "@/components/table";
import React from "react";
import { TableProps as TablePropsAntd } from "@/lib/antd";
import { ApiResponse } from "@/types/api.type";
import { ClassroomId, ClassroomStudent } from "@/types/classroom.type";
import SkeletonLoading from "@/components/skeleton-loading";
import { Button } from "@/components/ui/button";
import { FilePenLine, PlusCircle } from "lucide-react";
import {
    setDataStateUpdateEnrollStudent,
    setEnrollStudent,
    setModalState,
} from "@/store/features/classroomIdSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import UpdateEnrollStudent from "./update-enroll-student";
import { format } from "date-fns";

interface TableStudentProps {
    classroom: ApiResponse<ClassroomId> | undefined;
    isLoading: boolean;
    isSuccess: boolean;
}

const TableStudent: React.FC<TableStudentProps> = ({
    classroom,
    isLoading,
    isSuccess,
}) => {
    const dispatch = useAppDispatch();
    const { modalState } = useAppSelector((state) => state.classroomId);

    const onOpenChangeUpdate = (value: boolean) => {
        dispatch(setModalState({ value: { modalUpdateEnrollStudent: value } }));
    };

    const onClickButtonUpdate = (student: ClassroomStudent) => {
        console.log("student : ", student);
        // // return;
        dispatch(
            setDataStateUpdateEnrollStudent({
                value: {
                    ...student,
                    joinDate: student.joinDate,
                    studentId: student.studentId,
                },
            })
        );
        dispatch(setModalState({ value: { modalUpdateEnrollStudent: true } }));
    };

    let content;

    if (isLoading) {
        content = <SkeletonLoading />;
    }

    if (isSuccess) {
        content = (
            <div className="flex">
                <h2 className="text-xl font-semibold leading-none tracking-tight">
                    Siswa
                </h2>
                <div className="ml-auto flex items-center gap-2">
                    <Button
                        size="sm"
                        className="h-7 gap-1"
                        onClick={() => {
                            dispatch(
                                setModalState({
                                    value: { modalEnrollStudent: true },
                                })
                            );
                            dispatch(
                                setEnrollStudent({
                                    value: { classroom: classroom?.data },
                                })
                            );
                        }}
                    >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Siswa
                        </span>
                    </Button>
                </div>
            </div>
        );
    }

    const columns: TablePropsAntd<ClassroomStudent>["columns"] = [
        {
            title: "Aksi",
            type: "action",
            key: "action",
            textAlign: "center",
            width: 80,
            render: (student: ClassroomStudent) => {
                return (
                    <div className="flex items-center gap-x-2">
                        <Table.ButtonAction
                            onClick={() => onClickButtonUpdate(student)}
                            Icon={FilePenLine}
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
            title: "Tanggal Bergabung",
            dataIndex: "joinDate",
            key: "joinDate",
            render: (text: any) => {
                return <p>{format(text, "yyyy-LL-dd")}</p>;
            },
        },
    ];

    return (
        <>
            <div className="border rounded-lg p-4 grid gap-4">
                {content}
                <Table
                    dataSource={classroom?.data.students}
                    columns={columns}
                    loading={isLoading}
                />
            </div>
            <Dialog
                open={modalState.modalUpdateEnrollStudent}
                onOpenChange={onOpenChangeUpdate}
            >
                <DialogContent>
                    <div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
                        <DialogHeader>
                            <DialogTitle>Edit</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        <UpdateEnrollStudent />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TableStudent;
