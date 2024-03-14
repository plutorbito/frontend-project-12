import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import loginImage from '../assets/login.jpg';
import useAuth from '../hooks/useAuth.jsx';
import { useSendLoginDataMutation } from '../api.js';
import handleResponseError from '../utils/handleResponseErrors.js';
import ROUTERS from '../utils/router.js';

const LoginPage = () => {
  const [error, setError] = useState('');
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const [sendLoginData] = useSendLoginDataMutation();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const response = await sendLoginData(values);
      if (response.error) {
        setError(t(handleResponseError(response.error)));
      } else {
        setError('');
        const userId = {
          token: response.data.token,
          username: response.data.username,
        };
        localStorage.setItem('userId', JSON.stringify(userId));
        logIn(userId.username);
        navigate(ROUTERS.chatPage);
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
                  alt={t('login.header')}
                />
              </div>
              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h3 className="text-center mb-4">{t('login.header')}</h3>
                <Form.Group className="mb-3 form-floating" controlId="username">
                  <Form.Control
                    type="text"
                    name="username"
                    autoFocus
                    placeholder={t('login.username')}
                    autoComplete="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={error}
                    required
                  />
                  <label htmlFor="username">{t('login.username')}</label>
                </Form.Group>
                <Form.Group className="mb-3 form-floating" controlId="password">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={t('login.password')}
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={error}
                    required
                  />
                  <label htmlFor="password">{t('login.password')}</label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {error}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                >
                  {t('login.submitButton')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.noAccount')}</span>
                {' '}
                <Link to="/signup">{t('login.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
