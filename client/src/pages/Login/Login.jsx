import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "../../styles/style.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../data/fetchUsers";
import { setUser, setError } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    loginOrEmail: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    loginOrEmail: Yup.string().required("Login or Email is required"),
    password: Yup.string()
      .min(7, "Password must be between 7 and 30 characters")
      .max(30, "Password must be between 7 and 30 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const user = await loginUser(values);
      dispatch(setUser(user));
      // Зберігання JWT в LocalStorage
      localStorage.setItem("token", user.token);
      navigate("/");
    } catch (error) {
      dispatch(setError("Error logging in"));
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="loginOrEmail">Login or Email</label>
            <Field type="text" id="loginOrEmail" name="loginOrEmail" />
            <ErrorMessage
              name="loginOrEmail"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>

          <button type="submit">Login</button>
        </Form>
      </Formik>
      <p className="login-text">
        Don't have an account? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;

