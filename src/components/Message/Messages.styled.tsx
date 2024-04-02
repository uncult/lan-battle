import styled from "styled-components";

export const MessageContainer = styled.div<{ color?: "primary" | "secondary" }>`
	overflow-y: auto;
	background-color: ${({ color }) =>
		color === "primary" ? "#2b5278" : "#182533"}; /* Dark background color */
	color: #fff;
	padding: 4px 10px;
	border-radius: 8px 16px 16px 8px;
	width: fit-content;

	& + & {
		margin-top: 8px;
	}
`;

export const AvatarIcon = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: #1976d2;
	margin-right: 4px;
`;

export const Timestamp = styled.div`
	font-size: 12px;
	color: #7da8d3;
	width: fit-content;
	margin-left: auto;
`;

export const Message = styled.div`
	margin-right: 16px;
`;

export const Wrapper = styled.div`
	overflow: auto;
	padding: 16px;
	flex: 1;
`;

export const Name = styled.div`
	font-weight: 600;
	color: ${({ color }) => color};
`;

export const Image = styled.img`
	max-width: 500px;
	max-height: 500px;
	object-fit: contain;
	cursor: pointer;
`;

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const OverlayImage = styled.img`
	max-width: 90%;
	max-height: 90%;
	margin: auto;
`;
