import { combineReducers, Reducer, Action } from "redux";
import { messages, ChatState } from "./chat.reducer";
import { User, user, UserState } from "./user.reducer";
import { users } from "./users.reducer";

export interface RootState {
	messages: ChatState;
	user: UserState;
	users: User[];
}

export const reducers: Reducer<any, Action<any>> = combineReducers({
	messages,
	user,
	users,
});

export default reducers;
