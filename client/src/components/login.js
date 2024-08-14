import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loginSchema from './formikSchemas/loginSchema';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const [storedLoginData, setStoredLoginData] = useState(null);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('loginData'));
        console.log(data);
        if (data?.accessToken) {
          setStoredLoginData(data);
          console.log(storedLoginData);
          navigate('/welcome');
        } else {
          setStoredLoginData(null);
        }
      }, [navigate]);

      const handleSubmit = useCallback(async (values, { setSubmitting }) => {
        console.log(values);
        console.log(location.data);
        if (location?.data?.accessToken) {
          alert('Already Logged In');
        } else {
          const { username, password, role } = values;
            console.log(username)
            console.log(password)
            console.log(role)
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json, text/plain, */*',
            },
            body: JSON.stringify({
              UserName: username,
              Password: password,
            }),
          };
    
          const loginUrl = 'http://localhost:5000/admin/login';
          
    
          fetch(loginUrl, options)
            .then((resp) => resp.json())
            .then((data) => {
              setSubmitting(false);
              if (data.accessToken) {
                localStorage.setItem('loginData', JSON.stringify(data));
                location.state = data;
                navigate('/welcome');
              } else {
                alert('Invalid Credentials');
              }
            })
            .catch((error) => {
              setSubmitting(false);
              console.log(error);
            });
        }
      },[]);

    return(
        storedLoginData ? null : (<div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Formik
              initialValues={{ username: '', password: '', role: '' }}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h1 className="text-center">Login Form</h1>
                  <div className="mb-3">
                    <Field as="select" name="role" className="form-select">
                      <option value="">Select User</option>
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
                    </Field>
                    <ErrorMessage name="role" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">User Name:</label>
                    <Field type="text" name="username" className="form-control" placeholder="yourusername" />
                    <ErrorMessage name="username" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <Field type="password" name="password" className="form-control" placeholder="******" />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      Login
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>)
    )
}
export default React.memo(Login);