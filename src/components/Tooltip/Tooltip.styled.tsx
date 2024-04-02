import styled from "styled-components";

interface TooltipContainerProps {
	tooltipPosition: {
		top: number;
		left: number;
	};
}

export const TooltipContainer = styled.div<TooltipContainerProps>`
	position: absolute;
	top: ${(props) => `${props.tooltipPosition.top}px`};
	left: ${(props) => `${props.tooltipPosition.left}px`};
	background-color: black;
	color: white;
	padding: 5px;
	border-radius: 5px;
	margin-bottom: 10px;
	white-space: nowrap;
	z-index: 1000;
`;
