
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../services/authServices';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),

    password: Yup.string()
      .required('Password is required'),
  });

  return (
    <div className="auth-container">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const data = await loginUser(
              values.email,
              values.password,
            );

            localStorage.setItem('token', data.access_token);

            alert('Login successful');
            navigate('/dashboard');
          } catch (error) {
            console.log(error);
            alert('Login failed. Please check your email and password.');
          }
        }}
      >
        <Form className="auth-card">
          <h2>Login</h2>
          

          <Field
            type="email"
            name="email"
            placeholder="Email"
          />
          <ErrorMessage name="email" component="div" />

          <Field
            type="password"
            name="password"
            placeholder="Password"
          />
          <ErrorMessage name="password" component="div" />

          <button type="submit">Login</button>

          <p className="auth-link">
            Don't have an account?{' '}
            <Link to="/signup">Sign Up</Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
