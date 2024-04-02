import { Reducer } from "redux";
import { ChatActionTypes, ChatActions } from "../actions/chat.actions";
import { User } from "./user.reducer";
import { DateTime } from "luxon";

export interface Message {
	id: string;
	text: string;
	timestamp: string;
	user: User;
	image?: string;
}

export type ChatState = Message[];

const initialState: ChatState = [];

export const messages: Reducer<ChatState, ChatActions> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case ChatActionTypes.SET_MESSAGES:
			return action.payload;
		case ChatActionTypes.SET_MESSAGE:
			const sendMessagePayload = action.payload;

			return [...state, sendMessagePayload];
		case ChatActionTypes.DELETE_MESSAGE:
			const deleteMessagePayload = action.payload;

			return state.filter((message) => message.id !== deleteMessagePayload.id);
		default:
			return state;
	}
};

export default messages;
