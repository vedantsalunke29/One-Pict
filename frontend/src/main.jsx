import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/index.jsx";
import { inject } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/react";
inject();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
			<Analytics/>
		</Provider>
	</React.StrictMode>,
);
