type SignUpRequest = {
	email: string;
	password: string;
	confirmPassword: string;
};

type SignInRequest = {
	email: string;
	password: string;
};

export type { SignUpRequest, SignInRequest };
