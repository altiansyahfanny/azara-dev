import { useGetTeachersQuery } from "@/api/teacherApi";
import { DummyProfile } from "@/assets/dashboard/img";
import Table from "@/components/table";
import { Input } from "@/components/ui/input";
import { TableColumnType, TableProps as TablePropsAntd } from "@/lib/antd";
import {
    setAssignCourse,
    setModalState,
} from "@/store/features/classroomIdSlice";
import {
    setModalState as setModalStateTeacher,
    setSortingState,
} from "@/store/features/teacherSlice";
import {
    setFilterState,
    setPaginationState,
} from "@/store/features/teacherSlice";
import { setDataState } from "@/store/features/teacherSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Teacher, TeacherFilter } from "@/types/user.type";
import { FilePenLine, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import UpdateTeacher from "./update";
import { apiSlice } from "@/api/api";

interface TableBrowseProps {
    isBrowse?: boolean;
}

const TableBrowse: React.FC<TableBrowseProps> = ({ isBrowse = true }) => {
    const dispatch = useAppDispatch();

    const { paginationState, filterState, modalState, sortingState } =
        useAppSelector((state) => state.teacher);

    const {
        data: teachers,
        isLoading,
        isError,
        isSuccess,
        refetch,
    } = useGetTeachersQuery({
        page: paginationState.page,
        limit: paginationState.pageSize,
        ...filterState,
        ...sortingState,
    });

    const onEnroll = (teacher: Teacher) => {
        dispatch(setAssignCourse({ value: { teacher } }));
        dispatch(
            setModalState({ value: { modalFormAssignTeacherAndCourse: true } })
        );
        dispatch(setModalState({ value: { modalAssignTeacher: false } }));
    };

    const onClickButtonUpdate = (teacher: Teacher) => {
        console.log("teacher : ", teacher);

        dispatch(setDataState({ value: teacher }));
        dispatch(setModalStateTeacher({ value: { modalUpdate: true } }));
    };

    const onOpenChangeUpdate = (value: boolean) => {
        dispatch(setModalStateTeacher({ value: { modalUpdate: value } }));
    };

    const [filter, setFilter] = useState<TeacherFilter>({
        firstName: "",
        lastName: "",
    });
    const [searchedColumn, setSearchedColumn] = useState<string>();

    useEffect(() => {
        dispatch(setFilterState({ value: filter }));
        refetch();
    }, []);

    const handleSearch = (dataIndex: keyof TeacherFilter) => {
        setSearchedColumn(dataIndex);
        dispatch(setFilterState({ value: filter }));
    };

    const handleReset = (dataIndex: keyof TeacherFilter) => {
        const newFilter = { ...filter, [dataIndex]: "" };
        // delete newFilter[dataIndex];
        setFilter(newFilter);
        dispatch(setFilterState({ value: newFilter }));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
    };

    const getColumnSearchProps = (
        dataIndex: keyof TeacherFilter
    ): TableColumnType<Teacher> => ({
        filterDropdown: ({ confirm }) => {
            const onSearch = () => {
                handleSearch(dataIndex);
                confirm();
            };

            const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") onSearch();
            };

            let content = (
                <Input
                    name={dataIndex}
                    onChange={onChange}
                    value={filter && (filter[dataIndex] as string | undefined)}
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                />
            );

            return (
                <div className="flex flex-col gap-2">
                    <div onKeyDown={(e) => e.stopPropagation()}>{content}</div>
                    <div className="flex items-center gap-2">
                        <Table.ButtonFilter
                            type="search"
                            onClick={() => {
                                onSearch();
                            }}
                        />
                        <Table.ButtonFilter
                            type="reset"
                            onClick={() => {
                                handleReset(dataIndex);
                                confirm();
                            }}
                        />
                    </div>
                </div>
            );
        },
        render: (text: any) => {
            const searchWords = filter[dataIndex];

            if (searchedColumn === dataIndex) {
                return (
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: "#ffc069",
                            padding: 0,
                        }}
                        searchWords={[searchWords as string]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ""}
                    />
                );
            } else {
                return text;
            }
        },
    });

    const columns: TablePropsAntd<Teacher>["columns"] = [
        {
            title: "Aksi",
            type: "action",
            key: "action",
            textAlign: "center",
            width: 80,
            render: (teacher: Teacher) => {
                return (
                    <div className="flex gap-x-2">
                        {!isBrowse && (
                            <Table.ButtonAction
                                onClick={() => onEnroll(teacher)}
                                Icon={Plus}
                            />
                        )}
                        {isBrowse && (
                            <Table.ButtonAction
                                onClick={() => onClickButtonUpdate(teacher)}
                                Icon={FilePenLine}
                            />
                        )}
                    </div>
                );
            },
        },
        {
            title: "Pic.",
            key: "pic",
            textAlign: "center",
            width: 100,
            render: (teacher: Teacher) => {
                return (
                    <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={teacher?.imageUrl ?? DummyProfile}
                        width="64"
                    />
                );
            },
        },
        {
            title: "Nama Depan",
            dataIndex: "firstName",
            key: "firstName",
            sorter: true,
            ...getColumnSearchProps("firstName"),
        },
        {
            title: "Nama Belakang",
            dataIndex: "lastName",
            key: "lastName",
            ...getColumnSearchProps("lastName"),
        },
    ];

    return (
        <>
            <Table
                dataSource={teachers?.data.teachers}
                columns={columns}
                loading={isLoading}
                error={isError}
                success={isSuccess}
                pagination={{
                    totalPages: paginationState.totalPage,
                    itemsPerPage: paginationState.pageSize,
                    currentPage: paginationState.page,
                    onPageChange: (number) => {
                        dispatch(
                            setPaginationState({ value: { page: number } })
                        );
                    },
                    onPageSizeChange: (number) => {
                        dispatch(
                            setPaginationState({
                                value: {
                                    pageSize: number,
                                    page: 1,
                                },
                            })
                        );

                        dispatch(apiSlice.util.invalidateTags(["Teachers"]));
                    },
                }}
                onChange={(column, sortDirection) => {
                    dispatch(
                        setSortingState({
                            value: {
                                sort: sortDirection ? column : "",
                                sortDirection: sortDirection,
                            },
                        })
                    );
                }}
            />

            <Dialog
                open={modalState.modalUpdate}
                onOpenChange={onOpenChangeUpdate}
            >
                <DialogContent>
                    <div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
                        <DialogHeader>
                            <DialogTitle>Edit Guru</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        <UpdateTeacher />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TableBrowse;
