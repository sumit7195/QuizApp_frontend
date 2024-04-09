import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const AdminSignUp = () => {
  const navigate = useNavigate();
  const initialValues = {
    userName: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("userName is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post("/api/admin/create", values);
      navigate("/admin-login");
      console.log(response.data); // Handle success, e.g., show success message to the user
    } catch (error) {
      console.error("Error registering user:", error);
      setFieldError("userName", "Registration failed. Please try again."); // Set error message for a specific field
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Admin Registration</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  userName:
                </label>
                <Field
                  type="text"
                  id="userName"
                  name="userName"
                  className="form-control"
                />
                <ErrorMessage
                  name="userName"
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
                Register
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
