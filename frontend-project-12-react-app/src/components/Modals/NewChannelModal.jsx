import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { validateChannel } from '../../utils/validate.js';
import { useAddChannelsMutation } from '../../api.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import checkBadWords from '../../utils/checkBadWords.js';

const NewChannelModal = ({ closeModal }) => {
  const [error, setError] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { channels } = useSelector((state) => state.channelsReducer);

  const handleClose = () => {
    setError('');
    closeModal();
    formik.resetForm();
  };

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
      <Modal show={true} onHide={handleClose}>
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
