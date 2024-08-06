import { useGetUserDetailQuery } from '@/api/userApi';
import { DummyProfile } from '@/assets/landing/img';
import Container from '@/components/core/container';
import PageError from '@/components/page-error';
import UpdatePicture from '@/components/panel/user/updatePicture';
import SkeletonLoading from '@/components/skeleton-loading';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTitle from '@/hooks/useTitle';
import { setModalState } from '@/store/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

const Profile = () => {
	useTitle('Profile');

	const dispatch = useAppDispatch();
	const { modalState } = useAppSelector((state) => state.user);

	const { data: user, isLoading, isError, isSuccess } = useGetUserDetailQuery();

	const onOpenChangeModalPicture = (value: boolean) => {
		dispatch(setModalState({ value: { modalUpdatePicture: value } }));
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
							<p className="text-muted-foreground">{user.data.email}</p>
						</div>
					</div>
				</div>

				<div className="col-span-2 bg-red-200x p-4 border rounded-lg">
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
							<Label htmlFor="role" className="mb-2 block">
								Role
							</Label>
							<Input name="role" value={user.data.role} readOnly />
						</div>
						<div>
							<Label htmlFor="address" className="mb-2 block">
								Alamat
							</Label>
							<Input name="address" value={user.data.address ?? ''} readOnly />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<Container title="Profile">
			{content}

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
		</Container>
	);
};

export default Profile;
