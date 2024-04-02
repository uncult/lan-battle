import styled, { css, keyframes } from "styled-components";

const rainbow = keyframes`
  0% {background-position: 0%}
  100% {background-position: -100%}
`;

const fadeInOut = keyframes`
  0%, 100% {opacity: 0}
  50% {opacity: 1}
`;

interface TypingContainerProps {
	animationDelay?: string;
}

export const TypingContainer = styled.div<TypingContainerProps>`
	display: flex;
	border: none;
	outline: none;
	color: #6c7883;
	font-size: 14px;
	position: relative;
	height: 20px; /* Adjust as needed */

	/* Adjust the colors in the gradient */
	/* background: linear-gradient(
		90deg,
		#ff0000,
		#ff7f00,
		#ffff00,
		#00ff00,
		#0000ff,
		#8b00ff,
		#ff0000,
		#ff0000,
		#ff7f00,
		#ffff00,
		#00ff00,
		#0000ff,
		#8b00ff,
		#ff0000
	);
	background-size: 200% auto;
	color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: ${rainbow} 6s linear infinite; */

	/* Add the following lines */
	/* ${({ animationDelay = "0s" }) => css`
		animation-delay: ${animationDelay}, ${animationDelay};
	`} */
`;
