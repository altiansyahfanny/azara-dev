import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { SelectSingleEventHandler } from 'react-day-picker';

interface InputDateProps {
	value: Date | undefined;
	onSelect: SelectSingleEventHandler | undefined;
}

const InputDate: React.FC<InputDateProps> = ({ value, onSelect }) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn('pl-3 text-left font-normal w-full', !value && 'text-muted-foreground')}
				>
					{value ? format(value, 'yyyy-LL-dd') : <span>Pilih Tanggal</span>}
					<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={value}
					onSelect={onSelect}
					// disabled={(date: Date) => date < new Date()}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};

export default InputDate;
