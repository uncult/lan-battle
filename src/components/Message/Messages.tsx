import { useSelector } from "react-redux";
import { getChat } from "../../selectors/chat.selectors";
import { DateTime } from "luxon";
import {
	MessageContainer,
	Message,
	Timestamp,
	Wrapper,
	Name,
	Image,
	Overlay,
	OverlayImage,
} from "./Messages.styled";
import { getUser } from "../../selectors/user.selectors";
import { useEffect, useRef, useState } from "react";

export const Messages = () => {
	const user = useSelector(getUser);
	const messages = useSelector(getChat);

	const [openOverlay, setOpenOverlay] = useState(false);
	const [currentImage, setCurrentImage] = useState("");

	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const getDateString = (timestamp: string) => {
		const rawDate = DateTime.fromISO(timestamp, { zone: "utc" }).toLocal();
		const date = rawDate.toLocaleString(DateTime.DATE_SHORT);
		const time = rawDate.toLocaleString(DateTime.TIME_SIMPLE);

		return { date, time };
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleClick = (image: string) => () => {
		setCurrentImage(image);
		setOpenOverlay(true);
	};

	const handleClose = () => {
		setOpenOverlay(false);
	};

	return (
		<Wrapper>
			{messages.map(
				({ user: { name, id, color }, text, timestamp, image }, index) => (
					<MessageContainer
						key={index}
						color={id === user?.id ? "primary" : "secondary"}
						ref={index === messages.length - 1 ? messagesEndRef : null}
					>
						<Message>
							<Name color={color}>{name}</Name>
							{image ? (
								<Image src={image} onClick={handleClick(image)} />
							) : (
								<div>{text}</div>
							)}
						</Message>
						<Timestamp>{getDateString(timestamp).time}</Timestamp>
					</MessageContainer>
				)
			)}
			{openOverlay && (
				<Overlay onClick={handleClose}>
					<OverlayImage src={currentImage} />
				</Overlay>
			)}
		</Wrapper>
	);
};

export default Messages;
