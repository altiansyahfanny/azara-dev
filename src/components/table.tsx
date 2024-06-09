import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Table as TableShadcn,
} from '@/components/ui/table';
import { TableProps as TablePropsAntd } from '@/lib/antd';
import { cn } from '@/lib/utils';
import { FolderOpen, Search } from 'lucide-react';
import React, { useState } from 'react';
import Pagination, { PaginationProps } from './pagination';

type Action = {
	onClick?: () => void;
	Icon: React.ElementType;
	text: string;
};

export type TableProps<T> = {
	dataSource: readonly T[] | undefined;
	columns: TablePropsAntd<T>['columns'];
	actions?: Action[];
	pagination?: PaginationProps;
};

const Table = <T,>({ dataSource, columns, actions, pagination }: TableProps<T>) => {
	const [popover, setPopover] = useState<{ [key: string]: boolean }>({});

	const onConfirm = (columnKey: string) => {
		setPopover((prev) => ({ ...prev, [columnKey]: false }));
	};

	const filterDropdownParams = (columnKey: string) => ({
		confirm: () => onConfirm(columnKey),
	});

	const tHead = columns?.map((column, key) => (
		<TableHead key={key} className={`border`} style={{ width: column.width }}>
			<div className="flex justify-between items-center">
				<span className="flex-1" style={{ textAlign: column.textAlign ?? 'left' }}>
					{column.title}
				</span>
				{column.filterDropdown && (
					<Popover
						open={popover[column.dataIndex]}
						onOpenChange={(isOpen) =>
							setPopover((prev) => ({ ...prev, [column.dataIndex]: isOpen }))
						}
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
				)}
			</div>
		</TableHead>
	));

	const tBody = (
		<TableBody>
			{dataSource?.length ? (
				dataSource?.map((data: any, key: any) => {
					return (
						<TableRow key={key} className="">
							{columns?.map((column) => {
								if (column.type === 'action') {
									return (
										<TableCell
											className="border"
											key={column.key}
											style={{ textAlign: column.textAlign ?? 'left' }}
										>
											<div className="flex items-start gap-1 justify-center">
												{column.render(data)}
											</div>
										</TableCell>
									);
								} else {
									return (
										<TableCell className="border" key={column.key}>
											{column.render(data[column.dataIndex])}
										</TableCell>
									);
								}
							})}
						</TableRow>
					);
				})
			) : (
				<TableRow>
					<TableCell colSpan={4} className="border">
						<div className="flex items-center justify-center flex-col p-8 text-muted-foreground">
							<FolderOpen className="w-16 h-16" />
							<p className="mt-3">Data Kosong</p>
						</div>
					</TableCell>
				</TableRow>
			)}
		</TableBody>
	);

	return (
		<div className="grid gap-4">
			{actions && (
				<div className="flex mb-4">
					<div className="ml-auto flex items-center gap-2">
						{actions.map((props, key) => (
							<TableAction key={key} {...props} />
						))}
					</div>
				</div>
			)}
			<TableShadcn>
				<TableHeader>
					<TableRow>{tHead}</TableRow>
				</TableHeader>
				{tBody}
			</TableShadcn>

			{pagination && (
				<Pagination
					totalItems={pagination.itemsPerPage}
					itemsPerPage={pagination.itemsPerPage}
					currentPage={pagination.currentPage}
					onPageChange={pagination.onPageChange}
					onPageSizeChange={pagination.onPageSizeChange}
				/>
			)}
		</div>
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

const ButtonAction = ({ Icon, onClick }: { onClick?: () => void; Icon: React.ElementType }) => {
	return (
		<Button type="button" className="h-fit w-fit p-1" onClick={onClick}>
			<Icon className="h-5 w-5" />
		</Button>
	);
};

const TableAction = ({
	Icon,
	onClick,
	text,
}: {
	onClick?: () => void;
	Icon: React.ElementType;
	text: string;
}) => {
	return (
		<Button size="sm" className="h-7 gap-1" onClick={onClick}>
			<Icon className="h-3.5 w-3.5" />
			<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">{text}</span>
		</Button>
	);
};

Table.ButtonFilter = ButtonFilter;
Table.ButtonAction = ButtonAction;
Table.TableAction = TableAction;

export default Table;
