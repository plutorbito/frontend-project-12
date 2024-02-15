import { useSelector, useDispatch } from 'react-redux';
import { setActiveChannel } from '../slices/channelsSlice.js';
import NewChannelModal from './NewChannelModal.jsx';

const ChannelsBox = () => {
  const { channels, activeChannelId } = useSelector(
    (state) => state.channelsReducer
  );
  console.log('channels in channelbox', channels, activeChannelId);

  const dispatch = useDispatch();

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <NewChannelModal />
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            <button
              type="button"
              id={channel.id}
              className={
                channel.id === activeChannelId
                  ? 'w-100 rounded-0 text-start btn btn-secondary'
                  : 'w-100 rounded-0 text-start btn'
              }
              onClick={() => dispatch(setActiveChannel(channel.id))}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsBox;
