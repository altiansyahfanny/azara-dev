import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ClassroomCourse } from '@/types/classroom.type';
import React from 'react';

interface TableTeacherAndCourseProps {
	courses: ClassroomCourse[];
}

const TableTeacherAndCourse: React.FC<TableTeacherAndCourseProps> = ({ courses }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Mata Pelajaran</TableHead>
					<TableHead>Keterangan</TableHead>
					<TableHead>Nama Guru</TableHead>
					<TableHead>Harga</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{courses.map((course, key) => {
					return (
						<TableRow key={key}>
							<TableCell className="font-medium">{course.courseName}</TableCell>
							<TableCell className="font-medium">{course.description}</TableCell>
							<TableCell className="font-medium">{`${course.teacher.firstName} ${course.teacher.lastName}`}</TableCell>
							<TableCell className="font-medium">{course.paymentPrice}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default TableTeacherAndCourse;
