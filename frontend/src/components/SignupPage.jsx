import { useFormik } from 'formik';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import signupImage from '../assets/signup.png';
import useAuth from '../hooks/index.jsx';
import { signupFormSchema } from '../utils/validate.js';
import { useSendNewUserDataMutation } from '../api.js';
import handleResponseError from '../utils/handleResponseErrors.js';
import handleSignupAndLoginResponse from '../utils/handleSignupAndLoginResponse.js';

const SignupPage = () => {
  const [error, setError] = useState('');
  const { logIn } = useAuth();
  const location = useLocation();
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
    validationSchema: signupFormSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const response = await sendNewUserData(values);
        console.log('signup response', response);

        if (response.error) {
          throw response.error;
        } else {
          handleSignupAndLoginResponse(
            response,
            logIn,
            setError,
            navigate,
            location,
          );
        }
      } catch (err) {
        console.log(err);
        handleResponseError(err, setError, t);
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
