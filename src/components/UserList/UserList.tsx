import { useSelector } from "react-redux";
import { getUsers } from "../../selectors/userlist.selectors";
import { Name, UserListContainer, Checkmark } from "./UserList.styled";
import TypingStatus from "../TypingStatus/TypingStatus";
import { getUser } from "../../selectors/user.selectors";
import { User } from "../../reducers/user.reducer";

export const UserList = () => {
	const users = useSelector(getUsers);
	const currentUser = useSelector(getUser);

	const getNameText = (user: User) => {
		return `${user.name} ${user.id === currentUser?.id ? "(You)" : ""}`;
	};

	return (
		<UserListContainer>
			{users.map((user) => {
				if (!user || !currentUser) {
					return null;
				}

				return (
					<div key={user.id}>
						<Name color={user.color}>
							<div>{getNameText(user)}</div>
						</Name>
						<TypingStatus id={user.id} />
					</div>
				);
			})}
		</UserListContainer>
	);
};

export default UserList;
