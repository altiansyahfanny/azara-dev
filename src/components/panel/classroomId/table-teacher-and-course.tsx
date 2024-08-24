import { ClassroomCourse, ClassroomId } from "@/types/classroom.type";
import Table from "@/components/table";
import React from "react";
import { TableProps as TablePropsAntd } from "@/lib/antd";
import { formatNumber } from "@/helpers/app-helper";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
    setAssignCourse,
    setDataStateAssignTeacherCourse,
    setModalState,
} from "@/store/features/classroomIdSlice";
import { FilePenLine, PlusCircle } from "lucide-react";
import SkeletonLoading from "@/components/skeleton-loading";
import { ApiResponse } from "@/types/api.type";
import useAuth from "@/hooks/useAuth";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import UpdateAssignTeacherCourse from "./update-assign-teacher-course";
import { useAppSelector } from "@/store/store";

interface TableTeacherAndCourseProps {
    classroom: ApiResponse<ClassroomId> | undefined;
    isLoading: boolean;
    isSuccess: boolean;
}

const TableTeacherAndCourse: React.FC<TableTeacherAndCourseProps> = ({
    classroom,
    isLoading,
    isSuccess,
}) => {
    const auth = useAuth();
    const dispatch = useDispatch();

    const { modalState } = useAppSelector((state) => state.classroomId);

    const onOpenChangeUpdate = (value: boolean) => {
        dispatch(
            setModalState({ value: { modalUpdateAssignTeacherCourse: value } })
        );
    };

    const onClickButtonUpdate = (classroomCourse: ClassroomCourse) => {
        console.log("classroomCourse : ", classroomCourse);
        // // return;
        dispatch(
            setDataStateAssignTeacherCourse({
                value: {
                    ...classroomCourse,
                },
            })
        );
        dispatch(
            setModalState({ value: { modalUpdateAssignTeacherCourse: true } })
        );
    };

    const columns: TablePropsAntd<ClassroomCourse>["columns"] = [
        {
            title: "Aksi",
            type: "action",
            key: "action",
            textAlign: "center",
            width: 80,
            render: (classroomCourse: ClassroomCourse) => {
                return (
                    <div className="flex items-center gap-x-2">
                        <Table.ButtonAction
                            onClick={() => onClickButtonUpdate(classroomCourse)}
                            Icon={FilePenLine}
                        />
                    </div>
                );
            },
        },
        {
            title: "Mata Pelajaran",
            dataIndex: "courseName",
            key: "courseName",
        },
        {
            title: "Keterangan",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Nama Guru",
            type: "action",
            textAlign: "left",
            dataIndex: "teacher.firstName",
            key: "teacher",
            render: (course: ClassroomCourse) =>
                `${course.teacher.firstName} ${course.teacher.lastName}`,
        },
    ];

    let content;

    if (isLoading) {
        content = <SkeletonLoading />;
    }

    if (isSuccess) {
        content = (
            <div className="flex mb-4">
                <h2 className="text-xl font-semibold leading-none tracking-tight">
                    Mata Pelajaran
                </h2>
                <div className="ml-auto flex items-center gap-2">
                    <Button
                        size="sm"
                        className="h-7 gap-1"
                        onClick={() => {
                            dispatch(
                                setModalState({
                                    value: { modalAssignCourse: true },
                                })
                            );
                            dispatch(
                                setAssignCourse({
                                    value: { classroom: classroom?.data },
                                })
                            );
                        }}
                    >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Mata Pelajaran
                        </span>
                    </Button>
                </div>
            </div>
        );
    }

    const columnsWithPrice: TablePropsAntd<ClassroomCourse>["columns"] = [
        ...columns,
        {
            title: "Harga",
            type: "action",
            textAlign: "left",
            dataIndex: "paymentPrice",
            key: "paymentPrice",
            render: (course: ClassroomCourse) =>
                formatNumber(course.paymentPrice),
        },
    ];
    return (
        <div className="border rounded-lg p-4 grid gap-4">
            {content}
            <Table
                dataSource={classroom?.data.courses}
                columns={auth.role === "admin" ? columnsWithPrice : columns}
                loading={isLoading}
            />
            <Dialog
                open={modalState.modalUpdateAssignTeacherCourse}
                onOpenChange={onOpenChangeUpdate}
            >
                <DialogContent>
                    <div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
                        <DialogHeader>
                            <DialogTitle>Edit Harga</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        <UpdateAssignTeacherCourse />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TableTeacherAndCourse;
