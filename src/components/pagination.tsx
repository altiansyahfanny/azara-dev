import React from 'react';

import {
	Pagination as PaginationShad,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export interface PaginationProps {
	totalItems: number;
	itemsPerPage: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps & React.ComponentProps<'nav'>> = ({
	totalItems,
	itemsPerPage,
	currentPage,
	onPageChange,
	onPageSizeChange,
	...props
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const getPageNumbers = () => {
		if (totalPages <= 5) {
			return [...Array(totalPages).keys()].map((num) => num + 1);
		}

		if (currentPage <= 3) {
			return [1, 2, 3, 4, 5, '...'];
		} else if (currentPage >= totalPages - 2) {
			return ['...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
		} else {
			return [
				'...',
				currentPage - 2,
				currentPage - 1,
				currentPage,
				currentPage + 1,
				currentPage + 2,
				'...',
			];
		}
	};

	return (
		<PaginationShad {...props}>
			<PaginationContent>
				{/* <PaginationItem>
					<PaginationLink
						// href="#"
						onClick={() => onPageChange(1)}
						disabled={currentPage === 1}
					>
						First
					</PaginationLink>
				</PaginationItem> */}
				<PaginationItem>
					<PaginationPrevious
						// href="#"
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
					/>
				</PaginationItem>

				{getPageNumbers().map((number, index) => (
					<PaginationItem key={index}>
						{number === '...' ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								// href="#"
								isActive={number === currentPage}
								onClick={() => onPageChange(Number(number))}
								// disabled={true}
							>
								{number}
							</PaginationLink>
						)}
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						// href="#"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					/>
				</PaginationItem>

				{/* <PaginationItem>
					<PaginationLink
						// href="#"
						onClick={() => onPageChange(totalPages)}
						disabled={currentPage === totalPages}
					>
						Last
					</PaginationLink>
				</PaginationItem> */}
			</PaginationContent>

			<div className="w-32">
				<Select
					onValueChange={(value) => onPageSizeChange(Number(value))}
					value={itemsPerPage.toString()}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{/* <SelectItem value={'2'}>2 / page</SelectItem>
						<SelectItem value={'4'}>4 / page</SelectItem> */}
						<SelectItem value={'10'}>10 / page</SelectItem>
						<SelectItem value={'25'}>20 / page</SelectItem>
						<SelectItem value={'50'}>50 / page</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</PaginationShad>
	);
};

export default Pagination;
