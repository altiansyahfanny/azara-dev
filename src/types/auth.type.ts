export type DecodedTokenType = {
	address: string;
	email: string;
	exp: number;
	firstName: string;
	iat: number;
	id: number;
	imageUrl: string;
	iss: string;
	lastName: string;
	role: string;
};

export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = {
	token: string;
	refreshToken: string;
};

export type RefreshTokenResponseType = {
	token: string;
	refreshToken: string;
};
