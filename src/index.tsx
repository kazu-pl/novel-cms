import { StrictMode } from "react";
import App from "./App";
import { store } from "./common/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { hydrate, render } from "react-dom";

import "./i18n";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const rootElement = document.getElementById("root") as HTMLDivElement;

if (rootElement.hasChildNodes()) {
  hydrate(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
