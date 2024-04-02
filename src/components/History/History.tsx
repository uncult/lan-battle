import { useContext, useEffect, useState } from "react";
import { Link, Row, Wrapper } from "./Hystory.styled";
import { SocketContext } from "../../utils/context/SocketProvider";
import Tooltip from "../Tooltip/Tooltip";
import AnimatedText from "../AnimatedText/AnimatedText";

interface History {
	title: string;
	duration: string;
	url: string;
}

export const History = () => {
	const [history, setHistory] = useState<History[]>([]);
	const socket = useContext(SocketContext);

	useEffect(() => {
		const handleHistory = (history: History[]) => {
			setHistory(history);
		};

		socket?.on("history", handleHistory);

		return () => {
			socket?.off("history", handleHistory);
		};
	}, [socket]);

	const navigateTo = (url: string) => () => {
		window.open(url, "_blank", "noopener noreferrer");
	};

	return (
		<Wrapper>
			{history.map((video, index) => (
				<Tooltip text={video.url} key={index} position="bottom-start">
					<Row>
						<Link onClick={navigateTo(video.url)}>
							{index === 0 ? (
								<AnimatedText color={"yellow"} text={video.title} visible />
							) : (
								video.title
							)}
						</Link>
						<div>{video.duration}</div>
					</Row>
				</Tooltip>
			))}
		</Wrapper>
	);
};

export default History;
