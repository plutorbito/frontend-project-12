import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes';
import getAuthHeader from '../utils/getAuthHeader';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMessage } from '../slices/messagesSlice.js';

const NewMessageForm = () => {
  const [error, setError] = useState('');
  const { activeChannelId } = useSelector((state) => state.channelsReducer);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('userId')).username;

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('newMessage', (payload) => {
      dispatch(addNewMessage(payload));
      console.log('socket new message', payload);
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      body: '',
      channelId: '',
      user: user,
    },
    onSubmit: async (values) => {
      values.channelId = activeChannelId;
      try {
        const response = await axios.post(routes.messagesPath(), values, {
          headers: getAuthHeader(),
        });

        console.log('submitted message response', response);
        formik.resetForm();
      } catch (err) {
        setError('Ошибка отправки сообщения');
      }
      inputRef.current.focus();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <InputGroup has-validation={error}>
        <Form.Control
          className="border-0 p-0 ps-2 form-control"
          type="text"
          name="body"
          placeholder={'Введите сообщение...'}
          onChange={formik.handleChange}
          value={formik.values.body}
          isInvalid={error}
          ref={inputRef}
        />

        <Button type="submit" disabled="" className="btn btn-group-vertical">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            ></path>
          </svg>
          <span className="visually-hidden">Отправить</span>
        </Button>
        <Form.Control.Feedback type="invalid" tooltip>
          {error}
        </Form.Control.Feedback>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
