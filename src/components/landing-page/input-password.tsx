import * as React from 'react';

import { cn } from '@/lib/utils';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [type, setType] = React.useState('password');
		return (
			<div className="relative">
				<input
					type={type}
					className={cn(
						'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
						className
					)}
					ref={ref}
					{...props}
				/>

				<button
					type="button"
					className="absolute right-4 top-3"
					onClick={() => {
						if (type === 'password') {
							setType('text');
						} else {
							setType('password');
						}
					}}
				>
					{type === 'password' ? <BsEyeSlash /> : <BsEye />}
				</button>
			</div>
		);
	}
);
InputPassword.displayName = 'Input';

export { InputPassword };
