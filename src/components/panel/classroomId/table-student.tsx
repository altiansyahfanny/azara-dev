import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { User } from '@/types/user.type';
import React from 'react';

interface TableStudentProps {
	students: Pick<User, 'firstName' | 'lastName'>[];
}

const TableStudent: React.FC<TableStudentProps> = ({ students }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nama Depan</TableHead>
					<TableHead>Nama Belakang</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{students.map((user, key) => {
					return (
						<TableRow key={key}>
							<TableCell
								onDoubleClick={() => {
									console.log('id : ', user.firstName);
								}}
								className="font-medium"
							>
								{user.firstName}
							</TableCell>
							<TableCell className="font-medium">{user.lastName}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default TableStudent;
