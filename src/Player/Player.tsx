import React, { useContext, useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { ErrorMessage, IframeContainer } from "./Player.styled";
import { SocketContext } from "../utils/context/SocketProvider";
import { VolumeControl } from "./VolumeControl";

export type YouTubePlayer = {
	playVideo: () => void;
	pauseVideo: () => void;
	stopVideo: () => void;
	mute: () => void;
	unMute: () => void;
	isMuted: () => boolean;
	setVolume: (volume: number) => void;
	getVolume: () => number;
	loadVideoById: (
		videoId: string | { videoId: string; startSeconds: number }
	) => void;
	seekTo: (seconds: number) => void;
	getPlayerState: () => number;
	g?: any;
	// Add other methods as needed
};

const Player: React.FC = () => {
	const socket = useContext(SocketContext);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [isPlayerReady, setIsPlayerReady] = useState(false);
	const [preloadedVideo, setPreloadedVideo] = useState<any | null>(null);

	const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
		if (event.data === 1) {
			setIsPlaying(true);
			setErrorMessage(null);
		} else {
			setIsPlaying(false);
		}
	};

	const playerRef = useRef<YouTubePlayer | null>(null);

	const videoOptions = {
		playerVars: {
			autoplay: 1,
			mute: 1,
			controls: 0,
		},
	};

	const onPlayerReady: YouTubeProps["onReady"] = (event) => {
		setErrorMessage(null);
		setIsPlayerReady(true);

		playerRef.current = event.target;

		if (playerRef.current) {
			playerRef.current.unMute();
			playerRef.current.setVolume(100);
		}
	};

	const getPlayVideo = (data: any) => {
		let videoId = data.url;
		let startTime = data.startTime || 0;

		if (data.url.includes("youtube.com")) {
			const urlParams = new URLSearchParams(new URL(data.url).search);
			videoId = urlParams.get("v");
			startTime = parseInt(urlParams.get("t") || "0");
		} else if (data.url.includes("youtu.be")) {
			const url = new URL(data.url);
			videoId = url.pathname.slice(1); // Remove the leading '/'
			startTime = parseInt(new URLSearchParams(url.search).get("t") || "0");
		}

		return { videoId, startTime };
	};

	useEffect(() => {
		const handleCommand = (data: any) => {
			if (playerRef.current) {
				switch (data.command) {
					case "play":
						const { videoId, startTime } = getPlayVideo(data);

						playerRef.current.loadVideoById({
							videoId,
							startSeconds: startTime,
						});
						playerRef.current.playVideo();

						break;
					case "pause":
						playerRef.current.pauseVideo();
						break;
					case "stop":
						playerRef.current.stopVideo();
						break;
					case "mute":
						playerRef.current.mute();
						break;
					case "unmute":
						playerRef.current.unMute();
						break;
					default:
						break;
				}
			}
		};

		socket?.on("command", handleCommand);
		socket?.on("set-video", setPreloadedVideo);

		return () => {
			socket?.off("command", handleCommand);
			socket?.off("set-video", setPreloadedVideo);
		};
	}, []);

	useEffect(() => {
		if (preloadedVideo && isPlayerReady) {
			const { videoId, startTime } = getPlayVideo(preloadedVideo);

			console.log(videoId, startTime);

			const loadAndPlayVideo = () => {
				try {
					if (playerRef.current) {
						playerRef.current.loadVideoById({
							videoId,
							startSeconds: startTime,
						});
						playerRef.current.playVideo();
					}
				} catch (error) {
					setTimeout(loadAndPlayVideo, 1000);
				}
			};

			loadAndPlayVideo();
		}
	}, [preloadedVideo, isPlayerReady]);

	const onPlayerError = (event: any) => {
		console.log("Player error", event.data);
		if (event.data === 150) {
			setErrorMessage(
				"The video cannot be played because the video owner has disabled embedding or the video is not available in your region."
			);
		}
	};

	return (
		<IframeContainer>
			<YouTube
				opts={videoOptions}
				className="youtube-player"
				onReady={onPlayerReady}
				onStateChange={onPlayerStateChange}
				onError={onPlayerError}
			/>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: isPlaying ? "transparent" : "black",
				}}
			>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				{isPlaying && <VolumeControl playerRef={playerRef} />}
			</div>
		</IframeContainer>
	);
};

export default Player;
