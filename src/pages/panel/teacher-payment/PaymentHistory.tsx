import Container from '@/components/core/container';
import TableBrowse from '@/components/panel/payment/paymentHistory/table-browse';
import useTitle from '@/hooks/useTitle';

const PaymentHistory = () => {
	useTitle('Riwayat Pembayaran');

	return (
		<Container title="Riwayat Pembayaran">
			<TableBrowse />
		</Container>
	);
};

export default PaymentHistory;
