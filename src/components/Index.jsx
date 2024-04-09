import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import ShoppingHome from "./ShoppingHome";
import ShoppingDashboard from "./ShoppingDashboard";
import Login from "./Login";
import Register from "./Register";
import LoginError from "./LoginError";

const Index = () => {
  return (
    <div className="container-fluid">
      <div className="row bg-danger text-white text-center p-2 mt-2 d-flex align-items-center justify-content-between">
        <h1 className="col-4 border">Shopping App</h1>

        <nav className="col-8 d-flex">
          <Link className="btn btn-danger text-white w-100" to="/">
            Home
          </Link>

          <Link className="btn btn-danger text-white w-100" to="/dashboard">
            Dashboard
          </Link>

          <Link className="btn btn-danger text-white w-100" to="/login">
            Login
          </Link>
        </nav>
      </div>

      <section className="row mt-2">
        <>
          <main className="col-9 mt-2">
            <Routes>
              <Route path="/" element={<ShoppingHome />} />
              <Route path="/home" element={<ShoppingHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/loginerror" element={<LoginError />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ShoppingDashboard />} />
            </Routes>
          </main>
        </>
      </section>
    </div>
  );
};

export default Index;
