import { useUpdateUserMutation } from "@/api/userApi";
import FormLib from "@/components/form-lib";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { catchFunc } from "@/helpers/app-helper";
import { updateUserSchema } from "@/schema/user";
import { setModalState } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function UpdateUser() {
    const dispatch = useAppDispatch();

    const [update, { isLoading }] = useUpdateUserMutation();

    const { dataState } = useAppSelector((state) => state.user);

    console.log("dataState", dataState);

    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        mode: "onChange",
        defaultValues: {
            firstName: dataState?.firstName,
            lastName: dataState?.lastName,
            address: dataState?.address,
            bankName: dataState?.bankName,
            accountNumber: dataState?.accountNumber,
        },
    });

    const onSubmit = async (payload: z.infer<typeof updateUserSchema>) => {
        try {
            console.log("UpdateUser -> payload : ", payload);

            // return;

            const result = await update(payload).unwrap();

            console.log("UpdateUser -> onFinish -> success : ", result.message);

            dispatch(setModalState({ value: { modalUpdate: false } }));
            toast.success(result.message);
        } catch (err) {
            catchFunc(err);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormLib form={form} name="firstName" label="Nama Depan" />
                <FormLib form={form} name="lastName" label="Nama Belakang" />
                <FormLib form={form} name="address" label="Alamat" />
                <FormLib form={form} name="bankName" label="Nama Bank" />
                <FormLib
                    form={form}
                    name="accountNumber"
                    label="Nomor Rekening"
                />

                <div className="flex gap-2 items-center justify-end">
                    <Button type="submit" disabled={isLoading}>
                        Simpan
                    </Button>
                </div>
            </form>
        </Form>
    );
}
