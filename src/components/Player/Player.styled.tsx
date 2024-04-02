import styled from "styled-components";

export const IframeContainer = styled.div`
	position: relative;
	width: 100%;
	height: 0;
	padding-bottom: 56.25%; /* For a 16:9 aspect ratio, use 56.25% */
	overflow: hidden;

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;

export const ErrorMessage = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 20px;
	padding: 20px;
	box-sizing: border-box;
	text-align: center;
`;
export const VolumeControlContainer = styled.div`
	position: absolute;
	bottom: 16px;
	left: 16px;
	display: flex;
	height: 20px;
	background: transparent;
	cursor: pointer;
	user-select: none;
`;

export const VolumeLevel = styled.div<{ volume: number }>`
	width: 8px;
	height: 16px;
	margin-right: 2px;
	background: ${(props) =>
		props.volume ? "rgba(255, 255, 255, 0.75)" : "rgba(255, 255, 255, 0.5)"};
	&:last-child {
		margin-right: 0;
	}
`;
