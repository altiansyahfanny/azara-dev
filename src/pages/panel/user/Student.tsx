import Container from '@/components/core/container';
import TableBrowse from '@/components/panel/user/student/table-browse';
import useTitle from '@/hooks/useTitle';

const Student = () => {
	useTitle('Pengguna - Siswa');

	return (
		<Container title="Siswa">
			<TableBrowse />
		</Container>
	);
};

export default Student;
