import { useChangeImageMutation } from '@/api/userApi';
import { Button } from '@/components/ui/button';
import { setModalState } from '@/store/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ApiResponse, ErrorResponse } from '@/types/api.type';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const UpdatePicture = () => {
	const dispatch = useAppDispatch();
	const { dataPictureState } = useAppSelector((state) => state.user);

	const [file, setFile] = useState<File | null>(null);

	const fileRef = useRef<HTMLInputElement>(null);

	const focusFile = () => {
		if (fileRef.current) {
			fileRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			// Process the selected files
			const file = files[0];
			console.log('Selected file:', files[0]);
			setFile(file);
		}
	};

	const [changeImage, { isLoading }] = useChangeImageMutation();

	const onSubmit = async () => {
		try {
			const formData = new FormData();
			formData.append('image', file as Blob);

			for (var pair of formData.entries()) {
				console.log(pair[0] + ', ' + pair[1]);
			}

			const result = await changeImage(formData).unwrap();
			dispatch(setModalState({ value: { modalUpdatePicture: false } }));
			console.log('UpdateImage -> onFinish -> success : ', result.message);
			toast.success(result.message);
		} catch (err) {
			const error = err as ApiResponse<ErrorResponse>;
			console.log('UpdateImage -> onFinish -> error : ', error.data.message);
			toast.error(error.data.message);
		}
	};

	const cantUpload = !file || isLoading;

	return (
		<div>
			<div className="grid place-content-center">
				<img
					src={file ? URL.createObjectURL(file) : dataPictureState}
					className="w-48 rounded-full aspect-square object-center object-cover cursor-pointer"
				/>
				<input
					type="file"
					ref={fileRef}
					className="hidden"
					accept="image/jpeg, image/png, image/jpg"
					onChange={handleFileChange}
				/>
				<div className="flex justify-center mt-4">
					<Button onClick={focusFile}>Pilih Foto</Button>
				</div>
			</div>
			<hr className="my-4" />
			<div className="flex justify-end mt-4">
				<Button onClick={onSubmit} disabled={cantUpload}>
					Simpan
				</Button>
			</div>
		</div>
	);
};

export default UpdatePicture;
