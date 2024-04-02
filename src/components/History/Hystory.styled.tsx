import styled from "styled-components";

export const Wrapper = styled.div`
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
