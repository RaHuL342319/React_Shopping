import React from "react";
import {Link, Routes, Route, useNavigate } from "react-router-dom";
import ShoppingHome from "./ShoppingHome";
import ShoppingDashboard from "./ShoppingDashboard";
import Login from "./Login";
import Register from "./Register";
import LoginError from "./LoginError";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const Index = () => {
  const cartItems = useSelector((store) => store.cart.cartItems);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const handleSignOut = () => {
    removeCookie("email");
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      {/* Header with logo and navigation */}
      <header className="row bg-danger text-white d-flex align-items-center py-2">
        <h1 className="col-4 d-flex align-items-center">
          <Link to="/" className="text-decoration-none text-white">
            <i className="bi bi-shop fs-1 me-2"></i> Shopping App
          </Link>
        </h1>
        <nav className="col-8 d-flex justify-content-end gap-2">
          <Link className="btn text-info " to="/">
            Home
          </Link>
          <Link className="btn text-info " to="/dashboard">
            Dashboard
          </Link>
          <Link to="/cart" className="btn text-info  d-flex align-items-center">
            <span className="bi bi-cart me-2"></span> Cart [{cartItems.length}]
          </Link>
          {
            cookies["email"] === undefined ?(<Link className="btn text-info " to="/login">
            Login
          </Link>) : (<button className="btn text-info " onClick={handleSignOut}>Logout</button>)
          }
          
         
        </nav>
      </header>

      {/* Main content section with routes */}
      <section className="row mt-2">
        <main className="col-9 mt-2">
          <Routes>
            <Route path="/" element={<ShoppingHome />} />
            <Route path="/home" element={<ShoppingHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginerror" element={<LoginError />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ShoppingDashboard />} />
            <Route path="/cart" element={<CartItems />} />
          </Routes>
        </main>
      </section>
    </div>
  );
};

export default Index;
