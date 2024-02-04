import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import loginImage from '../assets/login.jpg';
import { Link } from 'react-router-dom';

const LoginPage = () => (
  <div className="container-fluid h-100">
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
            <Formik initialValues={{ name: '', password: '' }}>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                <h3 className="text-center mb-4">Войти</h3>
                <Form.Group className="mb-3 form-floating" controlId="formName">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder={'Ваш ник'}
                  />
                  <label htmlFor="username">{'Ваш ник'}</label>
                </Form.Group>
                <Form.Group
                  className="mb-3 form-floating"
                  controlId="formPassword"
                >
                  <Form.Control
                    type="text"
                    name="password"
                    placeholder={'Ваш пароль'}
                  />
                  <label htmlFor="username">{'Ваш пароль'}</label>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                >
                  Войти
                </Button>
              </Form>
            </Formik>
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

export default LoginPage;
