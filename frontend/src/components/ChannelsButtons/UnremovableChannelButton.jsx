import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setActiveChannel } from '../../slices/channelsSlice';

const UnremovableChannelButton = ({ channel }) => {
  const dispatch = useDispatch();
  const { activeChannelId } = useSelector((state) => state.channelsReducer);

  return (
    <Button
      type="button"
      id={channel.id}
      className="w-100 rounded-0 text-start text-truncate"
      onClick={() => dispatch(setActiveChannel(channel.id))}
      variant={channel.id === activeChannelId ? 'secondary' : null}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
};

export default UnremovableChannelButton;
