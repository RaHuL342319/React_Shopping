import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ShoppingIndex from "./components/ShoppingIndex";
import Index from "./components/Index";
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux'
import { store } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
