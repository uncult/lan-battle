import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { VolumeControlContainer, VolumeLevel } from "./Player.styled";
import { YouTubePlayer } from "./Player";

interface Props {
	playerRef: MutableRefObject<YouTubePlayer | null>;
}

export const VolumeControl = ({ playerRef }: Props) => {
	const [volume, setVolume] = useState(10);
	const isDragging = useRef(false);
	const volumeControlRef = useRef<HTMLDivElement | null>(null);
	const RECTANGLES = 10;

	const debouncedSetVolume = debounce((newVolume: number) => {
		if (playerRef?.current) {
			playerRef.current.setVolume(newVolume);
		}
	}, 20);

	const onVolumeChange = (newVolume: number) => {
		console.log(newVolume);
		debouncedSetVolume(newVolume);
	};

	const volumeRef = useRef(volume);
	volumeRef.current = volume;

	const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = volumeControlRef.current!.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const newVolume = Math.round((x / rect.width) * (RECTANGLES - 1)); // For visual effect
		const volumePercentage = Math.max(
			0,
			Math.min(100, Math.round((x / rect.width) * 100))
		);

		setVolume(newVolume);

		if (volumeRef.current >= 0 && volumeRef.current <= RECTANGLES) {
			onVolumeChange(volumePercentage);
		}
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		isDragging.current = true;
		handleVolumeChange(e);
	};

	const handleMouseUp = () => {
		isDragging.current = false;
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (isDragging.current) {
			handleVolumeChange(e as any);
		}
	};

	useEffect(() => {
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<VolumeControlContainer
			ref={volumeControlRef}
			onMouseDown={handleMouseDown}
		>
			{[...Array(RECTANGLES)].map((_, i) => (
				<VolumeLevel key={i} volume={i <= volume ? 1 : 0} />
			))}
		</VolumeControlContainer>
	);
};

export default VolumeControl;
