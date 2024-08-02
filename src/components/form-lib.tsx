import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputNumber } from '@/components/ui/input-number';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type FormLibProps<T extends FieldValues> = {
	form: UseFormReturn<T, any, undefined>;
	name: Path<T>;
	label: string;
	type?: 'text' | 'number' | 'select' | 'date' | 'password';
	options?: React.ReactNode;
};

type FormLibInputProps<T extends FieldValues> = FormLibProps<T> & {};

const FormLib = <T extends FieldValues>({
	form,
	label,
	name,
	type = 'text',
	options,
}: FormLibInputProps<T>) => {
	switch (type) {
		case 'number':
			return (
				<FormField
					control={form.control}
					name={name}
					render={({ field }) => {
						const { onChange, ...props } = field;
						return (
							<FormItem>
								<FormLabel>{label}</FormLabel>
								<FormControl>
									<InputNumber onInput={(e) => onChange(e)} {...props} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
			);

		case 'select':
			return (
				<FormField
					control={form.control}
					name={name}
					render={({ field }) => (
						<FormItem>
							<FormLabel>{label}</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Pilih Tahun Ajaran" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>{options}</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			);

		default:
			return (
				<FormField
					control={form.control}
					name={name}
					render={({ field }) => (
						<FormItem>
							<FormLabel>{label}</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			);
	}
};

export default FormLib;
