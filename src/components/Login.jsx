import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useCookies } from "react-cookie";

const Login = () => {
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["email", "password"]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getusers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((errors) => {
        console.log("Erorrs Occured during fetching users", errors);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Please enter email"),
      password: yup.string().required("Please enter password"),
    }),
    onSubmit: (values) => {
      for (var user of users) {
        if (user.email === values.email && user.password === values.password) {
          setCookie("email", user.email, { path: "/" });
          setCookie("password", user.password, { path: "/" });
          alert("Login successful");
          navigate("/dashboard");
          break;
        } else {
          navigate("/loginerror");
        }
      }
    },
  });
  return (
    <div className="p-3" style={{ background: "#FFEBED" }}>
      <h2>Login</h2>
      <form className="w-50" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email address"
            {...formik.getFieldProps("email")}
          />
          <p className="text-danger">{formik.errors.email}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label fw-semibold">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          <p className="text-danger">{formik.errors.password}</p>
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <Link
          to="/register"
          className="ms-3"
          style={{ textDecoration: "none" }}
        >
          New User, Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
