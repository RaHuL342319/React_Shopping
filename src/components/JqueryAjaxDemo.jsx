import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useFormik } from "formik";

const JqueryAjaxDemo = () => {
    const [users, setUsers] = useState([]);
    const [userError, setUserError] = useState({});

    useEffect(() => {
      $.ajax({
        method: "GET",
        url: "http://localhost:3000/getusers",
        success: (res) => {
          setUsers(res);
        },
      });
    }, []);

  const formik = useFormik({
    initialValues: {
      userName: "",
      userId: "",
      password: "",
      age: "",
      mobile: "",
      subscribed: true,
    },
    onSubmit: (values) => {
      $.ajax({
        method: "POST",
        url: "http://localhost:3000/registeruser",
        data: values
        
      })
      alert("Registered Successfully")
    },
  });

  const verifyUserId = (e) => {
    for(let user of users){
        if(user.userId ===  e.target.value ){
            setUserError({
                userMessage: "User Id already exists. Try other",
                color: "red",
            });
            break;
        }else{
            setUserError({
                userMessage: "User Id Available",
                color: "green",
            })
        }
    }
       
  }

  const handleUserBlur = (e) => {
    setUserError({});
  }

  return (
    <div className="container-fluid">
      <h2>Register User</h2>
      <form className="w-25" onSubmit={formik.handleSubmit} onKeyUp={verifyUserId} onBlur={handleUserBlur}>
        <dl>
          <dt>User Id</dt>
          <dd>
            <input
              type="text"
              className="form-control "
              name="userId"
              value={formik.values.userId}
              onChange={formik.handleChange}
            />
          </dd>
          <dd style={{color: `${userError.color}`}}>{userError.userMessage}</dd>
          <dt>User Name</dt>
          <dd>
            <input
              type="text"
              className="form-control "
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
            />
          </dd>
          <dt>Password</dt>
          <dd>
            <input
              type="password"
              className="form-control "
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </dd>
          <dt>Age</dt>
          <dd>
            <input
              type="number"
              className="form-control"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
            />
          </dd>
          <dt>Mobile</dt>
          <dd>
            <input
              type="text"
              className="form-control "
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
            />
          </dd>
          <dt>Subscribed</dt>
          <dd className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              name="subscribed"
              checked={formik.values.subscribed}
              onChange={formik.handleChange}
            />
          </dd>
        </dl>
        <button className="btn btn-primary ">submit</button>
      </form>
    </div>
  );
};

export default JqueryAjaxDemo;
