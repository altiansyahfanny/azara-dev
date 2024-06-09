import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { useMaskito } from '@maskito/react';
import * as React from 'react';
import { Input } from './input';

export interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(({ ...props }, _ref) => {
	const options = maskitoNumberOptionsGenerator({
		decimalSeparator: ',',
		thousandSeparator: '.',
		precision: 2,
	});

	const inputRef = useMaskito({ options });

	return <Input ref={inputRef} {...props} />;
});
InputNumber.displayName = 'InputNumber';

export { InputNumber };
