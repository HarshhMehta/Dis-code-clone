import { Provider } from 'react-redux';
import { store } from '../store';
import ServerList from '../components/ServerList';
import ChannelList from '../components/ChannelList';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import MemberList from '../components/MemberList';
import VoiceConnectedBar from '../components/VoiceConnectedBar';

function Dashboard() {
  return (
    <Provider store={store}>
      <div className="flex h-screen bg-[#313338] text-white overflow-hidden">
        <ServerList />
        <ChannelList />
        
        <div className="flex-1 flex flex-col">
          <ChatHeader />
          <MessageList />
          <MessageInput />
          <VoiceConnectedBar />
        </div>
        
        <MemberList />
      </div>
    </Provider>
  );
}

export default Dashboard;