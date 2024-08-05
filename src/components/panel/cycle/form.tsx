import FormLib from '@/components/form-lib';
import { updateCycleSchema } from '@/schema/cycle';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type FormProps = {
	form: UseFormReturn<z.infer<typeof updateCycleSchema>, any, undefined>;
};

const FormCycle = ({ form }: FormProps) => {
	return (
		<>
			<FormLib
				form={form}
				name="startDate"
				label="Tanggal Awal"
				type="date"
				disabledCalendar={(date) => date < new Date()}
			/>
			<FormLib
				form={form}
				name="endDate"
				label="Tanggal Akhir"
				type="date"
				disabled={!form.getValues('startDate')}
				disabledCalendar={(date) => date < form.getValues('startDate')}
			/>
			<FormLib form={form} name="description" label="Keterangan" />
		</>
	);
};

export default FormCycle;
