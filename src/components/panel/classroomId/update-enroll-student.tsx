import { useUpdateEnrollStudentMutation } from "@/api/classroomApi";
import FormLib from "@/components/form-lib";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
    enrollStudentSchema,
    updateEnrollStudentSchema,
} from "@/schema/classroomId";
import { setModalState } from "@/store/features/classroomIdSlice";
import { useAppSelector } from "@/store/store";
import { ApiResponse, ErrorResponse } from "@/types/api.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { z } from "zod";

const UpdateEnrollStudent = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { dataStateUpdateEnrollStudent } = useAppSelector(
        (state) => state.classroomId
    );

    const [updateEnroll, { isLoading }] = useUpdateEnrollStudentMutation();

    const form = useForm<z.infer<typeof updateEnrollStudentSchema>>({
        resolver: zodResolver(enrollStudentSchema),
        mode: "onChange",
        defaultValues: {
            joinDate: new Date(
                dataStateUpdateEnrollStudent?.joinDate as string
            ),
        },
    });

    const onSubmit = async (
        payload: z.infer<typeof updateEnrollStudentSchema>
    ) => {
        try {
            console.log("updateEnrollStudent -> payload : ", payload);
            console.log(
                "updateEnrollStudent -> studentId : ",
                dataStateUpdateEnrollStudent.studentId
            );

            const newPayload = {
                id: dataStateUpdateEnrollStudent.studentId as number,
                classroomId: id as string,
                joinDate: payload.joinDate,
            };

            console.log("newPayload : ", newPayload);

            return;

            const result = await updateEnroll(newPayload).unwrap();

            console.log("updateEnrollStudent -> success : ", result.message);

            dispatch(
                setModalState({ value: { modalUpdateEnrollStudent: false } })
            );
            toast.success(result.message);
        } catch (err) {
            const error = err as ApiResponse<ErrorResponse>;
            console.log("updateEnrollStudent -> error : ", error.data.message);
            toast.error(error.data.message);
        }
    };
    return (
        <div className="grid gap-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormLib
                        form={form}
                        name="joinDate"
                        label="Tanggal Bergabung"
                        type="date"
                    />

                    <div className="flex gap-2 items-center justify-end">
                        <Button type="submit" disabled={isLoading}>
                            Simpan
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default UpdateEnrollStudent;
