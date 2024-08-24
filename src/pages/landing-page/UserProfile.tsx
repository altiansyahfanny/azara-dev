import { useGetUserDetailQuery } from "@/api/userApi";
import { DummyProfile } from "@/assets/landing/img";
import Navbar from "@/components/landing-page/navbar";
import PageError from "@/components/page-error";
import SkeletonLoading from "@/components/skeleton-loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Schedule from "@/components/landing-page/user-profile/Schedule";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserProfile = () => {
    const {
        data: user,
        isLoading,
        isError,
        isSuccess,
    } = useGetUserDetailQuery();

    let content;

    if (isError) {
        content = <PageError />;
    }

    if (isLoading) {
        content = (
            <div className="pt-4 pb-20 grid gap-4">
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
            </div>
        );
    }

    if (isSuccess) {
        content = (
            <>
                <div className="">
                    <div className="">
                        <div className="rounded-lg border p-4 flex items-center justify-center flex-col gap-4 max-w-md mx-auto">
                            <img
                                src={user.data.imageUrl ?? DummyProfile}
                                className="w-32 rounded-full aspect-square"
                            />
                            <div className="text-center">
                                <p className="text-xl font-semibold">{`${user.data.firstName} ${user.data.lastName}`}</p>
                                <p className="text-muted-foreground">
                                    {user.data.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue={"detail"} className="mt-4">
                    <div className="flex items-center justify-center">
                        <TabsList>
                            <TabsTrigger value="detail">
                                Informasi Pribadi
                            </TabsTrigger>
                            <TabsTrigger value="schedule">
                                Jadwal Pertemuan
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="detail">
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
                                    <Label
                                        htmlFor="email"
                                        className="mb-2 block"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        name="email"
                                        value={user.data.email}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="role"
                                        className="mb-2 block"
                                    >
                                        Role
                                    </Label>
                                    <Input
                                        name="role"
                                        value={user.data.role}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="address"
                                        className="mb-2 block"
                                    >
                                        Alamat
                                    </Label>
                                    <Input
                                        name="address"
                                        value={user.data.address ?? ""}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="schedule">
                        <div className="p-4 border rounded">
                            <Schedule />
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="py-8 flex items-center justify-end">
                    <Link
                        to={"/"}
                        className="text-white py-2 px-4 bg-custom-green rounded-lg outline-none focus:outline-none"
                    >
                        Kembali
                    </Link>
                </div>
            </>
        );
    }

    return (
        <div className="relative overflow-hidden">
            <Navbar hideMenu={true} />
            <div style={{ marginTop: 20 }}>
                <div className="px-20 mt-20">{content}</div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;
