

import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import empValidationSchema from './formikSchemas/empValidationSchema';
import PreviewImage from './previewImage';

const CreateEmployee = () => {
    const navigate = useNavigate();
    const [msg, setMsg] = useState();
    const userData = localStorage.getItem("loginData");
    const loginData = userData ? JSON.parse(userData) : null;
    const initialValues = {
        f_Name: "",
        f_Email: "",
        f_Mobile: "",
        f_Designation: "",
        f_Gender: "",
        f_Course: "",
        file: null
    };
    const fileRef = useRef(null);
const handleSubmit = useCallback(async (values, { resetForm, setSubmitting }) => {
    console.log(values);
    const formData = new FormData();
    formData.append('f_Name', values.f_Name);
    formData.append('f_Email', values.f_Email);
    formData.append('f_Mobile', values.f_Mobile);
    formData.append('f_Designation', values.f_Designation);
    formData.append('f_Gender', values.f_Gender);
    formData.append('f_Course', values.f_Course);
    if (values.file) {
        formData.append('file', values.file); // Attach the file
    }
    await fetch("http://localhost:5000/employee/createEmployee", {
        method: 'POST',
        headers: {
            "Authorization": `${loginData.accessToken}`
        },
        body: formData
    }).then((resp) => resp.json()).then(data => {
        if (data.msg === 'employee already exists') {
            setMsg(data.msg);
        } else {
            setSubmitting(false);
            resetForm();
            navigate("/employeelist");
        }
    }).catch(error => {
        console.log(error);
    });
}, [loginData, navigate]);


    return (
        <div className="container mt-5">
            <div className="row justify-content-center" style={{ marginTop: "auto", marginBottom: "50px" }}>
                <div className="col-md-6">
                <h2>Add Employee Details</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={empValidationSchema}
                        onSubmit={handleSubmit}
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
                                    <div role="group" aria-labelledby="checkbox-group" style={{ display: 'inline-flex', alignItems: 'center', marginLeft:'20px' }}>
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
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Add Employee</button>
                                {msg && <div className="mt-3 text-danger">{msg}</div>}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default React.memo(CreateEmployee);
