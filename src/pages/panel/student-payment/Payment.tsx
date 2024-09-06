import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppSelector } from '@/store/store';
import PaymentList from './PaymentList';
import PaymentHistory from './PaymentHistory';

const StudentPayment = () => {
	const { defaultTab } = useAppSelector((state) => state.studentPayment);

	return (
		<Tabs defaultValue={defaultTab}>
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="list">Daftar Pembayaran</TabsTrigger>
					<TabsTrigger value="history">Riwayat Pembayaran</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="list">
				<PaymentList />
			</TabsContent>
			<TabsContent value="history">
				<PaymentHistory />
			</TabsContent>
		</Tabs>
	);
};

export default StudentPayment;
