import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./routes/Home.jsx";
import Landing from "./routes/Landing.jsx";
import Profile from "./routes/Profile.jsx";
import CreatePokemon from "./routes/CreatePokemon.jsx";
import Detail from "./routes/Detail";
import Error from "./routes/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/pokemons/:pokemonName",
        element: <Detail />,
      },
    ],
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/createPokemon",
    element: <CreatePokemon />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
