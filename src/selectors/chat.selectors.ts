import { RootState } from "../reducers/reducers";

export const getChat = (state: RootState) => state.messages;
