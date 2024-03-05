import { useRef, useEffect } from 'react';
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
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { channels } = useSelector((state) => state.channelsReducer);

  const handleClose = () => {
    closeModal();
  };

  const [addChannels] = useAddChannelsMutation();

  const { t } = useTranslation();

  const channelNamesArray = channels.map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validateChannel(channelNamesArray, t),
    validateOnChange: false,
    onSubmit: async ({ name }) => {
      const filteredChannel = { name: checkBadWords(name) };

      const response = await addChannels(filteredChannel);
      console.log(response);
      dispatch(setActiveChannel(response.data.id));

      console.log('submitted channel response', response);

      toast.success(t('channelModals.channelAdded'));

      handleClose();
      formik.resetForm();
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
              isInvalid={formik.errors.name}
              ref={inputRef}
            />
            <label className="visually-hidden" htmlFor="name">
              {t('channelModals.channelName')}
            </label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
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
