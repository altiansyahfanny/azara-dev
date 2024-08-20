import { apiSlice } from "@/api/api";
import {
    useDeleteMeetingMutation,
    useGetMeetingsQuery,
    useVerifyMeetingMutation,
} from "@/api/meetingApi";
import ConfirmAlert from "@/components/confirm-alert";
import Table from "@/components/table";
import { Input } from "@/components/ui/input";
import InputDate from "@/components/ui/input-date";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { catchFunc } from "@/helpers/app-helper";
import useAuth from "@/hooks/useAuth";
import { TableColumnType, TableProps as TablePropsAntd } from "@/lib/antd";
import {
    setDataState,
    setFilterState,
    setModalState,
    setPaginationState,
} from "@/store/features/meetingSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Meeting, MeetingFilter } from "@/types/meeting.type";
import { format, parse } from "date-fns";
import { Check, Eye, FilePenLine, PlusCircle, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import toast from "react-hot-toast";
import UpdateMeeting from "./update";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const TableBrowse = () => {
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const navigate = useNavigate();

    const [idMeetingToDelete, setIdMeetingToDelete] = useState<number | null>();

    const { paginationState, filterState, modalState } = useAppSelector(
        (state) => state.meeting
    );

    const {
        data: meetings,
        isLoading,
        isSuccess,
        isError,
        refetch,
    } = useGetMeetingsQuery({
        page: paginationState.page,
        limit: paginationState.pageSize,
        ...filterState,
    });

    const onOpenChange = (value: boolean) => {
        dispatch(setModalState({ value: { modalCreate: value } }));
    };

    const onOpenChangeUpdate = (value: boolean) => {
        dispatch(setModalState({ value: { modalUpdate: value } }));
    };

    const [filter, setFilter] = useState<MeetingFilter>({
        classroomName: "",
        isVerified: "true",
    });

    const [searchedColumn, setSearchedColumn] = useState<string>();

    useEffect(() => {
        dispatch(setFilterState({ value: filter }));
        refetch();
    }, []);

    const handleSearch = (dataIndex: keyof MeetingFilter) => {
        setSearchedColumn(dataIndex);
        dispatch(setFilterState({ value: filter }));
    };

    const handleReset = (dataIndex: keyof MeetingFilter) => {
        const newFilter = { ...filter, [dataIndex]: "" };
        // delete newFilter[dataIndex];
        setFilter(newFilter);
        dispatch(setFilterState({ value: newFilter }));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
    };

    const getColumnSearchProps = (
        dataIndex: keyof MeetingFilter
    ): TableColumnType<Meeting> => ({
        filterDropdown: ({ confirm }) => {
            const onSearch = () => {
                handleSearch(dataIndex);
                confirm();
            };

            const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") onSearch();
            };

            let content;
            if (["meetingDate"].includes(dataIndex)) {
                const value = filter && filter[dataIndex];

                content = (
                    <div className="w-52">
                        <InputDate
                            value={
                                value ? new Date(value as string) : undefined
                            }
                            onSelect={(e) => {
                                setFilter((prev) => ({
                                    ...prev!,
                                    [dataIndex]: format(
                                        e as Date,
                                        "yyyy-LL-dd"
                                    ),
                                }));
                            }}
                        />
                    </div>
                );
            } else if (["isVerified"].includes(dataIndex)) {
                content = (
                    <Select
                        onValueChange={(e) =>
                            setFilter((prev) => ({
                                ...prev!,
                                isVerified: e,
                            }))
                        }
                        value={
                            filter && (filter[dataIndex] as string | undefined)
                        }
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder={`Pilih ${dataIndex}`} />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value={"true"}>Sudah</SelectItem>
                            <SelectItem value={"false"}>Belum</SelectItem>
                        </SelectContent>
                    </Select>
                );
            } else {
                content = (
                    <Input
                        name={dataIndex}
                        onChange={onChange}
                        value={
                            filter && (filter[dataIndex] as string | undefined)
                        }
                        onKeyDown={onKeyDown}
                        autoComplete="off"
                    />
                );
            }

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

            if (["isVerified"].includes(dataIndex)) {
                return text ? "Sudah" : "Belum";
            } else {
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
            }
        },
    });

    const columns: TablePropsAntd<Meeting>["columns"] = [
        {
            title: "Aksi",
            type: "action",
            key: "action",
            textAlign: "center",
            width: 80,
            render: (meeting: Meeting) => {
                return (
                    <div className="flex items-center gap-x-2">
                        <Table.ButtonAction
                            onClick={() => navigate(`${meeting.id}`)}
                            Icon={Eye}
                        />
                        <Table.ButtonAction
                            onClick={() => onClickButtonUpdate(meeting)}
                            Icon={FilePenLine}
                        />
                        <Table.ButtonAction
                            onClick={() => onClickButtonDelete(meeting)}
                            Icon={Trash}
                            disabled={isLoadingDelete}
                        />
                        {auth.isAdmin && (
                            <Table.ButtonAction
                                onClick={() => onClickButtonVerify(meeting)}
                                Icon={Check}
                                disabled={isLoadingVerify || meeting.isVerified}
                                variant={
                                    meeting.isVerified ? "default" : "outline"
                                }
                            />
                        )}
                    </div>
                );
            },
        },
        {
            title: "Jam Mulai",
            dataIndex: "startTime",
            key: "startTime",
            // ...getColumnSearchProps('courseName'),
            render: (text: string) => {
                return (
                    <p>
                        {format(parse(text, "HH:mm:ss", new Date()), "HH:mm")}
                    </p>
                );
            },
        },
        {
            title: "Jam Selesai",
            dataIndex: "endTime",
            key: "endTime",
            // ...getColumnSearchProps('courseName'),
            render: (text: string) => {
                return (
                    <p>
                        {format(parse(text, "HH:mm:ss", new Date()), "HH:mm")}
                    </p>
                );
            },
        },
        {
            title: "Tanggal Pertemuan",
            dataIndex: "meetingDate",
            key: "meetingDate",
            // ...getColumnSearchProps('meetingDate'),
            render: (text: string) => {
                return <p>{format(text, "yyyy-LL-dd")}</p>;
            },
        },
        {
            title: "Nomor Pertemuan",
            dataIndex: "meetingNumber",
            key: "meetingNumber",
            // ...getColumnSearchProps('courseName'),
        },
        // {} teacher attendance
        // {} representes by
        // {} isVerified
        // {} evidenceImageUrl
        {
            title: "Mata Pelajaran",
            dataIndex: "courseName",
            key: "courseName",
            // ...getColumnSearchProps('courseName'),
        },
        {
            title: "Nama Depan Guru",
            dataIndex: "firstName",
            key: "firstName",
            // ...getColumnSearchProps('courseName'),
        },
        {
            title: "Nama Belakang Guru",
            dataIndex: "lastName",
            key: "lastName",
            // ...getColumnSearchProps('courseName'),
        },
        {
            title: "Verifikasi",
            dataIndex: "isVerified",
            key: "isVerified",
            ...getColumnSearchProps("isVerified"),
        },
        {
            title: "Kelas",
            dataIndex: "classroomName",
            key: "classroomName",
            ...getColumnSearchProps("classroomName"),
        },
    ];

    //

    const onClickButtonUpdate = (meeting: Meeting) => {
        console.log("meeting : ", meeting);
        // // return;
        dispatch(setDataState({ value: meeting }));
        dispatch(setModalState({ value: { modalUpdate: true } }));
    };

    const onClickButtonDelete = (meeting: Meeting) => {
        console.log("onClickButtonDelete -> meeting : ", meeting);
        setIdMeetingToDelete(meeting.id);
        dispatch(setModalState({ value: { alartDelete: true } }));
        // // return
    };

    const [idMeeting, setIdMeeting] = useState<number | null>(null);

    const [verify, { isLoading: isLoadingVerify }] = useVerifyMeetingMutation();
    const [deleteMeeting, { isLoading: isLoadingDelete }] =
        useDeleteMeetingMutation();

    const onClickButtonVerify = async (meeting: Meeting) => {
        console.log("onClickButtonVerify -> meeting : ", meeting);
        setIdMeeting(meeting.id);
        dispatch(setModalState({ value: { alertVerify: true } }));
    };

    const onSubmittedVerify = async () => {
        if (idMeeting === null) {
            return toast.error("ID Pertemuan tidak ditemukan");
        }

        try {
            console.log("onClickButtonVerify -> meeting : ", idMeeting);

            // return;

            const result = await verify({ id: idMeeting }).unwrap();

            console.log(
                "Verify Meeting -> onFinish -> success : ",
                result.message
            );

            dispatch(setModalState({ value: { alertVerify: false } }));
            toast.success(result.message);
        } catch (err) {
            catchFunc(err);
        } finally {
            setIdMeeting(null);
        }
    };

    const onSubmittedDelete = async () => {
        if (!idMeetingToDelete) {
            return toast.error("ID Pertemuan tidak ditemukan");
        }

        try {
            console.log(
                "onSubmittedDelete -> idMeeiting : ",
                idMeetingToDelete
            );

            // return;

            const result = await deleteMeeting({
                id: idMeetingToDelete,
            }).unwrap();

            console.log(
                "Delete Meeting -> onFinish -> success : ",
                result.message
            );

            dispatch(setModalState({ value: { alartDelete: false } }));
            toast.success(result.message);
        } catch (err) {
            catchFunc(err);
        } finally {
            setIdMeetingToDelete(null);
        }
    };

    const onOpenChangeVerify = (value: boolean) => {
        dispatch(setModalState({ value: { alertVerify: value } }));
    };

    const onOpenChangeDelete = (value: boolean) => {
        dispatch(setModalState({ value: { alartDelete: value } }));
    };

    return (
        <>
            <Table
                dataSource={meetings?.data.meetings}
                columns={columns}
                loading={isLoading}
                error={isError}
                success={isSuccess}
                actions={[
                    {
                        Icon: PlusCircle,
                        text: "Pertemuan",
                        onClick: () => onOpenChange(true),
                    },
                ]}
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

                        dispatch(apiSlice.util.invalidateTags(["Meetings"]));
                    },
                }}
            />

            <Dialog
                open={modalState.modalUpdate}
                onOpenChange={onOpenChangeUpdate}
            >
                <DialogContent>
                    <div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
                        <DialogHeader>
                            <DialogTitle>Edit Pertemuan</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        <UpdateMeeting />
                    </div>
                </DialogContent>
            </Dialog>

            <ConfirmAlert
                open={modalState.alertVerify}
                onOpenChange={onOpenChangeVerify}
                title="Verifikasi Pertemuan"
                description="Apakah anda yakin ingin memverifikasi pertemuan ini?"
                onSubmit={onSubmittedVerify}
            />
            <ConfirmAlert
                open={modalState.alartDelete}
                onOpenChange={onOpenChangeDelete}
                title="Hapus Pertemuan"
                description="Apakah anda yakin ingin menghapus pertemuan ini?"
                onSubmit={onSubmittedDelete}
            />
        </>
    );
};

export default TableBrowse;
