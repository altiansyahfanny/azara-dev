import React, { useState } from 'react';
import { TableColumnType, TableColumnsType } from '@/lib/antd';
import { Input } from '@/components/ui/input';
import MyTable from './my-table';
import { InputNumber } from '@/components/ui/input-number';
import { format } from 'date-fns';
import InputDate from '@/components/ui/input-date';

interface DataType {
	key: string;
	name: string;
	age: number;
	address: string;
	dateBorn: Date;
}

interface FilterType {
	name?: string;
	age?: string;
	address?: string;
	dateBorn?: Date;
}

type DataIndex = keyof FilterType;

const data: DataType[] = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		dateBorn: new Date(),
	},
	{
		key: '2',
		name: 'Joe Black',
		age: 42,
		address: 'London No. 1 Lake Park',
		dateBorn: new Date(),
	},
	{
		key: '3',
		name: 'Jim Green',
		age: 32,
		address: 'Sydney No. 1 Lake Park',
		dateBorn: new Date(),
	},
	{
		key: '4',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
		dateBorn: new Date(),
	},
];

const CustomTable: React.FC = () => {
	const initialFilter = {
		name: '',
		age: '',
		address: '',
	};
	const [filter, setFilter] = useState<FilterType>(initialFilter);

	const handleSearch = () => {
		console.log('filter : ', filter);
	};

	const handleReset = (dataIndex: keyof FilterType) => {
		setFilter((prev) => ({ ...prev, [dataIndex]: '' }));
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
	};

	const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
		filterDropdown: ({ confirm }) => {
			const onSearch = () => {
				handleSearch();
				confirm();
			};

			const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
				if (e.key === 'Enter') onSearch();
			};

			let content;
			if (dataIndex === 'age') {
				content = (
					<InputNumber
						name={dataIndex}
						onInput={(e) => setFilter((prev) => ({ ...prev!, [dataIndex]: e.currentTarget.value }))}
						value={filter && filter[dataIndex]}
						onKeyDown={onKeyDown}
					/>
				);
			} else if (dataIndex === 'dateBorn') {
				const value = filter && filter[dataIndex];

				content = (
					<div className="w-52">
						<InputDate
							value={value}
							onSelect={(value) => {
								setFilter((prev) => ({ ...prev!, dateBorn: value as Date }));
							}}
						/>
					</div>
				);
			} else {
				content = (
					<Input
						name={dataIndex}
						onChange={onChange}
						value={filter && filter[dataIndex]}
						onKeyDown={onKeyDown}
					/>
				);
			}

			return (
				<div className="flex flex-col gap-2">
					<div onKeyDown={(e) => e.stopPropagation()}>{content}</div>
					<div className="flex items-center gap-2">
						<MyTable.ButtonFilter
							type="search"
							onClick={() => {
								onSearch();
							}}
						/>
						<MyTable.ButtonFilter
							type="reset"
							onClick={() => {
								handleReset(dataIndex);
								confirm();
							}}
						/>
					</div>
				</div>
			);
		},
		render: (text: any) => {
			if (dataIndex === 'dateBorn') {
				return format(text, 'dd-LL-yyyy');
			} else {
				return text;
			}
		},
	});

	const columns: TableColumnsType<DataType> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: '30%',
			...getColumnSearchProps('name'),
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
			width: '20%',
			...getColumnSearchProps('age'),
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			...getColumnSearchProps('address'),
		},
		{
			title: 'Date Born',
			dataIndex: 'dateBorn',
			key: 'dateBorn',
			...getColumnSearchProps('dateBorn'),
		},
	];

	return <MyTable columns={columns} dataSource={data} />;
};

export default CustomTable;
