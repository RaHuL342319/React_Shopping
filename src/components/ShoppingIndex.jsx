import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ShoppingHome from "./ShoppingHome";
import ShoppingDashboard from "./ShoppingDashboard";
import Login from "./Login";
import Register from "./Register";
import LoginError from "./LoginError";

import CartItems from "./CartItems";

const ShoppingIndex = () => {
  return (
    <div className="container-fluid">
      <header className="row bg-danger text-white text-center p-2 mt-2 d-flex align-items-center justify-content-between">
        <h1 className="col-4 border">Shopping App</h1>
       
      </header>

      <section className="row mt-2">
          <nav className="col-3">
            <div className="mb-2">
              <Link className="btn btn-danger text-white w-100" to="/">Home </Link>
            </div>
            <div className="mb-2">
            <Link className="btn btn-danger text-white w-100" to="/register">Register </Link>
            </div>
            <div className="mb-2">
            <Link className="btn btn-danger text-white w-100" to="/login">Login </Link>
            </div>
            <div className="mb-2">
            <Link className="btn btn-danger text-white w-100" to="/dashboard">Dashboard </Link>
            </div>
           
          </nav>
          <main className="col-9 mt-2">
            <Routes>
              <Route path="/" element={<ShoppingHome />} />
              <Route path="/home" element={<ShoppingHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/loginerror" element={<LoginError />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ShoppingDashboard />} />
              <Route path="/cart" element={<CartItems />} />
              <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </main>
      </section>
    </div>
  );
};

export default ShoppingIndex;
