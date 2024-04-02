import { Reducer } from "redux";
import { UserActionTypes, UserActions } from "../actions/user.actions";

export interface User {
	id: string;
	name: string;
	color: string;
}

export type UserState = User | null;

export const user: Reducer<UserState, UserActions> = (state = null, action) => {
	switch (action.type) {
		case UserActionTypes.LOGIN_USER:
			return action.payload;
		case UserActionTypes.LOGOUT_USER:
			return null;
		default:
			return state;
	}
};

export default user;
