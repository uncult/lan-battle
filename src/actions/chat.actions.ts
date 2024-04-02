// chat.actions.ts

import { Message } from "../reducers/chat.reducer";

export enum ChatActionTypes {
	SET_MESSAGE = "SET_MESSAGE",
	DELETE_MESSAGE = "DELETE_MESSAGE",
	SET_MESSAGES = "SET_MESSAGES",
}

interface SetMessageAction {
	type: ChatActionTypes.SET_MESSAGE;
	payload: Message;
}

interface SetMessagesAction {
	type: ChatActionTypes.SET_MESSAGES;
	payload: Message[];
}

type DeleteMessageAction = {
	type: ChatActionTypes.DELETE_MESSAGE;
	payload: { id: string };
};

export type ChatActions =
	| SetMessageAction
	| DeleteMessageAction
	| SetMessagesAction;

export const setMessageAction = (payload: SetMessageAction["payload"]) => ({
	type: ChatActionTypes.SET_MESSAGE,
	payload,
});

export const setMessagesAction = (payload: SetMessagesAction["payload"]) => ({
	type: ChatActionTypes.SET_MESSAGES,
	payload,
});

export const deleteMessageAction = (
	payload: DeleteMessageAction["payload"]
) => ({
	type: ChatActionTypes.DELETE_MESSAGE,
	payload,
});
