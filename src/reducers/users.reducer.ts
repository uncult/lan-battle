import { Reducer } from "redux";
import { User } from "./user.reducer";
import { ActionTypes, UsersActions } from "../actions/users.actions";

// Define the initial state
const initialState: User[] = [];

// Define the reducer
export const users: Reducer<User[], UsersActions> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case ActionTypes.SET_USERS:
			return action.payload;

		default:
			return state;
	}
};

export default users;
