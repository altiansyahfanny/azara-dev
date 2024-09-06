import { useGetUserDetailQuery } from '@/api/userApi';
import { DummyProfile } from '@/assets/landing/img';
import Navbar from '@/components/landing-page/navbar';
import PageError from '@/components/page-error';
import SkeletonLoading from '@/components/skeleton-loading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Schedule from '@/components/landing-page/user-profile/Schedule';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setDataState, setModalState } from '@/store/features/userSlice';
import UpdateUser from '@/components/panel/user/update';
import UpdatePicture from '@/components/panel/user/updatePicture';
import UpdatePassword from '@/components/panel/user/updatePassword';
import { Edit, Key } from 'lucide-react';

const UserProfile = () => {
	const dispatch = useAppDispatch();
	const { modalState } = useAppSelector((state) => state.user);

	const { data: user, isLoading, isError, isSuccess } = useGetUserDetailQuery();

	const onOpenChangeModalUserUpdate = (value: boolean) => {
		dispatch(setModalState({ value: { modalUpdate: value } }));
	};

	const onOpenChangeModalPicture = (value: boolean) => {
		dispatch(setModalState({ value: { modalUpdatePicture: value } }));
	};

	const onOpenChangeModalChangePasssword = (value: boolean) => {
		dispatch(setModalState({ value: { modalChangePassword: value } }));
	};

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
								onClick={() => onOpenChangeModalPicture(true)}
							/>
							<div className="text-center">
								<p className="text-xl font-semibold">{`${user.data.firstName} ${user.data.lastName}`}</p>
								<p className="text-muted-foreground">{user.data.email}</p>
							</div>
						</div>
					</div>
				</div>

				<Tabs defaultValue={'schedule'} className="mt-4">
					<div className="flex flex-col-reverse lg:flex-row gap-4 items-center justify-between">
						<div className="flex items-center">
							<TabsList>
								<TabsTrigger value="detail">Informasi Pribadi</TabsTrigger>
								<TabsTrigger value="schedule">Jadwal Pertemuan</TabsTrigger>
							</TabsList>
						</div>
						<div className="flex items-center justify-end gap-2 w-full">
							<Button
								className="bg-custom-green hover:bg-custom-green"
								onClick={() => {
									dispatch(setDataState({ value: user.data }));
									dispatch(
										setModalState({
											value: { modalUpdate: true },
										})
									);
								}}
							>
								<Edit size={18} className="block lg:hidden" />
								<p className="lg:block hidden">Edit Kata Sandi</p>
							</Button>
							<Button
								className="bg-custom-green hover:bg-custom-green"
								onClick={() => onOpenChangeModalChangePasssword(true)}
							>
								<Key size={18} className="block lg:hidden" />
								<p className="lg:block hidden">Edit Data Profil</p>
							</Button>
						</div>
					</div>

					<TabsContent value="detail">
						<div className="grid lg:grid-cols-2 gap-4">
							<div className="p-4 border rounded-lg">
								<p className="text-xl font-semibold">Informasi Pribadi</p>
								<hr className="mt-2 mb-4" />
								<div className="grid gap-4">
									<div>
										<Label htmlFor="firstName" className="mb-2 block">
											Nama Depan
										</Label>
										<Input name="firstName" value={user.data.firstName} readOnly />
									</div>
									<div>
										<Label htmlFor="lastName" className="mb-2 block">
											Nama Belakang
										</Label>
										<Input name="lastName" value={user.data.lastName} readOnly />
									</div>
									<div>
										<Label htmlFor="email" className="mb-2 block">
											Email
										</Label>
										<Input name="email" value={user.data.email} readOnly />
									</div>
									<div>
										<Label htmlFor="address" className="mb-2 block">
											Alamat
										</Label>
										<Input name="address" value={user.data.address ?? '-'} readOnly />
									</div>
								</div>
							</div>
							<div className="p-4 border rounded-lg">
								<p className="text-xl font-semibold">Informasi Pembayaran</p>
								<hr className="mt-2 mb-4" />
								<div className="grid gap-4">
									<div>
										<Label htmlFor="bankName" className="mb-2 block">
											Nama Bank
										</Label>
										<Input name="bankName" value={user.data.bankName ?? '-'} readOnly />
									</div>
									<div>
										<Label htmlFor="accountNumber" className="mb-2 block">
											Nomor Rekening
										</Label>
										<Input name="accountNumber" value={user.data.accountNumber ?? '-'} readOnly />
									</div>
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
						to={'/'}
						className="text-white py-2 px-4 bg-custom-green rounded-lg outline-none focus:outline-none"
					>
						Kembali
					</Link>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="relative overflow-hidden">
				<Navbar hideMenu={true} />
				<div style={{ marginTop: 20 }}>
					<div className="px-5 lg:px-20 mt-20">{content}</div>
				</div>
				<Footer />
			</div>

			<Dialog open={modalState.modalUpdate} onOpenChange={onOpenChangeModalUserUpdate}>
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

			<Dialog open={modalState.modalUpdatePicture} onOpenChange={onOpenChangeModalPicture}>
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
			<Dialog open={modalState.modalChangePassword} onOpenChange={onOpenChangeModalChangePasssword}>
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
		</>
	);
};

export default UserProfile;
