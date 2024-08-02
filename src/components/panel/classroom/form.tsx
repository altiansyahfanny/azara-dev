import { useFetchCyclesQuery } from '@/api/cycleApi';
import FormLib from '@/components/form-lib';
import { SelectItem } from '@/components/ui/select';
import { createClassroomSchema } from '@/schema/classroom';
import { format, parseISO } from 'date-fns';
import { LoaderCircle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type FormProps = {
	form: UseFormReturn<z.infer<typeof createClassroomSchema>, any, undefined>;
};

const FormClassroom = ({ form }: FormProps) => {
	const {
		data: cycles,
		isLoading: isLoadingCycles,
		isSuccess: isSuccessCycles,
		isError: isErrorCycles,
	} = useFetchCyclesQuery();

	let cyclesContent: any;

	if (isLoadingCycles) {
		cyclesContent = (
			<div className="bg-red-500x min-h-20 grid place-content-center">
				<LoaderCircle className="animate-spin" />
			</div>
		);
	}

	if (isErrorCycles) {
		cyclesContent = (
			<div className="bg-red-500x min-h-20 grid place-content-center">
				<p className="text-sm">Tidak dapat memuat tahun pelajaran.</p>
			</div>
		);
	}

	if (isSuccessCycles) {
		cyclesContent = cycles?.data.cycles.map((cycle, key) => (
			<SelectItem key={key} value={cycle.id.toString()}>
				{`${format(parseISO(cycle.startDate), 'yyyy')}/${format(parseISO(cycle.endDate), 'yyyy')}`}
			</SelectItem>
		));
	}

	return (
		<>
			<FormLib form={form} name="classroomName" label="Nama Kelas" />
			<FormLib
				form={form}
				name="cycleId"
				label="Tahun Ajaran"
				type="select"
				options={cyclesContent}
			/>
			<FormLib form={form} name="price" label="Harga" type="number" />
		</>
	);
};

export default FormClassroom;
