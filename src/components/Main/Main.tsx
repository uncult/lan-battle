import React, { useCallback, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SocketContext } from "../../utils/context/SocketProvider";
import { useDispatch, useSelector } from "react-redux";
import {
	setMessageAction,
	setMessagesAction,
} from "../../actions/chat.actions";
import { getUser } from "../../selectors/user.selectors";
import { DateTime } from "luxon";
import Messages from "../Message/Messages";
import {
	ChatContainer,
	ChatInputContainer,
	ChatInputField,
	LeftSection,
	MainSection,
	Wrapper,
} from "./Main.styled";
import { debounce } from "lodash";
import UserList from "../UserList/UserList";
import { setUsers } from "../../actions/users.actions";
import usePageVisibility from "../../utils/usePageVisibility";
import soundFile from "../../sound/ohoh.mp3";
import { extractTimeFrom, handlePaste } from "./Main.utils";
import Player from "../Player/Player";
import History from "../History/History";

export const Main = () => {
	const socket = useContext(SocketContext);
	const [typing, setTyping] = useState(false);
	const [inputText, setInputText] = useState<string>("");
	const [newMessages, setNewMessages] = useState(0);

	const originalTitle = "Chat App";
	const blinkTitle = `${newMessages} new messages!`;

	const isVisible = usePageVisibility();

	const dispatch = useDispatch();
	const user = useSelector(getUser);

	const onClientClick = () => {
		const command = inputText.slice(1);
		const commandArgs = command.split(" ");

		switch (commandArgs?.[0]) {
			case "pause":
			case "unmute":
			case "mute":
			case "stop":
			case "play":
				const url = commandArgs?.[1];
				const startFrom = extractTimeFrom(url) ?? 0;

				socket?.emit("command", {
					command: commandArgs?.[0],
					url,
					startFrom,
				});
				break;
			default:
				socket?.emit("message", {
					id: uuidv4(),
					text: inputText,
					user,
					timestamp: DateTime.now().toUTC().toISO(),
				});
				break;
		}

		setInputText("");
	};

	const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onClientClick();
		}
	};

	const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputType = (e.nativeEvent as InputEvent).inputType;
		const allowedInputTypes =
			inputType === "insertText" || inputType === "deleteContentBackward";

		setInputText(e.target.value);

		if (allowedInputTypes && !typing) {
			socket?.emit("typing", { user, typing: true });
			setTyping(true);
		}

		debouncedStopTyping();
	};

	const debouncedStopTyping = useCallback(
		debounce(() => {
			socket?.emit("typing", { user, typing: false });
			setTyping(false);
		}, 1000),
		[socket]
	);

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
				<ChatInputContainer>
					<ChatInputField
						placeholder="Type your message..."
						onInput={setInput}
						onKeyDown={handleKey}
						value={inputText}
						autoFocus
						onPaste={(event: React.ClipboardEvent<HTMLInputElement>) =>
							handlePaste(event, socket, user)
						}
					/>
				</ChatInputContainer>
			</ChatContainer>
		</Wrapper>
	);
};

export default Main;
