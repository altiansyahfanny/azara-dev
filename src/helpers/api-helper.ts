import { Query } from '@/types/api.type';

export const convertToQueryString = <T>(params: Query<T>): string => {
	const queryString = Object.entries(params)
		.map(([key, value]) => {
			if (typeof value === 'object') {
				return Object.entries(value)
					.filter(([_subKey, subValue]) => subValue !== null && subValue !== '')
					.map(([subKey, subValue]) => `${subKey}=${subValue}`)
					.join('&');
			}
			return value !== null ? `${key}=${value}` : '';
		})
		.filter((queryPart) => queryPart !== '')
		.join('&');

	return queryString;
};
