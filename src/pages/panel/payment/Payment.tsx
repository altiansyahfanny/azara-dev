import Container from "@/components/core/container";
import CreateCourse from "@/components/panel/course/create";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useTitle from "@/hooks/useTitle";
import { setModalState } from "@/store/features/courseSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import TableBrowse from "@/components/panel/payment/table-browse";

const Payment = () => {
    useTitle("Pembayaran");

    const dispatch = useAppDispatch();

    const { modalState } = useAppSelector((state) => state.course);

    const handleModalOpenChange = (isOpen: boolean) => {
        dispatch(setModalState({ value: { modalCreate: isOpen } }));
    };

    return (
        <Container title="Pembayaran">
            <TableBrowse />
            <Dialog
                open={modalState.modalCreate}
                onOpenChange={handleModalOpenChange}
            >
                <DialogContent>
                    <div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
                        <DialogHeader>
                            <DialogTitle>Tambah Pembayaran</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        <CreateCourse />
                    </div>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Payment;
