export const formatNumber = (numbers: number) => {
	const options = {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	};
	return new Intl.NumberFormat('id-ID', options).format(numbers);
};
