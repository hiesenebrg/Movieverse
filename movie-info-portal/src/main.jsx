import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";

import "./index.css";
import Login from "./components/Navbar.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-ozjouv23bqxd0jia.us.auth0.com"
        clientId="A7HrohXYNVGcGkeSkZZ9GhhtMQWzmU5h"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </BrowserRouter>
);
