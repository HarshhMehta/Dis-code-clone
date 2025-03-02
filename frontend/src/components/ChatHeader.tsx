import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Hash, Bell, Pin, Users, Inbox, MailQuestion as QuestionMark, Search } from 'lucide-react';

const ChatHeader: React.FC = () => {
  const { currentServerId, currentChannelId } = useSelector((state: RootState) => state.ui);
  const { servers } = useSelector((state: RootState) => state.servers);
  
  const currentServer = servers.find(server => server.id === currentServerId);
  const currentChannel = currentServer?.channels.find(channel => channel.id === currentChannelId);
  
  if (!currentChannel) return null;
  
  return (
    <div className="h-12 px-4 border-b border-[#1f2023] flex items-center justify-between bg-[#313338]">
      <div className="flex items-center">
        <Hash size={24} className="mr-2 text-gray-400" />
        <span className="font-semibold text-white">{currentChannel.name}</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-gray-200">
          <Bell size={20} />
        </button>
        <button className="text-gray-400 hover:text-gray-200">
          <Pin size={20} />
        </button>
        <button className="text-gray-400 hover:text-gray-200">
          <Users size={20} />
        </button>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-[#1e1f22] text-gray-200 text-sm rounded px-2 py-1 w-36 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          <Search size={16} className="absolute right-2 top-1.5 text-gray-400" />
        </div>
        
        <button className="text-gray-400 hover:text-gray-200">
          <Inbox size={20} />
        </button>
        <button className="text-gray-400 hover:text-gray-200">
          <QuestionMark size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;