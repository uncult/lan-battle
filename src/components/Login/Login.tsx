import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../actions/user.actions";
import { v4 as uuidv4 } from "uuid";
import { getUser } from "../../selectors/user.selectors";

export const Login = () => {
	const [input, setInput] = useState<string>("");

	const user = useSelector(getUser);

	const dispatch = useDispatch();

	const getRandomColor = () => {
		const colors = [
			"#FF8C66",
			"#FFCFA3",
			"#FF8CFF",
			"#FFFFB3",
			"#33CCE6",
			"#E6C966",
			"#66A3E6",
			"#CCCC99",
			"#CCFFCC",
			"#FF8080",
			"#99E680",
			"#99CC99",
			"#FFCCCC",
			"#99A3CC",
			"#99CC33",
			"#FFB3E6",
			"#E6FF33",
			"#FF3380",
			"#E66633",
			"#66FFCC",
		];
		const randomIndex = Math.floor(Math.random() * colors.length);
		return colors[randomIndex];
	};

	const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			dispatch(
				loginUserAction({ id: uuidv4(), name: input, color: getRandomColor() })
			);
		}
	};

	const setInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;

		setInput(input);
	};

	if (user?.name) {
		return null;
	}

	return (
		<div>
			<div>Set your name</div>
			<input
				type="text"
				onChange={setInputHandler}
				onKeyDown={handleKey}
				value={input}
				autoFocus
			/>
		</div>
	);
};

export default Login;
