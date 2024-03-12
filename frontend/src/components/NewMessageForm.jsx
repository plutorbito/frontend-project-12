import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSendMessageMutation, backendApi } from '../api.js';
import handleResponseError from '../utils/handleResponseErrors.js';
import checkBadWords from '../utils/checkBadWords.js';
import useSocket from '../hooks/useSocket.jsx';
import useAuth from '../hooks/useAuth.jsx';

const NewMessageForm = () => {
  const [error, setError] = useState('');
  const { activeChannelId } = useSelector((state) => state.channelsReducer);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { username } = useAuth();

  const socket = useSocket();

  useEffect(() => {
    const handleNewMessage = (payload) => {
      dispatch(
        backendApi.util.updateQueryData(
          'getMessages',
          undefined,
          (draftMassages) => {
            draftMassages.push(payload);
          },
        ),
      );
    };

    socket.on('newMessage', handleNewMessage);
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [dispatch, socket]);

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const formik = useFormik({
    initialValues: {
      body: '',
    },

    onSubmit: async ({ body }) => {
      const filteredMessage = {
        body: checkBadWords(body),
        channelId: activeChannelId,
        user: username,
      };
      const response = await sendMessage(filteredMessage);
      if (response.error) {
        setError(t(handleResponseError(response.error)));
      } else {
        setError('');
        formik.resetForm();
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
            />
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
