import { useAddPaymentMutation } from "@/api/paymentApi";
import FormLib from "@/components/form-lib";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { catchFunc } from "@/helpers/app-helper";
import { createPaymentSchema } from "@/schema/payment";
import { setModalState } from "@/store/features/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const CreatePayment = () => {
    const dispatch = useAppDispatch();

    const { dataStateCreate } = useAppSelector((state) => state.payment);

    const [create, { isLoading }] = useAddPaymentMutation();

    const form = useForm<z.infer<typeof createPaymentSchema>>({
        resolver: zodResolver(createPaymentSchema),
        mode: "onChange",
        defaultValues: {
            teacherId: dataStateCreate?.teacherId,
            accountNumber: dataStateCreate?.accountNumber,
            bankName: dataStateCreate?.bankName,
            recipientName: "",
            paymentDate: new Date(),
            amount: "",
        },
    });

    const onSubmit = async (payload: z.infer<typeof createPaymentSchema>) => {
        try {
            console.log("payload", payload);

            // return;

            const result = await create(payload).unwrap();
            dispatch(setModalState({ value: { modalCreate: false } }));
            console.log(
                "CreatePayment -> onFinish -> success : ",
                result.message
            );
            toast.success(result.message);
        } catch (err) {
            catchFunc(err);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormItem>
                    <FormLabel>Guru</FormLabel>
                    <FormControl>
                        <Input
                            readOnly={true}
                            value={`${dataStateCreate?.firstName} ${dataStateCreate?.lastName}`}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>

                <FormLib
                    form={form}
                    name="bankName"
                    label="Nama Bank"
                    readOnly={dataStateCreate?.bankName ? true : false}
                />
                <FormLib
                    form={form}
                    name="accountNumber"
                    label="Nomor Rekening"
                    readOnly={dataStateCreate?.accountNumber ? true : false}
                />
                <FormLib
                    form={form}
                    name="recipientName"
                    label="Nama Penerima"
                />
                <FormLib
                    form={form}
                    name="paymentDate"
                    label="Tanggal Pembayaran"
                    type="date"
                />
                <FormLib
                    form={form}
                    name="amount"
                    label="Jumlah"
                    type="number"
                />

                <div className="flex gap-2 items-center justify-end">
                    <Button type="submit" disabled={isLoading}>
                        Simpan
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CreatePayment;
