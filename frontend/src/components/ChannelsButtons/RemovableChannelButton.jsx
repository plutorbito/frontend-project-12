import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setActiveChannel } from '../../slices/channelsSlice';

const RemovableChannelButton = ({ channel, openModal }) => {
  const dispatch = useDispatch();
  const { activeChannelId } = useSelector((state) => state.channelsReducer);
  const { t } = useTranslation();

  return (
    <Dropdown
      as={ButtonGroup}
      className="d-flex"
      onClick={() => dispatch(setActiveChannel(channel.id))}
    >
      <Button
        type="button"
        key={channel.id}
        className="w-100 rounded-0 text-start text-truncate"
        variant={channel.id === activeChannelId ? 'secondary' : null}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle
        split
        className="flex-grow-0"
        variant={channel.id === activeChannelId ? 'secondary' : null}
      >
        <span className="visually-hidden">
          {t('channelModals.manageChannel')}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => openModal('removing')}>
          {t('channelModals.deleteDropdown')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => openModal('renaming')}>
          {t('channelModals.renameDropdown')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RemovableChannelButton;
