import styled from "styled-components";

export const UserListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 250px;
	background-color: #17212b;
	color: #f5f5d9;
	border: 1px solid #101921;
	padding: 10px;
	box-sizing: border-box;
	font-weight: 600;
	flex: 2;
`;

export const Name = styled.div`
	display: flex;
	color: ${({ color }) => color};

	& + & {
		margin-top: 4px;
	}
`;

export const Checkmark = styled.div`
	margin-left: 4px;
`;
