import styled from "styled-components";

export const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	flex: 3;
	overflow: hidden;
	overflow-y: auto;
	padding: 0px 16px;
	background-color: #0e1621;
	border: 1px solid #101921;
	border-bottom: none;
	margin: 16px 0px;
`;

export const Link = styled.div`
	color: #fff;
	cursor: pointer;
	text-decoration: none;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	position: relative;
`;

export const Row = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: 600;
`;

export const TopHandle = styled.div`
	height: 4px;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	width: 30px;
	background: #fff;
	box-sizing: border-box;
	opacity: 0.5;
	align-items: center;
`;

export const HandleWrapper = styled.div`
	height: 10px;
	cursor: pointer;
	position: absolute;
	top: -2px;
	left: 50%;
	transform: translateX(-50%);
	width: 40px;
	z-index: 2;
	box-sizing: border-box;
	opacity: 0.5;
	pointer-events: auto;
`;
