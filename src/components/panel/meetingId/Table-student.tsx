import Table from "@/components/table";
import { TableProps as TablePropsAntd } from "@/lib/antd";
import { ApiResponse } from "@/types/api.type";
import { MeetingId, MeetingStudent } from "@/types/meetingId.type";
import React from "react";

interface TableStudentProps {
    meeting: ApiResponse<MeetingId> | undefined;
    isLoading: boolean;
    isSuccess: boolean;
}

const TableStudent: React.FC<TableStudentProps> = ({ meeting, isLoading }) => {
    const columns: TablePropsAntd<MeetingStudent>["columns"] = [
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
    ];

    return (
        <>
            <div>
                <p className="font-semibold text-xl mb-2">Siswa</p>
                <Table
                    dataSource={meeting?.data.students}
                    columns={columns}
                    loading={isLoading}
                />
            </div>
        </>
    );
};

export default TableStudent;
