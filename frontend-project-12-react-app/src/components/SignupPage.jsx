import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import signupImage from '../assets/signup.png';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';

import { signupFormSchema } from '../utils/validate.js';
import { useSendNewUserDataMutation } from '../api.js';

const SignupPage = () => {
  const [error, setError] = useState('');
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [sendNewUserData] = useSendNewUserDataMutation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupFormSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const response = await sendNewUserData(values);
        console.log('signup response', response);

        if (response.error?.status === 409) {
          setError('Пользователь уже существует');
        } else {
          logIn();
          setError('');
          const userId = {
            token: response.data.token,
            username: response.data.username,
          };
          localStorage.setItem('userId', JSON.stringify(userId));

          navigate(location.state?.from || '/');
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    },
  });

  return (
    <div className="container-fluid h-100 p-3">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={signupImage}
                  className="rounded-circle img-fluid"
                  alt={'Зарегистрироваться'}
                />
              </div>
              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h3 className="text-center mb-4">Регистрация</h3>
                <Form.Group className="mb-3 form-floating" controlId="username">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder={'Имя пользователя'}
                    autoComplete="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.errors.username || error}
                  />
                  <label htmlFor="username">{'Имя пользователя'}</label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {(formik.errors.username, error)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 form-floating" controlId="password">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={'Пароль'}
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.errors.password}
                  />
                  <label htmlFor="password">{'Пароль'}</label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3 form-floating"
                  controlId="confirmPassword"
                >
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder={'Подтвердите пароль'}
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    isInvalid={formik.errors.confirmPassword}
                  />
                  <label htmlFor="confirmPassword">
                    {'Подтвердите пароль'}
                  </label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                >
                  Зарегистрироваться
                </Button>
                <Form.Control.Feedback type="invalid" tooltip>
                  {error}
                </Form.Control.Feedback>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
