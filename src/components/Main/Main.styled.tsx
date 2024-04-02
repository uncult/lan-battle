import styled from "styled-components";

export const ChatInputContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	background-color: #17212b;
	padding: 10px;
	border: 1px solid #101921;
	box-sizing: border-box;
	border-left: none;
`;

export const ChatInputField = styled.input`
	position: relative;
	flex: 1;
	border: none;
	outline: none;
	background-color: transparent;
	font-size: 16px;
	color: #6c7883;
	font-size: 14px;
`;

export const Wrapper = styled.div`
	display: flex;
	height: 100vh;
`;

export const ChatContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	height: 100vh;
	flex: 1;
	box-sizing: border-box;
`;

export const MainSection = styled.div`
	display: flex;
	flex: 0 60%;
	color: #fff;
	background-color: #070b11;
`;

export const LeftSection = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	color: #fff;
	width: 250px;
`;
