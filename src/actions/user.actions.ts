import { User } from "../reducers/user.reducer";

export enum UserActionTypes {
	LOGIN_USER = "LOGIN_USER",
	LOGOUT_USER = "LOGOUT_USER",
}

export interface LoginUserAction {
	type: UserActionTypes.LOGIN_USER;
	payload: User;
}

export interface LogoutUserAction {
	type: UserActionTypes.LOGOUT_USER;
}

export type UserActions = LoginUserAction | LogoutUserAction;

export const loginUserAction = ({ id, name, color }: User) => {
	return {
		type: UserActionTypes.LOGIN_USER,
		payload: { id, name, color },
	};
};

export const logoutUserAction = () => {
	return {
		type: UserActionTypes.LOGOUT_USER,
	};
};
