import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


const AdminLogin = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  //   const history = useHistory(); // Initialize useHistory

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post("/api/admin/login",  values);
      const { token } = response.data; // Assuming your API returns a token upon successful login

      localStorage.setItem("token", token); // Save the token to local storage
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      setFieldError("username", "Invalid username or password"); // Set error message for a specific field
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Admin Login</h2>
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
       
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
          <span>Did not have Account?</span>
            <Button onClick={() => navigate( "/registration" )}>SignUp</Button>
            </div>
            </div>
         
      </div>
    </div>
  );
};

export default AdminLogin;
