import { useGetClassroomQuery } from '@/api/classroomApi';
import Container from '@/components/core/container';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { formatNumber } from '@/helpers/app-helper';
import { setModalState } from '@/store/features/classroomIdSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Ban, FolderOpen, PlusCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ClassroomId = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { modalState } = useAppSelector((state) => state.classroomId);

	const { data: classroom, isLoading, isError, isSuccess } = useGetClassroomQuery(id as string);

	if (isError) {
		return (
			<div className="flex items-center justify-center flex-col p-8 bg-red-400x h-full">
				<Ban className="w-20 h-20" />
				<p className="text-lg font-semibold mt-4">Terjadi Kesalahan!</p>
			</div>
		);
	}

	let content;

	if (isLoading) {
		content = (
			<div className="flex items-center space-x-4">
				<Skeleton className="h-12 w-12 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[250px]" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
			</div>
		);
	}

	if (isSuccess) {
		let studentsContent;

		if (classroom.data.students.length < 1) {
			studentsContent = (
				<div className="flex items-center justify-center flex-col p-8">
					<FolderOpen className="w-20 h-20" />
					<p>Data Siswa Kosong</p>
				</div>
			);
		} else {
			studentsContent = (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nama Depan</TableHead>
							<TableHead>Nama Belakang</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{classroom.data.students.map((user, key) => {
							return (
								<TableRow key={key}>
									<TableCell className="font-medium">{user.firstName}</TableCell>
									<TableCell className="font-medium">{user.lastName}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			);
		}
		content = (
			<>
				<div className="mb-4">
					<div className="border rounded-lg p-4 flex items-center">
						<div>
							<h1 className="text-xl">{classroom.data.classroomName}</h1>
							<p className="text-sm text-gray-500">{classroom.data.cycleDescription}</p>
						</div>
						<p className="ml-auto text-lg text-black font-semibold">
							{formatNumber(classroom.data.price)}
						</p>
					</div>
				</div>

				<div className="border rounded-lg p-4">
					<div className="flex mb-4">
						<div className="ml-auto flex items-center gap-2">
							<Button
								size="sm"
								className="h-7 gap-1"
								onClick={() => onOpenChangeModalAssignCourse(true)}
							>
								<PlusCircle className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Mata Pelajaran</span>
							</Button>
							<Button
								size="sm"
								className="h-7 gap-1"
								onClick={() => onOpenChangeModalEnrollStudent(true)}
							>
								<PlusCircle className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Siswa</span>
							</Button>
						</div>
					</div>
					<div>{studentsContent}</div>
				</div>
			</>
		);
	}

	const onOpenChangeModalEnrollStudent = (value: boolean) => {
		dispatch(setModalState({ value: { modalEnrollStudent: value } }));
	};

	const onOpenChangeModalAssignCourse = (value: boolean) => {
		dispatch(setModalState({ value: { modalAssignCourse: value } }));
	};

	return (
		<>
			<Container title="Kelas">{content}</Container>
			<Dialog open={modalState.modalEnrollStudent} onOpenChange={onOpenChangeModalEnrollStudent}>
				<DialogContent>
					<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar">
						<DialogHeader>
							<DialogTitle>Menambahkan Siswa</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						{/* <CreateClassroom /> */}
					</div>
				</DialogContent>
			</Dialog>
			<Dialog open={modalState.modalAssignCourse} onOpenChange={onOpenChangeModalAssignCourse}>
				<DialogContent>
					<div className="max-h-96 bg-green-300x px-4 overflow-scroll no-scrollbar">
						<DialogHeader>
							<DialogTitle>Menambahkan Mata Pelajaran</DialogTitle>
						</DialogHeader>
						<hr className="my-4" />
						{/* <CreateClassroom /> */}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ClassroomId;
