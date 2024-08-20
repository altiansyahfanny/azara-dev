import { useGetPaymentsQuery } from "@/api/paymentApi";
import Table from "@/components/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TableColumnType, TableProps as TablePropsAntd } from "@/lib/antd";
import {
    setFilterState,
    setModalState,
    setPaginationState,
} from "@/store/features/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Payment, PaymentFilter } from "@/types/payment.type";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
// import UpdatePayment from "./update";
import { apiSlice } from "@/api/api";
import { formatNumber } from "@/helpers/app-helper";

interface TableBrowseProps {
    isBrowse?: boolean;
}

const TableBrowse: React.FC<TableBrowseProps> = ({ isBrowse = true }) => {
    const dispatch = useAppDispatch();

    const { paginationState, filterState, modalState } = useAppSelector(
        (state) => state.payment
    );

    const {
        data: payments,
        isLoading,
        isSuccess,
        isError,
        refetch,
    } = useGetPaymentsQuery({
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

    const onOpenChangeCreate = (value: boolean) => {
        dispatch(setModalState({ value: { modalCreate: value } }));
    };

    //

    const [filter, setFilter] = useState<PaymentFilter>({
        teacherAttendance: "",
        representedBy: "",
        totalPayment: "",
        firstName: "",
        lastName: "",
        accountNumber: "",
        bankName: "",
    });
    const [searchedColumn, setSearchedColumn] = useState<string>();

    useEffect(() => {
        dispatch(setFilterState({ value: filter }));
        refetch();
    }, []);

    const handleSearch = (dataIndex: keyof PaymentFilter) => {
        setSearchedColumn(dataIndex);
        dispatch(setFilterState({ value: filter }));
    };

    const handleReset = (dataIndex: keyof PaymentFilter) => {
        const newFilter = { ...filter, [dataIndex]: "" };
        // delete newFilter[dataIndex];
        setFilter(newFilter);
        dispatch(setFilterState({ value: newFilter }));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
    };

    const getColumnSearchProps = (
        dataIndex: keyof PaymentFilter
    ): TableColumnType<Payment> => ({
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

    const columns: TablePropsAntd<Payment>["columns"] = [
        {
            title: "Nama Depan Guru",
            dataIndex: "firstName",
            key: "firstName",
            ...getColumnSearchProps("firstName"),
        },
        {
            title: "Nama Belakang Guru",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Kehadiran Guru",
            dataIndex: "teacherAttendance",
            key: "teacherAttendance",
        },
        {
            title: "Diwakilkan Oleh",
            dataIndex: "representedBy",
            key: "representedBy",
            render: (text: string) => text || "-",
        },
        {
            title: "Nomor Rekening",
            dataIndex: "accountNumber",
            key: "accountNumber",
            render: (text: string) => text || "-",
        },
        {
            title: "Nama Bank",
            dataIndex: "bankName",
            key: "bankName",
            render: (text: string) => text || "-",
        },
        {
            title: "Total Pembayaran",
            dataIndex: "totalPayment",
            key: "totalPayment",
            render: (text: number) => formatNumber(text),
        },
    ];

    //

    return (
        <>
            <Table
                dataSource={payments?.data.payments}
                columns={columns}
                loading={isLoading}
                error={isError}
                success={isSuccess}
                actions={
                    isBrowse
                        ? [
                              {
                                  Icon: PlusCircle,
                                  text: "Pembayaran",
                                  onClick: () => onOpenChange(true),
                              },
                          ]
                        : []
                }
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

                        dispatch(apiSlice.util.invalidateTags(["Payments"]));
                    },
                }}
            />
            <Dialog
                open={modalState.modalCreate}
                onOpenChange={onOpenChangeCreate}
            >
                <DialogContent>
                    <div className="max-h-96 px-4 overflow-scroll no-scrollbar bggray">
                        <DialogHeader>
                            <DialogTitle>Tambah Pembayaran</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        {/* <UpdatePayment /> */}
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog
                open={modalState.modalUpdate}
                onOpenChange={onOpenChangeUpdate}
            >
                <DialogContent>
                    <div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
                        <DialogHeader>
                            <DialogTitle>Edit Mata Ajaran</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        {/* <UpdatePayment /> */}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TableBrowse;
