import { useContext, useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import { HandleWrapper, Link, Row, TopHandle, Wrapper } from "./Hystory.styled";
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
	const [height, setHeight] = useState(
		localStorage.getItem("lan-battle-height") || "50%"
	);

	const socket = useContext(SocketContext);

	useEffect(() => {
		localStorage.setItem("lan-battle-height", height);
	}, [height]);

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

	const toggleHistory = () => {
		setHeight((prev) => (prev === "0px" ? "50%" : "0px"));
	};

	const TopHandleComponent = () => {
		let timeoutId: NodeJS.Timeout | null = null;

		const handleMouseDown = (event: React.MouseEvent) => {
			if (event.button !== 0) {
				return;
			}

			timeoutId = setTimeout(toggleHistory, 200);
		};

		const handleMouseUp = () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};

		return (
			<HandleWrapper onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
				<TopHandle />
			</HandleWrapper>
		);
	};

	const onResizeStop = (e: any, direction: any, ref: any, d: any) => {
		setHeight(ref.style.height);
		localStorage.setItem("lan-battle-height", ref.style.height);
	};

	return (
		<Resizable
			size={{ width: "100%", height: height }}
			handleComponent={{
				top: <TopHandleComponent />,
			}}
			handleStyles={{
				top: { height: "4px", marginTop: "-4px", pointerEvents: "none" },
			}}
			onResizeStop={onResizeStop}
			enable={{
				top: true,
			}}
		>
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
		</Resizable>
	);
};

export default History;
