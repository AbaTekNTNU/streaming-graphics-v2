import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import Basket from "./modules/basket";
import { store } from "./store/store";
import WebSockets from "./WebSockets";

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <WebSockets />
        <Basket />
      </Provider>
    </>
  );
};

export default App;
