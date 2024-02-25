import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { validateChannel } from '../../utils/validate.js';
import { useAddChannelsMutation } from '../../api.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import checkBadWords from '../../utils/checkBadWords.js';

const NewChannelModal = () => {
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const inputRef = useRef(null);

  const { channels } = useSelector((state) => state.channelsReducer);

  const handleClose = () => {
    setShow(false);
    setError('');
    formik.resetForm();
  };
  const handleShow = () => setShow(true);

  const [addChannels] = useAddChannelsMutation();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async ({ name }) => {
      try {
        const channelNamesArray = channels.map((channel) => channel.name);
        console.log('channelNamesArray', channelNamesArray);
        await validateChannel(name, channelNamesArray);
        const filteredChannel = { name: checkBadWords(name) };

        const response = await addChannels(filteredChannel);

        console.log('submitted channel response', response);

        toast.success(t('channelModals.channelAdded'));

        setError('');
        handleClose();
        formik.resetForm();
      } catch (err) {
        setError(err.message);
      }
      inputRef.current.focus();
    },
  });

  return (
    <>
      <Button
        variant=""
        className="p-0 text-primary btn-group-vertical"
        onClick={handleShow}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="20"
          height="20"
          fill="currentColor"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        <span className="visually-hidden" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('channelModals.addChannelHeader')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="addChannel">
              <Form.Control
                type="text"
                name="name"
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                isInvalid={error}
                ref={inputRef}
              />

              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={handleClose}
              >
                {t('channelModals.cancelButton')}
              </Button>
              <Button variant="primary" type="submit">
                {t('channelModals.submitButton')}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewChannelModal;
