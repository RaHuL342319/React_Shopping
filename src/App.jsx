import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ShoppingIndex from "./components/ShoppingIndex";
import Index from "./components/Index";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return <BrowserRouter>
  <Index />
  {/* <Index /> */}
  </BrowserRouter>;
};

export default App;
