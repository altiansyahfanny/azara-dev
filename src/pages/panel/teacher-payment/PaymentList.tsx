import Container from '@/components/core/container';
import TableBrowse from '@/components/panel/payment/paymentList/table-browse';
import useTitle from '@/hooks/useTitle';

const PaymentList = () => {
	useTitle('Daftar Pembayaran');

	return (
		<Container title="Daftar Pembayaran">
			<TableBrowse />
		</Container>
	);
};

export default PaymentList;
