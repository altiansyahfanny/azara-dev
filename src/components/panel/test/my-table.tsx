import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { TableProps } from '@/lib/antd';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useState } from 'react';

export type MyTableProps<T> = {
	dataSource: readonly T[] | undefined;
	columns: TableProps<T>['columns'];
};

const MyTable = <T extends {}>({ dataSource, columns }: MyTableProps<T>) => {
	const [popover, setPopover] = useState<{ [key: string]: boolean }>({});

	const onConfirm = (columnKey: string) => {
		setPopover((prev) => ({ ...prev, [columnKey]: false }));
	};

	const filterDropdownParams = (columnKey: string) => ({
		confirm: () => onConfirm(columnKey),
	});

	const tHead = columns?.map((column, key) => (
		<TableHead key={key}>
			<div className="flex justify-between items-center">
				<span>{column.title}</span>
				<Popover
					open={popover[column.dataIndex]}
					onOpenChange={(isOpen) => setPopover((prev) => ({ ...prev, [column.dataIndex]: isOpen }))}
				>
					<PopoverTrigger asChild>
						<button>
							<Search className="h-4 w-4" />
						</button>
					</PopoverTrigger>
					<PopoverContent className="w-fit" align="end">
						{column.filterDropdown(filterDropdownParams(column.dataIndex))}
					</PopoverContent>
				</Popover>
			</div>
		</TableHead>
	));

	const tBody = (
		<TableBody>
			{dataSource?.map((data: any, key: any) => {
				return (
					<TableRow key={key}>
						{columns?.map((column) => {
							return (
								<TableCell key={column.key} className="font-medium">
									{column.render(data[column.dataIndex])}
								</TableCell>
							);
						})}
					</TableRow>
				);
			})}
		</TableBody>
	);

	return (
		<Table>
			<TableHeader>
				<TableRow>{tHead}</TableRow>
			</TableHeader>
			{tBody}
		</Table>
	);
};

const ButtonFilter = ({ type, onClick }: { onClick: () => void; type: 'search' | 'reset' }) => {
	return (
		<Button
			size={'sm'}
			variant={type === 'search' ? 'default' : 'outline'}
			className={cn('h-7 gap-1 flex-1')}
			onClick={onClick}
		>
			{type === 'search' ? 'Cari' : 'Reset'}
		</Button>
	);
};

MyTable.ButtonFilter = ButtonFilter;

export default MyTable;
