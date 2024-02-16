import { Dropdown } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { renameChannel } from '../../slices/channelsSlice.js';
import { Button, Form, Modal } from 'react-bootstrap';
import getActiveChannelName from '../../utils/getActiveChannelName.js';
import validate from '../../utils/validate.js';

const RenameChannelModal = () => {
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { channels, activeChannelId } = useSelector(
    (state) => state.channelsReducer
  );
  console.log('channels in rename channel', channels, activeChannelId);

  const currentChannelName = getActiveChannelName(channels, activeChannelId);
  console.log('currentChannelName', currentChannelName);

  const handleClose = () => {
    setShow(false);
    setError('');
    formik.resetForm();
  };
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      name: currentChannelName,
    },
    onSubmit: async (values) => {
      values.currentId = activeChannelId;
      try {
        const channelNamesArray = channels.map((channel) => channel.name);
        await validate(values.name, channelNamesArray);
        dispatch(renameChannel(values));
        setError('');
        handleClose();
        formik.resetForm();
        console.log('renamed channels', channels);
      } catch (err) {
        setError(err.message);
      }
      inputRef.current.focus();
    },
  });

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Переименовать</Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
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
                Отменить
              </Button>
              <Button variant="primary" type="submit">
                Отправить
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameChannelModal;
