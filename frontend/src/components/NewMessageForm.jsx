import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMessage } from '../slices/messagesSlice.js';
import { socket } from '../socket.js';
import { useSendMessageMutation } from '../api.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import handleResponseError from '../utils/handleResponseErrors.js';
import checkBadWords from '../utils/checkBadWords.js';

const NewMessageForm = () => {
  const [error, setError] = useState('');
  const { activeChannelId } = useSelector((state) => state.channelsReducer);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const user = JSON.parse(localStorage.getItem('userId')).username;

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addNewMessage(payload));
      console.log('socket new message', payload);
    });
    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const formik = useFormik({
    initialValues: {
      body: '',
    },

    onSubmit: async ({ body }) => {
      try {
        const filteredMessage = {
          body: checkBadWords(body),
          channelId: activeChannelId,
          user: user,
        };
        const response = await sendMessage(filteredMessage);
        console.log('submitted message response', response);

        if (response.error) {
          throw response.error;
        } else {
          setError('');
          toast.success(t('newMessageForm.messageSent'));
          formik.resetForm();
        }
      } catch (err) {
        console.log(err);
        handleResponseError(err, setError, t);
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
          placeholder={t('newMessageForm.formPlaceholder')}
          aria-label={t('newMessageForm.ariaLabel')}
          onChange={formik.handleChange}
          value={formik.values.body}
          isInvalid={error}
          ref={inputRef}
          required
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="btn-group-vertical rounded"
          variant="outline-primary"
        >
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
          <span className="visually-hidden">{t('newMessageForm.send')}</span>
        </Button>
        <Form.Control.Feedback type="invalid" tooltip>
          {error}
        </Form.Control.Feedback>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
