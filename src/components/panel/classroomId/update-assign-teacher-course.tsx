import { useUpdateAssignTeacherAndCourseMutation } from "@/api/classroomApi";
import FormLib from "@/components/form-lib";
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { catchFunc } from "@/helpers/app-helper";
import { updateAssignTeacherCourseSchema } from "@/schema/classroomId";
import { setModalState } from "@/store/features/classroomIdSlice";
import { useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { z } from "zod";

const UpdateAssignTeacherCourse = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { dataStateAssignTeacherCourse } = useAppSelector(
        (state) => state.classroomId
    );

    const [updateAssignTeacherCourse, { isLoading }] =
        useUpdateAssignTeacherAndCourseMutation();

    const form = useForm<z.infer<typeof updateAssignTeacherCourseSchema>>({
        resolver: zodResolver(updateAssignTeacherCourseSchema),
        mode: "onChange",
        defaultValues: {
            paymentPrice:
                dataStateAssignTeacherCourse?.paymentPrice?.toString(),
            classroomId: id,
        },
    });

    const onSubmit = async (
        payload: z.infer<typeof updateAssignTeacherCourseSchema>
    ) => {
        try {
            console.log("updateAssignTeacher -> payload : ", payload);
            console.log(
                "updateAssignTeacher -> id : ",
                dataStateAssignTeacherCourse.id
            );

            return;

            const newPayload = {
                id: dataStateAssignTeacherCourse.id as number,
                classroomId: id as string,
                paymentPrice: payload.paymentPrice,
            };

            console.log("newPayload : ", newPayload);

            return;

            const result = await updateAssignTeacherCourse(newPayload).unwrap();

            console.log("updateAssignTeacher -> success : ", result.message);

            dispatch(
                setModalState({ value: { modalUpdateEnrollStudent: false } })
            );
            toast.success(result.message);
        } catch (err) {
            catchFunc(err);
        }
    };
    return (
        <div className="grid gap-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormItem>
                        <FormLabel>Nama Mata Pelajaran</FormLabel>
                        <Input
                            readOnly
                            value={dataStateAssignTeacherCourse?.courseName}
                        />
                    </FormItem>
                    <FormItem>
                        <FormLabel>Nama Guru</FormLabel>
                        <Input
                            readOnly
                            value={`${dataStateAssignTeacherCourse?.teacher?.firstName} ${dataStateAssignTeacherCourse?.teacher?.lastName}`}
                        />
                    </FormItem>
                    <FormLib
                        form={form}
                        name="paymentPrice"
                        label="Harga"
                        type="number"
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

export default UpdateAssignTeacherCourse;
