import { User } from "../reducers/user.reducer";

export enum ActionTypes {
	SET_USERS = "SET_USERS",
}

export interface SetUsersAction {
	type: ActionTypes.SET_USERS;
	payload: User[];
}

export type UsersActions = SetUsersAction;

export const setUsers = (users: User[]) => {
	return {
		type: ActionTypes.SET_USERS,
		payload: users,
	};
};
