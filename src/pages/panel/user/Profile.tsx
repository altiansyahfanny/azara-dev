import { useGetUserDetailQuery } from "@/api/userApi";
import { DummyProfile } from "@/assets/landing/img";
import Container from "@/components/core/container";
import PageError from "@/components/page-error";
import UpdateUser from "@/components/panel/user/update";
import UpdatePassword from "@/components/panel/user/updatePassword";
import UpdatePicture from "@/components/panel/user/updatePicture";
import SkeletonLoading from "@/components/skeleton-loading";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useTitle from "@/hooks/useTitle";
import { setDataState, setModalState } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const Profile = () => {
    useTitle("Profile");

    const dispatch = useAppDispatch();
    const { modalState } = useAppSelector((state) => state.user);

    const {
        data: user,
        isLoading,
        isError,
        isSuccess,
    } = useGetUserDetailQuery();

    const onOpenChangeModalPicture = (value: boolean) => {
        dispatch(setModalState({ value: { modalUpdatePicture: value } }));
    };

    const onOpenChangeModalChangePasssword = (value: boolean) => {
        dispatch(setModalState({ value: { modalChangePassword: value } }));
    };

    const onOpenChangeModalUserUpdate = (value: boolean) => {
        dispatch(setModalState({ value: { modalUpdate: value } }));
    };

    let content;

    if (isError) {
        return <PageError />;
    }

    if (isLoading) {
        content = <SkeletonLoading />;
    }

    if (isSuccess) {
        content = (
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <div className="rounded-lg border p-4 flex items-center justify-center flex-col gap-4">
                        <img
                            src={user.data.imageUrl ?? DummyProfile}
                            className="w-32 rounded-full aspect-square object-center object-cover cursor-pointer"
                            onClick={() => onOpenChangeModalPicture(true)}
                        />
                        <div className="text-center">
                            <p className="text-xl font-semibold">{`${user.data.firstName} ${user.data.lastName}`}</p>
                            <p className="text-muted-foreground">
                                {user.data.email}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-x-2">
                        <Button
                            variant={"outline"}
                            onClick={() =>
                                onOpenChangeModalChangePasssword(true)
                            }
                        >
                            Edit Kata Sandi
                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={() => {
                                dispatch(setDataState({ value: user.data }));
                                dispatch(
                                    setModalState({
                                        value: { modalUpdate: true },
                                    })
                                );
                            }}
                        >
                            Edit Data Profil
                        </Button>
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="p-4 border rounded-lg">
                        <p className="text-xl font-semibold">
                            Informasi Pribadi
                        </p>
                        <hr className="mt-2 mb-4" />
                        <div className="grid gap-4">
                            <div>
                                <Label
                                    htmlFor="firstName"
                                    className="mb-2 block"
                                >
                                    Nama Depan
                                </Label>
                                <Input
                                    name="firstName"
                                    value={user.data.firstName}
                                    readOnly
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="lastName"
                                    className="mb-2 block"
                                >
                                    Nama Belakang
                                </Label>
                                <Input
                                    name="lastName"
                                    value={user.data.lastName}
                                    readOnly
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-2 block">
                                    Email
                                </Label>
                                <Input
                                    name="email"
                                    value={user.data.email}
                                    readOnly
                                />
                            </div>
                            {/* <div>
							<Label htmlFor="role" className="mb-2 block">
								Role
							</Label>
							<Input name="role" value={user.data.role} readOnly />
						</div> */}
                            <div>
                                <Label htmlFor="address" className="mb-2 block">
                                    Alamat
                                </Label>
                                <Input
                                    name="address"
                                    value={user.data.address ?? "-"}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border rounded-lg mt-4">
                        <p className="text-xl font-semibold">
                            Informasi Pembayaran
                        </p>
                        <hr className="mt-2 mb-4" />
                        <div className="grid gap-4">
                            <div>
                                <Label
                                    htmlFor="bankName"
                                    className="mb-2 block"
                                >
                                    Nama Bank
                                </Label>
                                <Input
                                    name="bankName"
                                    value={user.data.bankName ?? "-"}
                                    readOnly
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="accountNumber"
                                    className="mb-2 block"
                                >
                                    Nomor Rekening
                                </Label>
                                <Input
                                    name="accountNumber"
                                    value={user.data.accountNumber ?? "-"}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Container title="Profile">
            {content}

            <Dialog
                open={modalState.modalUpdatePicture}
                onOpenChange={onOpenChangeModalPicture}
            >
                <DialogContent>
                    <div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
                        <DialogHeader>
                            <DialogTitle>Edit Foto Profil</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        <UpdatePicture />
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog
                open={modalState.modalChangePassword}
                onOpenChange={onOpenChangeModalChangePasssword}
            >
                <DialogContent>
                    <div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
                        <DialogHeader>
                            <DialogTitle>Edit Kata Sandi</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        <UpdatePassword />
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog
                open={modalState.modalUpdate}
                onOpenChange={onOpenChangeModalUserUpdate}
            >
                <DialogContent>
                    <div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar bggray">
                        <DialogHeader>
                            <DialogTitle>Edit Data Profil</DialogTitle>
                        </DialogHeader>
                        <hr className="my-4" />
                        <UpdateUser />
                    </div>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Profile;
