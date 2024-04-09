import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import SpinnerComp from "./Spinner";

const LoginForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/login`,
        values
      );
      const { token } = response.data;

      localStorage.setItem("token", token); // Save the token to local storage
      navigate("/user-dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      setFieldError("username", "Invalid username or password"); // Set error message for a specific field
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  if (loading) return <div style={{display:"flex", justifyContent:"center"}}><SpinnerComp/></div>;
    return (
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">User Login</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </Form>
            </Formik>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span>Did not have Account?</span>
              <Button onClick={() => navigate("/registration")}>SignUp</Button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default LoginForm;
