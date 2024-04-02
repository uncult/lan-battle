import { useContext, useEffect, useState } from "react";

import { SocketContext } from "../../utils/context/SocketProvider";
import { useDispatch, useSelector } from "react-redux";
import {
	setMessageAction,
	setMessagesAction,
} from "../../actions/chat.actions";
import { getUser } from "../../selectors/user.selectors";
import Messages from "../Message/Messages";
import {
	ChatContainer,
	LeftSection,
	MainSection,
	Wrapper,
} from "./Main.styled";

import UserList from "../UserList/UserList";
import { setUsers } from "../../actions/users.actions";
import usePageVisibility from "../../utils/usePageVisibility";
import soundFile from "../../sound/ohoh.mp3";

import Player from "../Player/Player";
import History from "../History/History";
import ChatInput from "./Input";

export const Main = () => {
	const socket = useContext(SocketContext);

	const [newMessages, setNewMessages] = useState(0);

	const originalTitle = "Chat App";
	const blinkTitle = `${newMessages} new messages!`;

	const isVisible = usePageVisibility();

	const dispatch = useDispatch();
	const user = useSelector(getUser);

	useEffect(() => {
		socket?.on("message", (data) => {
			if (!isVisible) {
				setNewMessages(newMessages + 1);
			}

			dispatch(setMessageAction(data));
		});

		return () => {
			socket?.off("message");
		};
	}, [socket, newMessages, isVisible]);

	useEffect(() => {
		if (user) {
			socket?.emit("join", user);
		}

		socket?.on("messages", (data) => {
			dispatch(setMessagesAction(data));
		});

		socket?.on("users", (users) => {
			dispatch(setUsers(users));
		});

		return () => {
			socket?.emit("leave", user);
			socket?.off("messages");
			socket?.off("users");
		};
	}, [socket, user]);

	useEffect(() => {
		const audio = new Audio(soundFile);

		if (!isVisible && newMessages > 0) {
			audio.play();

			const interval = setInterval(() => {
				document.title =
					document.title === originalTitle ? blinkTitle : originalTitle;
			}, 1000);

			return () => {
				clearInterval(interval);
				document.title = originalTitle;
			};
		}

		if (isVisible) {
			setNewMessages(0);
		}
	}, [isVisible, newMessages, originalTitle]);

	if (!user) {
		return null;
	}

	return (
		<Wrapper>
			<LeftSection>
				<UserList />
				<History />
			</LeftSection>
			<MainSection>
				<Player />
			</MainSection>
			<ChatContainer>
				<Messages />
				<ChatInput />
			</ChatContainer>
		</Wrapper>
	);
};

export default Main;
