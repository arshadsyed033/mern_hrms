import * as Yup from "yup";

const validationSchema = Yup.object({
    f_Name: Yup.string().required('Name is required'),
    f_Email: Yup.string().email('Invalid email format').required('Email is required'),
    f_Mobile: Yup.string().required('Mobile is required').matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
    f_Designation: Yup.string().required('Designation is required'),
    f_Gender: Yup.string().required('Gender is required'),
    f_Course: Yup.string().required('Course is required'),
    file: Yup.mixed().required('Image is required')
        .test('fileSize', 'File too large', value => value && value.size <= 1024 * 1024 * 5)
        .test('fileType', 'Unsupported file format', value => value && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type)),
});

export default validationSchema;
