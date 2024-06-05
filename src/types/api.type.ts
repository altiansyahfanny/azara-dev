export type Pagination = {
	currentPage: number;
	totalData: number;
	totalPage: number;
};

export type QueryParam<T> = {
	page: number;
	limit: number;
	filter?: Record<keyof T, string | number | undefined>;
	// sort?: object;
};

export type ErrorResponse = {
	status: string;
	message: string;
};

export type ApiResponse<T = any> = {
	status: string;
	message: string;
	data: T;
};
