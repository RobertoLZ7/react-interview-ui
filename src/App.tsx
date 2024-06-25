import React from "react";
import "./App.css";
import Stack from "@mui/material/Stack";

import WidgetList from "./components/WidgetList";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = (): JSX.Element => {
	return (
		<Provider store={store}>
			<Stack>
				<WidgetList />
			</Stack>
		</Provider>
	);
};

export default App;
