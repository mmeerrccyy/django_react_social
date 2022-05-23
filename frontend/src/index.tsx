import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Store from "./store/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./http/PrivateRoute";
import TestComponent from "./components/TestComponent";
import PublicRoute from "./http/PublicRoute";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import NotFound from "./components/errors/NotFound";

interface State {
  store: Store,
}

const store = new Store();

export const Context = createContext<State>({
  store
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Context.Provider value={{ store }}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<PrivateRoute />}>
            <Route path={"/"} element={<TestComponent />} />
          </Route>
          <Route path={"auth"} element={<PublicRoute />}>
            <Route path={"login"} element={<LoginForm />} />
            <Route path={"register"} element={<RegisterForm />} />
          </Route>
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
