import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { SocketProvider } from "../utils/context/SocketProvider";
import Main from "../components/Main/Main";
import Login from "../components/Login/Login";
import reducers from "../reducers/reducers";

export const store = configureStore({
	reducer: reducers,
	devTools: { name: "Chat App" },
});

export const App = () => {
	return (
		<Provider store={store}>
			<SocketProvider>
				<Login />
				<Main />
			</SocketProvider>
		</Provider>
	);
};

export default App;
