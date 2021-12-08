import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Basket from "./modules/basket";
import Landing from "./modules/landing";
import { store } from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/basket" element={<Basket />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
