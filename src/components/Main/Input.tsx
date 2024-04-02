import { useCallback, useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChatInputContainer, ChatInputField } from "./Main.styled";
import { debounce } from "lodash";
import { SocketContext } from "../../utils/context/SocketProvider";
import { extractTimeFrom, handlePaste } from "./Main.utils";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import { getUser } from "../../selectors/user.selectors";

interface InputState {
	history: string[];
	index: number;
}

export const ChatInput = () => {
	const socket = useContext(SocketContext);

	const [inputText, setInputText] = useState<string>("");
	const [typing, setTyping] = useState(false);

	const [inputState, setInputState] = useState<InputState>({
		history: [],
		index: -1,
	});

	const [showSuggestions, setShowSuggestions] = useState(false);
	const [suggestions, setSuggestions] = useState<string[]>([]);

	const commands = ["!play", "!pause", "!stop"];

	const user = useSelector(getUser);

	const inputRef = useRef<HTMLInputElement>(null);

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

	const debouncedStopTyping = useCallback(
		debounce(() => {
			socket?.emit("typing", { user, typing: false });
			setTyping(false);
		}, 1000),
		[socket]
	);

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

	const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case "ArrowUp":
				e.preventDefault(); // Prevent the default behavior
				const newIndex = Math.min(
					inputState.index + 1,
					inputState.history.length - 1
				);
				if (newIndex !== inputState.index) {
					const newInputText = inputState.history[newIndex];
					setInputText(newInputText);
					setInputState({ ...inputState, index: newIndex });
					setTimeout(() => {
						inputRef.current?.setSelectionRange(
							newInputText.length,
							newInputText.length
						);
					}, 0);
				}
				break;
			case "Enter":
				setInputState({
					history: [...inputState.history, inputText],
					index: -1,
				});
				onClientClick();
				break;
			default:
				break;
		}
	};

	if (!user) {
		return null;
	}

	return (
		<ChatInputContainer>
			<ChatInputField
				ref={inputRef}
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
	);
};

export default ChatInput;
