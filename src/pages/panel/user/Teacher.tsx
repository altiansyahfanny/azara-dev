import Container from '@/components/core/container';
import TableBrowse from '@/components/panel/user/teacher/table-browse';
import useTitle from '@/hooks/useTitle';

const Teacher = () => {
	useTitle('Pengguna - Guru');

	return (
		<Container title="Guru">
			<TableBrowse />
		</Container>
	);
};

export default Teacher;
