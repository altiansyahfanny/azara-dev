export type PaginationType = {
	currentPage: number;
	totalData: number;
	totalPage: number;
};

export type ParamsType<T> = {
	page: number;
	limit: number;
	filter?: Record<keyof T, string | number | undefined>;
	// sort?: object;
};

export type ErrorResponseType = {
	status: string;
	message: string;
};

export type ApiResponseType<T = any> = {
	status: string;
	message: string;
	data: T;
};
