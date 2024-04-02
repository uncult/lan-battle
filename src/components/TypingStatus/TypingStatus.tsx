import { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SocketContext } from "../../utils/context/SocketProvider";
import { TypingContainer } from "./TypingStatus.styled";
import { User } from "../../reducers/user.reducer";
import { getUser } from "../../selectors/user.selectors";
import { useSelector } from "react-redux";
import AnimatedText from "../AnimatedText/AnimatedText";

interface Typing {
	user: User;
	typing: boolean;
}

export const TypingStatus = ({ id }: { id: string }) => {
	const [typing, setTyping] = useState<Typing>({} as Typing);
	const socket = useContext(SocketContext);
	const user = useSelector(getUser);

	useEffect(() => {
		socket?.on("typing", (data) => {
			setTyping(data);
		});

		return () => {
			socket?.off("typing");
		};
	}, [socket]);

	return (
		<AnimatedText
			text={`${typing.user?.name} is typing...`}
			visible={
				typing.typing && typing.user?.id === id && typing.user.id !== user?.id
			}
		/>
	);
};

export default TypingStatus;
