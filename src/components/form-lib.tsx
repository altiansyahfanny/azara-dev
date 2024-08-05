import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputNumber } from '@/components/ui/input-number';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';

type FormLibProps<T extends FieldValues> = {
	form: UseFormReturn<T, any, undefined>;
	name: Path<T>;
	label: string;
	type?: 'text' | 'number' | 'select' | 'date' | 'password';
	options?: React.ReactNode;
	disabled?: boolean;
	disabledCalendar?: (date: Date) => boolean;
	// calendar?: React.ReactNode;
};

type FormLibInputProps<T extends FieldValues> = FormLibProps<T> & {};

const FormLib = <T extends FieldValues>({
	form,
	label,
	name,
	type = 'text',
	options,
	disabled = false,
	// calendar,
	disabledCalendar,
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

		case 'date':
			return (
				<FormField
					control={form.control}
					name={name}
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>{label}</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
											disabled={disabled}
										>
											{field.value ? format(field.value, 'dd-LL-yyyy') : <span>Pilih Tanggal</span>}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									{/* {calendar} */}
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										// disabled={(date: Date) => date < new Date()}
										disabled={disabledCalendar}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
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
