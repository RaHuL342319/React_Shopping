import React from "react";
import { Link } from "react-router-dom";

const ShoppingHome = () => {
  // const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <div>
      <h1>Shopping Home</h1>
      <h2>Welcome to the Shopping App!</h2>
      <Link to="/register">New User! Register Now!!</Link>
      <span> | </span>
      <Link to="/login">Existing User, Login.</Link>
    </div>
  );
};

export default ShoppingHome;
