import { apiSlice } from "@/api/api";
import {
    useDeletePaymentHistoryMutation,
    useGetPaymentsHistoryQuery,
} from "@/api/paymentHistoryApi";
import ConfirmAlert from "@/components/confirm-alert";
import Table from "@/components/table";
import { Input } from "@/components/ui/input";
import InputDateRange from "@/components/ui/input-date-range";
import { catchFunc, formatNumber } from "@/helpers/app-helper";
import { TableColumnType, TableProps as TablePropsAntd } from "@/lib/antd";
import {
    setDataUpdateState,
    setFilterState,
    setModalState,
    setPaginationState,
} from "@/store/features/paymentHistorySlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { PaymentHistory, PaymentHistoryFilter } from "@/types/payment.type";
import { format, parse } from "date-fns";
import { FilePenLine, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import toast from "react-hot-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import UpdatePaymentHistory from "./update";

const TableBrowse = () => {
    const dispatch = useAppDispatch();

    const { paginationState, filterState, modalState } = useAppSelector(
        (state) => state.paymentHistory
    );

    const [idPaymentHistoryToDelete, setIdPaymentHistoryToDelete] = useState<
        number | null
    >();

    const [filter, setFilter] = useState<PaymentHistoryFilter>({
        recipientName: "",
        paymentDate: {
            startFrom: "",
            endTo: "",
        },
    });

    const {
        data: paymentsHistory,
        isLoading,
        isSuccess,
        isError,
        refetch,
    } = useGetPaymentsHistoryQuery({
        page: paginationState.page,
        limit: paginationState.pageSize,
        ...filterState,
    });

    //

    const [searchedColumn, setSearchedColumn] = useState<string>();

    useEffect(() => {
        dispatch(setFilterState({ value: filter }));
        refetch();
    }, []);

    const handleSearch = (dataIndex: keyof PaymentHistoryFilter) => {
        setSearchedColumn(dataIndex);
        dispatch(setFilterState({ value: filter }));
    };

    const handleReset = (dataIndex: keyof PaymentHistoryFilter) => {
        const newFilter = { ...filter, [dataIndex]: "" };
        // delete newFilter[dataIndex];
        setFilter(newFilter);
        dispatch(setFilterState({ value: newFilter }));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
    };

    const getColumnSearchProps = (
        dataIndex: keyof PaymentHistoryFilter
    ): TableColumnType<PaymentHistory> => ({
        filterDropdown: ({ confirm }) => {
            const onSearch = () => {
                handleSearch(dataIndex);
                confirm();
            };

            const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") onSearch();
            };

            let content;
            if (["paymentDate"].includes(dataIndex)) {
                const value = {
                    from: filter?.paymentDate?.startFrom
                        ? parse(
                              filter?.paymentDate
                                  ?.startFrom as unknown as string,
                              "yyyy-LL-dd",
                              new Date()
                          )
                        : undefined,
                    to: filter?.paymentDate?.endTo
                        ? parse(
                              filter?.paymentDate?.endTo as unknown as string,
                              "yyyy-LL-dd",
                              new Date()
                          )
                        : undefined,
                };

                content = (
                    <div className="w-56">
                        <InputDateRange
                            value={value ? value : undefined}
                            onSelect={(e) => {
                                let startFrom: string | undefined = undefined;
                                let endTo: string | undefined = undefined;

                                if (e) {
                                    if (e.from) {
                                        startFrom = format(
                                            new Date(e.from),
                                            "yyyy-LL-dd"
                                        );
                                    }
                                    if (e.to) {
                                        endTo = format(
                                            new Date(e.to),
                                            "yyyy-LL-dd"
                                        );
                                    }
                                }

                                const paymentDate = {
                                    startFrom,
                                    endTo,
                                };

                                setFilter((prev) => ({
                                    ...prev!,
                                    paymentDate,
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

            if (["paymentDate"].includes(dataIndex)) {
                return format(new Date(text), "yyyy-MM-dd");
            }

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

    const onOpenChangeDelete = (value: boolean) => {
        dispatch(setModalState({ value: { alertDelete: value } }));
    };

    const onClickButtonDelete = (paymentHistory: PaymentHistory) => {
        console.log("onClickButtonDelete -> paymentHistory : ", paymentHistory);
        setIdPaymentHistoryToDelete(paymentHistory.id);
        dispatch(setModalState({ value: { alertDelete: true } }));
    };

    const onClickButtonUpdate = (payment: PaymentHistory) => {
        dispatch(setDataUpdateState({ value: payment }));
        dispatch(setModalState({ value: { modalUpdate: true } }));
    };

    const onOpenChangeUpdate = (value: boolean) => {
        dispatch(setModalState({ value: { modalUpdate: value } }));
    };

    const columns: TablePropsAntd<PaymentHistory>["columns"] = [
        {
            title: "Aksi",
            type: "action",
            key: "action",
            textAlign: "center",
            width: 80,
            render: (paymentHistory: PaymentHistory) => {
                return (
                    <div className="flex items-center gap-x-2">
                        <Table.ButtonAction
                            onClick={() => onClickButtonUpdate(paymentHistory)}
                            Icon={FilePenLine}
                        />
                        <Table.ButtonAction
                            onClick={() => onClickButtonDelete(paymentHistory)}
                            Icon={Trash}
                            disabled={isLoadingDelete}
                        />
                    </div>
                );
            },
        },
        {
            title: "Nama Penerima",
            dataIndex: "recipientName",
            key: "recipientName",
            ...getColumnSearchProps("recipientName"),
        },
        {
            title: "Tanggal Pembayaran",
            dataIndex: "paymentDate",
            key: "paymentDate",
            ...getColumnSearchProps("paymentDate"),
            // render: (text: string) => {
            //     return <p>{format(text, "yyyy-LL-dd")}</p>;
            // },
        },
        {
            title: "Nomor Rekening",
            dataIndex: "accountNumber",
            key: "accountNumber",
            // ...getColumnSearchProps("accountNumber"),
        },
        {
            title: "Nama Bank",
            dataIndex: "bankName",
            key: "bankName",
            // ...getColumnSearchProps("bankName"),
        },
        {
            title: "Jumlah Pembayaran",
            dataIndex: "amount",
            key: "amount",
            render: (text: number) => formatNumber(text),
        },
    ];

    //

    const [deletePaymentHistory, { isLoading: isLoadingDelete }] =
        useDeletePaymentHistoryMutation();

    const onSubmittedDelete = async () => {
        if (!idPaymentHistoryToDelete) {
            return toast.error("ID Pertemuan tidak ditemukan");
        }

        try {
            console.log(
                "onSubmittedDelete -> idPaymentHistory : ",
                idPaymentHistoryToDelete
            );

            // return;

            const result = await deletePaymentHistory({
                id: idPaymentHistoryToDelete,
            }).unwrap();

            console.log(
                "DeletePaymentHistory -> onFinish -> success : ",
                result.message
            );

            dispatch(setModalState({ value: { alertDelete: false } }));
            toast.success(result.message);
        } catch (err) {
            catchFunc(err);
        } finally {
            setIdPaymentHistoryToDelete(null);
        }
    };

    return (
        <>
            <Table
                dataSource={paymentsHistory?.data.payments}
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

                        dispatch(apiSlice.util.invalidateTags(["Payments"]));
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
                            <DialogTitle>Edit Riwayat Pembayaran</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        <UpdatePaymentHistory />
                    </div>
                </DialogContent>
            </Dialog>

            <ConfirmAlert
                open={modalState.alertDelete}
                onOpenChange={onOpenChangeDelete}
                title="Hapus Riwayat Pembayaran"
                description="Apakah anda yakin ingin menghapus riwayat pembayaran ini?"
                onSubmit={onSubmittedDelete}
            />
        </>
    );
};

export default TableBrowse;
