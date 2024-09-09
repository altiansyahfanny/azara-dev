import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import MonthPicker from '@/components/ui/month-picker';
import { setFilterState, setModalState } from '@/store/features/studentPaymentListSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { useState } from 'react';

const FilterPaymentDate = () => {
	const dispatch = useAppDispatch();
	const { filterState } = useAppSelector((state) => state.studentPaymentList);

	const [initialState, setInitialState] = useState({
		startFrom: filterState.startFrom,
		endTo: filterState.endTo,
	});

	// Fungsi untuk mendapatkan tanggal awal dan akhir bulan
	function getStartAndEndOfMonth(date: Date): { startFrom: string; endTo: string } {
		const start = startOfMonth(date);
		const end = endOfMonth(date);

		return {
			startFrom: format(start, 'yyyy-MM-dd'),
			endTo: format(end, 'yyyy-MM-dd'),
		};
	}

	const handleFilter = () => {
		dispatch(setFilterState({ value: { ...filterState, ...initialState } }));
		dispatch(setModalState({ value: { modalFilter: false } }));
	};

	const handleReset = () => {
		const value = getStartAndEndOfMonth(new Date());
		setInitialState(value);
		dispatch(setFilterState({ value: { ...filterState, ...value } }));
		dispatch(setModalState({ value: { modalFilter: false } }));
	};

	return (
		<div>
			<Label className="mb-2">Pilih Bulan</Label>
			<MonthPicker
				value={initialState.startFrom ? new Date(initialState.startFrom) : undefined}
				currentMonth={new Date()}
				onMonthChange={(date) => {
					const value = getStartAndEndOfMonth(date);

					setInitialState(value);
				}}
			/>
			<div className="flex gap-2 items-center justify-end mt-4">
				<Button onClick={handleReset} variant={'outline'}>
					Reset
				</Button>
				<Button onClick={handleFilter}>Filter</Button>
			</div>
		</div>
	);
};

export default FilterPaymentDate;
