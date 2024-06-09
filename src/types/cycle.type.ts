import { Pagination } from './api.type';

export type Cycle = {
	id: number;
	startDate: string;
	endDate: string;
	description: string;
};

export type CycleFilter = {
	startDate?: Date;
	endDate?: Date;
	description?: string;
};

export type CyclesResponse = {
	pagination: Pagination;
	cycles: Cycle[];
};
