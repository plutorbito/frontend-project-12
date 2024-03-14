import { useFormik } from 'formik';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import signupImage from '../assets/signup.png';
import useAuth from '../hooks/useAuth.jsx';
import { validateSignupForm } from '../utils/validate.js';
import { useSendNewUserDataMutation } from '../api.js';
import handleResponseError from '../utils/handleResponseErrors.js';
import ROUTERS from '../utils/router.js';

const SignupPage = () => {
  const [error, setError] = useState('');
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [sendNewUserData] = useSendNewUserDataMutation();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validateSignupForm(t),
    validateOnChange: false,
    onSubmit: async (values) => {
      const response = await sendNewUserData(values);
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
                  src={signupImage}
                  className="rounded-circle img-fluid"
                  alt={t('signup.header')}
                />
              </div>
              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h3 className="text-center mb-4">{t('signup.header')}</h3>
                <Form.Group className="mb-3 form-floating" controlId="username">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder={t('signup.username')}
                    autoComplete="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                    isInvalid={formik.errors.username || error}
                  />
                  <label htmlFor="username">{t('signup.username')}</label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username || error}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 form-floating" controlId="password">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={t('signup.password')}
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.errors.password}
                  />
                  <label htmlFor="password">{t('signup.password')}</label>
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
                    placeholder={t('signup.confirmPassword')}
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    isInvalid={formik.errors.confirmPassword}
                  />
                  <label htmlFor="confirmPassword">
                    {t('signup.confirmPassword')}
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
                  {t('signup.submitButton')}
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
