import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import loginImage from '../assets/login.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes';

const LoginPage = () => {
  const [error, setError] = useState('');
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        logIn();
        const userId = {
          token: response.data.token,
        };
        localStorage.setItem('userId', JSON.stringify(userId));
        navigate(location.state?.from || '/');
      } catch (err) {
        setError('Неверные имя пользователя или пароль');
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
                  src={loginImage}
                  className="rounded-circle img-fluid"
                  alt={'Войти'}
                />
              </div>
              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h3 className="text-center mb-4">Войти</h3>
                <Form.Group className="mb-3 form-floating" controlId="username">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder={'Ваш ник'}
                    autoComplete="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={error}
                  />
                  <label htmlFor="username">{'Ваш ник'}</label>
                </Form.Group>
                <Form.Group className="mb-3 form-floating" controlId="password">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={'Ваш пароль'}
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={error}
                  />
                  <label htmlFor="username">{'Ваш пароль'}</label>
                  {error && (
                    <Form.Control.Feedback type="invalid">
                      {error}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                >
                  Войти
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{'Нет аккаунта?'}</span>{' '}
                <Link to="/signup">{'Регистрация'}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
