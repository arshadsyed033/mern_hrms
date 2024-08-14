
import React, { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import empValidationSchema from './formikSchemas/empValidationSchema';
import PreviewImage from './previewImage';

const UpdateEmployee = () => {
    const [empdata, setEmpData] = useState(null);
    const [msg, setMsg] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const employeeId = location.state?.id;
    const userData = localStorage.getItem("loginData");
    const loginData = userData ? JSON.parse(userData) : null;
    const fileRef = useRef(null);

    const getExsitingEmployee = useCallback(async (employeeId) => {
        if (!employeeId || !loginData) return;
        try {
            const response = await fetch(`http://localhost:5000/employee/getEmployeeById/${employeeId}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${loginData.accessToken}`
                },
            });

            const getEmp = await response.json();
            console.log(getEmp);
            setEmpData(getEmp);
        } catch (error) {
            console.log(error);
        }
    }, [employeeId]);

    useEffect(() => {
        if (employeeId) {
            getExsitingEmployee(employeeId);
        }
    }, [employeeId, getExsitingEmployee]);

    const handleUpdate = useCallback(async (values, { setSubmitting }) => {
        console.log("Form values:", values);
        console.log("Employee data:", empdata);
        if (!empdata || !empdata._id) {
            console.error("Employee data or ID is missing");
            setSubmitting(false);
            return;
        }
        const formData = new FormData();
        formData.append('f_Name', values.f_Name);
        formData.append('f_Email', values.f_Email);
        formData.append('f_Mobile', values.f_Mobile);
        formData.append('f_Designation', values.f_Designation);
        formData.append('f_Gender', values.f_Gender);
        formData.append('f_Course', values.f_Course);
        if (values.file) {
            formData.append('file', values.file); 
        }
        console.log("Employee ID:", employeeId);
    
        try {
   
            const response = await fetch(`http://localhost:5000/employee/employeeupdate/${employeeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${loginData.accessToken}`
                },
                body: formData
            });
    
            if (!response.ok) {
                throw new Error(`Update failed with status ${response.status}`);
            }
    
            navigate("/employeelist");
        } catch (error) {
            console.error("Error updating employee:", error);
        } finally {
            setSubmitting(false);
        }
    }, [employeeId, navigate, empdata]);
    const initialValues = {
        f_Image: empdata?.f_Image || null,
        f_Name: empdata?.f_Name || '',
        f_Email: empdata?.f_Email || '',
        f_Mobile: empdata?.f_Mobile || '',
        f_Designation: empdata?.f_Designation || '',
        f_Gender: empdata?.f_Gender || '',
        f_Course: empdata?.f_Course || '' 
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center" style={{ marginTop: "auto", marginBottom: "50px" }}>
                <div className="col-md-6">
                <h2>Update Employee Details</h2>
                    {empdata ? (
                        
                        <Formik
                            initialValues={initialValues}
                            validationSchema={empValidationSchema}
                            onSubmit={handleUpdate}
                        >
                            {({ isSubmitting, setFieldValue, values }) => (
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor='f_Name' className="form-label">Name: </label>
                                        <Field type="text" name="f_Name" id="f_Name" className="form-control" />
                                        <ErrorMessage name="f_Name" component="div" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor='f_Email' className="form-label">Email: </label>
                                        <Field type="email" name="f_Email" id="f_Email" className="form-control" />
                                        <ErrorMessage name="f_Email" component="div" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor='f_Mobile' className="form-label">Mobile No: </label>
                                        <Field type="number" name="f_Mobile" id="f_Mobile" className="form-control" />
                                        <ErrorMessage name="f_Mobile" component="div" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor='f_Designation' className="form-label">Designation: </label>
                                        <Field as="select" name="f_Designation" id="f_Designation" className="form-control">
                                            <option value="">Select Designation</option>
                                            <option value="HR">HR</option>
                                            <option value="MANAGER">MANAGER</option>
                                            <option value="Sales">Sales</option>
                                        </Field>
                                        <ErrorMessage name="f_Designation" component="div" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor='f_Gender' className="form-label" style={{ marginRight: '30px' }}>Gender: </label>
                                        <label style={{ marginRight: '30px' }}>
                                            <Field type="radio" name="f_Gender" value="Male" />
                                            Male
                                        </label>
                                        <label>
                                            <Field type="radio" name="f_Gender" value="Female" />
                                            Female
                                        </label>
                                        <ErrorMessage name="f_Gender" component="div" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Course: </label>
                                        <div role="group" aria-labelledby="checkbox-group" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '20px' }}>
                                            {['MCA', 'BCA', 'BSC'].map(course => (
                                                <label key={course} style={{ display: 'block', marginRight: '10px' }}>
                                                    <Field
                                                        type="checkbox"
                                                        name="f_Course"
                                                        value={course}
                                                        checked={values.f_Course === course}
                                                        onChange={() => {
                                                            setFieldValue('f_Course', values.f_Course === course ? '' : course);
                                                        }}
                                                    />
                                                    {course}
                                                </label>
                                            ))}
                                        </div>
                                        <ErrorMessage name="f_Course" component="div" />
                                    </div>
                                    <div className="mb-3">
                                        <input 
                                        hidden 
                                        ref={fileRef} 
                                        type='file' 
                                        onChange={(e)=>{setFieldValue("file", e.target.files[0]);}}
                                        />
                                        {values.file && <PreviewImage file={values.file}/>}
                                        <button type='button' onClick={()=>{fileRef.current.click()}}>Upload</button>
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Update Employee</button>
                                    {msg && <div className="mt-3 text-danger">{msg}</div>}
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default React.memo(UpdateEmployee);