import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const Register = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      password: "",
      confirmPassword: "",
      email: "",
      mobile: ""
    },
    validationSchema: yup.object({
      fullname: yup.string().required("Full Name is required"),
      password: yup.string().required("Password is required"),
      confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords do not match"),
      email: yup.string().email("Invalid email").required("Email is required"),
      mobile: yup.string().length(10).required("Phone is required"),
    }),
    onSubmit: (values) => {
      alert("Register successfully!")
      axios.post("http://localhost:3000/registeruser", values);
      navigate("/login");
    },
  });
  return (
    <div className="p-3" style={{background: "#FFEBED"}}>
      <h2>Register New User:</h2>
      <form className="w-50" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label fw-semibold">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            placeholder="Name"
            {...formik.getFieldProps("fullname")}
          />
          <p className="text-danger">{formik.errors.fullname}</p>
        </div>
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
        <div className="mb-3">
          <label htmlFor="confirmPasswordInput" className="form-label fw-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPasswordInput"
            name="confirmPassword"
            placeholder="Confirm Password"
            {...formik.getFieldProps("confirmPassword")}
          />
          <p className="text-danger">{formik.errors.confirmPassword}</p>
        </div>

        <div className="mb-3">
          <label htmlFor="mobileInput" className="form-label fw-semibold">
            Mobile
          </label>
          <input
            type="text"
            className="form-control"
            id="mobileInput"
            name="mobile"
            placeholder="Mobile Number"
            {...formik.getFieldProps("mobile")}
          />
          <p className="text-danger">{formik.errors.mobile}</p>
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <Link to="/login" className="ms-3" style={{textDecoration: "none"}}>
          Already Registered, Login
        </Link>
      </form>
    </div>



  );
};

export default Register;
