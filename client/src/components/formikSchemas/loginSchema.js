import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  role: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required')
});

export default validationSchema;
