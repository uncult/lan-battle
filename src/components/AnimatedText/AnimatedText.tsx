import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { Container } from "./AnimatedText.styled";

interface Props {
	text: string;
	visible: boolean;
	color?: string;
	strength?: number;
}

export const AnimatedText = ({
	text,
	visible,
	color,
	strength = -3,
}: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			const chars = containerRef.current.querySelectorAll("span");

			const tl = gsap.timeline();

			tl.to(chars, {
				y: `${strength}%`,
				duration: 0.5,
				ease: "sine.inOut",
				stagger: {
					from: "start",
					each: 0.1,
					repeat: -1,
					yoyo: true,
				},
			});

			// Set the initial progress of the animation
			tl.progress(0.5);
		}
	}, [visible]);

	if (!visible) {
		return null;
	}

	const splitText = text
		.split("")
		.map((char, i) => <span key={i}>{char === " " ? "\u00A0" : char}</span>);

	return (
		<Container ref={containerRef} color={color}>
			{splitText}
		</Container>
	);
};

export default AnimatedText;
