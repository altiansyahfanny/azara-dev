import Container from '@/components/core/container';
import useTitle from '@/hooks/useTitle';

export default function Dashboard() {
	useTitle('Dashboard');

	// throw new Error();

	return <Container title="Dashboard">Dashboard</Container>;
}
