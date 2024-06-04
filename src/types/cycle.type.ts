import { PaginationType } from './api.type';

export type CycleType = {
	id: number;
	startDate: string;
	endDate: string;
	description: string;
};

export type CycleFilterType = {
	startDate: string;
	endDate: string;
	description: string;
};

export type CyclesResponseType = {
	pagination: PaginationType;
	cycles: CycleType[];
};
