import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { validateChannel } from '../../utils/validate.js';
import { useAddChannelsMutation } from '../../api.js';
import checkBadWords from '../../utils/checkBadWords.js';
import { setActiveChannel } from '../../slices/channelsSlice.js';

const NewChannelModal = ({ closeModal }) => {
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { channels } = useSelector((state) => state.channelsReducer);

  const handleClose = () => {
    setError('');
    closeModal();
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
        // await validateChannel(name, channelNamesArray);
        const filteredChannel = { name: checkBadWords(name) };
        await validateChannel(filteredChannel.name, channelNamesArray);

        const response = await addChannels(filteredChannel);
        dispatch(setActiveChannel(response.data.id));

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
    <Modal show onHide={handleClose}>
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
            <label className="visually-hidden" htmlFor="name">
              {t('channelModals.channelName')}
            </label>
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              {t('channelModals.cancelButton')}
            </Button>
            <Button variant="primary" type="submit">
              {t('channelModals.submitButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewChannelModal;
