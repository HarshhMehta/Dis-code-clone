import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addMessage } from '../store/slices/messagesSlice';
import { PlusCircle, Gift, Sticker, AArrowDown as GIF, Smile } from 'lucide-react';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  
  const { currentChannelId } = useSelector((state: RootState) => state.ui);
  const { currentUser } = useSelector((state: RootState) => state.users);
  const { servers } = useSelector((state: RootState) => state.servers);
  const { currentServerId } = useSelector((state: RootState) => state.ui);
  
  const currentServer = servers.find(server => server.id === currentServerId);
  const currentChannel = currentServer?.channels.find(channel => channel.id === currentChannelId);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      content: message,
      timestamp: new Date().toLocaleString(),
      author: currentUser,
    };
    
    dispatch(addMessage({ channelId: currentChannelId, message: newMessage }));
    setMessage('');
  };
  
  if (!currentChannel) return null;
  
  return (
    <div className="px-4 pb-6 pt-2 bg-[#313338]">
      <form onSubmit={handleSubmit} className="relative">
        <button 
          type="button" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
        >
          <PlusCircle size={20} />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message #${currentChannel.name}`}
          className="w-full bg-[#383a40] text-gray-200 rounded-md py-2.5 px-12 focus:outline-none"
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-gray-400">
          <button type="button" className="hover:text-gray-200">
            <Gift size={20} />
          </button>
          <button type="button" className="hover:text-gray-200">
            <GIF size={20} />
          </button>
          <button type="button" className="hover:text-gray-200">
            <Sticker size={20} />
          </button>
          <button type="button" className="hover:text-gray-200">
            <Smile size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;