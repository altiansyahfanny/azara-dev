import { apiSlice } from "@/api/api";
import { useGetCyclesQuery } from "@/api/cycleApi";
import Table from "@/components/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import InputDate from "@/components/ui/input-date";
import { TableColumnType, TableProps as TablePropsAntd } from "@/lib/antd";
import {
    setDataState,
    setFilterState,
    setModalState,
    setPaginationState,
    setSortingState,
} from "@/store/features/cycleSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Cycle, CycleFilter } from "@/types/cycle.type";
import { format } from "date-fns";
import { FilePenLine, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import UpdateCycle from "./update";

const TableBrowse = () => {
    const dispatch = useAppDispatch();

    const { paginationState, filterState, sortingState, modalState } =
        useAppSelector((state) => state.cycle);

    const {
        data: cycles,
        isLoading,
        isSuccess,
        isError,
        refetch,
    } = useGetCyclesQuery({
        page: paginationState.page,
        limit: paginationState.pageSize,
        ...filterState,
        ...sortingState,
    });

    const onOpenChange = (value: boolean) => {
        dispatch(setModalState({ value: { modalCreate: value } }));
    };

    const onOpenChangeUpdate = (value: boolean) => {
        dispatch(setModalState({ value: { modalUpdate: value } }));
    };

    const onClickButtonUpdate = (cycle: Cycle) => {
        console.log("cycle : ", cycle);
        // return;
        dispatch(setDataState({ value: cycle }));
        dispatch(setModalState({ value: { modalUpdate: true } }));
    };

    //

    const [filter, setFilter] = useState<CycleFilter>({ description: "" });
    const [searchedColumn, setSearchedColumn] = useState<string>();

    useEffect(() => {
        dispatch(setFilterState({ value: filter }));
        refetch();
    }, []);

    const handleSearch = (dataIndex: keyof CycleFilter) => {
        setSearchedColumn(dataIndex);
        dispatch(setFilterState({ value: filter }));
    };

    const handleReset = (dataIndex: keyof CycleFilter) => {
        const newFilter = { ...filter, [dataIndex]: "" };
        // delete newFilter[dataIndex];
        setFilter(newFilter);
        dispatch(setFilterState({ value: newFilter }));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
    };

    const getColumnSearchProps = (
        dataIndex: keyof CycleFilter
    ): TableColumnType<Cycle> => ({
        filterDropdown: ({ confirm }) => {
            const onSearch = () => {
                handleSearch(dataIndex);
                confirm();
            };

            const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") onSearch();
            };

            let content;
            if (["endDate", "startDate"].includes(dataIndex)) {
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

    const columns: TablePropsAntd<Cycle>["columns"] = [
        {
            title: "Aksi",
            type: "action",
            key: "action",
            textAlign: "center",
            width: 80,
            render: (cycle: Cycle) => {
                return (
                    <div className="flex items-center gap-x-2">
                        <Table.ButtonAction
                            onClick={() => onClickButtonUpdate(cycle)}
                            Icon={FilePenLine}
                        />
                    </div>
                );
            },
        },
        {
            title: "Tanggal Mulai",
            dataIndex: "startDate",
            key: "startDate",
            sorter: true,
            ...getColumnSearchProps("startDate"),
        },
        {
            title: "Tanggal Selesai",
            dataIndex: "endDate",
            key: "endDate",
            sorter: true,
            ...getColumnSearchProps("endDate"),
        },
        {
            title: "Keterangan",
            dataIndex: "description",
            key: "description",
            ...getColumnSearchProps("description"),
        },
    ];
    //

    return (
        <>
            <Table
                dataSource={cycles?.data.cycles}
                columns={columns}
                loading={isLoading}
                error={isError}
                success={isSuccess}
                actions={[
                    {
                        Icon: PlusCircle,
                        text: "Tahun Ajaran",
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
                                value: { pageSize: number, page: 1 },
                            })
                        );

                        dispatch(apiSlice.util.invalidateTags(["Cycles"]));
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
                            <DialogTitle>Edit Tahun Ajaran</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        <UpdateCycle />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TableBrowse;
