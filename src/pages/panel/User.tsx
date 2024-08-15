import CreateUser from "@/components/panel/user/create";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setModalState } from "@/store/features/userSlice";
import { useAppSelector } from "@/store/store";
import { PlusCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import Student from "./user/Student";
import Teacher from "./user/Teacher";

const User = () => {
    const dispatch = useDispatch();
    const userState = useAppSelector((state) => state.user);

    const onOpenChange = (value: boolean) => {
        dispatch(setModalState({ value: { modalCreate: value } }));
    };

    return (
        <>
            <Tabs defaultValue={userState.defaultTab}>
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="student">Siswa</TabsTrigger>
                        <TabsTrigger value="teacher">Guru</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <Button
                            size="sm"
                            className="h-7 gap-1"
                            onClick={() => onOpenChange(true)}
                        >
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Pengguna
                            </span>
                        </Button>
                    </div>
                </div>

                <TabsContent value="teacher">
                    <Teacher />
                </TabsContent>
                <TabsContent value="student">
                    <Student />
                </TabsContent>
            </Tabs>
            <Dialog
                open={userState.modalState.modalCreate}
                onOpenChange={onOpenChange}
            >
                <DialogContent>
                    <div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar">
                        <DialogHeader>
                            <DialogTitle>Tambah Pengguna</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        <CreateUser />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default User;
