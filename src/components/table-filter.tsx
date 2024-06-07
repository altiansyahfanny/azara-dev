import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './ui/button';
import { CalendarIcon, Search } from 'lucide-react';
import { PopoverContent } from './ui/popover';
import { Label } from './ui/label';
import { Input } from './ui/input';
import React, { useState } from 'react';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TableFilterProps {
	// data: []
}

const data = [
	{
		name: 'startDate',
		label: 'Tahun Mulai',
		type: 'date',
	},
	{
		name: 'description',
		label: 'Keterangan',
		type: 'text',
	},
];

type ValueTypes = {
	[key: string]: string | Date | null;
};

const TableFilter: React.FC<TableFilterProps> = ({}) => {
	const [values, setValues] = useState<ValueTypes>(
		data.reduce((acc, item) => {
			acc[item.name] = null;
			return acc;
		}, {} as ValueTypes)
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
		setValues({
			...values,
			[name]: e.target.value,
		});
	};

	const handleDateChange = (date: Date, name: string) => {
		setValues({
			...values,
			[name]: date,
		});
	};

	const onSubmit = () => {
		console.log('values: ', values);
	};

	return (
		<Popover modal={true}>
			<PopoverTrigger asChild>
				<Button size="sm" className="h-7 gap-1">
					<Search className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Pencarian</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80" side="bottom" align="end">
				<div className="grid gap-4 max-h-60 overflow-y-auto px-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Pencarian</h4>
					</div>
					<hr />
					<div className="grid gap-2">
						{data.map((item, key) => {
							if (item.type === 'date') {
								return (
									<div key={key} className="flex flex-col gap-2">
										<Label htmlFor={item.name}>{item.label}</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={'outline'}
													className={cn(
														'pl-3 text-left font-normal',
														!values[item.name] && 'text-muted-foreground'
													)}
												>
													{values[item.name] ? (
														format(values[item.name] as Date, 'dd-LL-yyyy')
													) : (
														<span>Pilih Tanggal</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start" side="left">
												<Calendar
													mode="single"
													selected={values[item.name] as Date}
													onSelect={(date) => handleDateChange(date as Date, item.name)}
													disabled={(date: Date) => date < new Date()}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>
								);
							} else {
								return (
									<div key={key} className="flex flex-col gap-2">
										<Label htmlFor={item.name}>{item.label}</Label>
										<Input
											id={item.name}
											value={values[item.name] !== null ? (values[item.name] as string) : ''}
											onChange={(e) => handleChange(e, item.name)}
											className="col-span-2 h-8"
										/>
									</div>
								);
							}
						})}
					</div>
					<div>
						<Button onClick={onSubmit}>Cari</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default TableFilter;
