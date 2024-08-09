
import { useChangePasswordMutation } from '@/api/userApi';
import FormLib from '@/components/form-lib';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { catchFunc } from '@/helpers/app-helper';
import { updateUserPasswordSchema } from '@/schema/user';
import { setModalState } from '@/store/features/userSlice';
import { useAppDispatch } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const UpdatePassword = () => {

    const dispatch = useAppDispatch()

    const [update,{isLoading}] = useChangePasswordMutation()

    const form = useForm<z.infer<typeof updateUserPasswordSchema>>({
		resolver: zodResolver(updateUserPasswordSchema),
		mode: 'onChange',
        defaultValues:{
            newPassword: '',
            oldPassword: ''
        }
	});

    const onSubmit = async (payload: z.infer<typeof updateUserPasswordSchema>) => {
		try {
			console.log('UpdatePassword -> payload : ', payload);

			// return;

			const result = await update(payload).unwrap();

			console.log('UpdatePassword -> onFinish -> success : ', result.message);

			dispatch(setModalState({ value: { modalChangePassword: false } }));
			toast.success(result.message);
		} catch (err) {
			catchFunc(err)
		}
	};
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormLib form={form} name="oldPassword" label="Kata Sandi Lama" type='password' />
            <FormLib form={form} name="newPassword" label="Kata Sandi Baru" type='password' />
            
            <div className="flex gap-2 items-center justify-end">
                <Button type="submit" disabled={isLoading}>
                    Simpan
                </Button>
            </div>
        </form>
    </Form>
  )
}

export default UpdatePassword