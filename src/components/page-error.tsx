import { Ban } from 'lucide-react';

const PageError = () => {
	return (
		<div className="flex items-center justify-center flex-col p-8 bg-red-400x h-full">
			<Ban className="w-20 h-20" />
			<p className="text-lg font-semibold mt-4">Terjadi Kesalahan!</p>
		</div>
	);
};

export default PageError;
