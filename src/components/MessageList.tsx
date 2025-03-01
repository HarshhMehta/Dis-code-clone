import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Play, ExternalLink } from 'lucide-react';

const MessageList: React.FC = () => {
  const { currentChannelId } = useSelector((state: RootState) => state.ui);
  const { messages } = useSelector((state: RootState) => state.messages);
  
  const channelMessages = messages[currentChannelId] || [];
  
  const renderAttachment = (message: any) => {
    if (!message.attachments || message.attachments.length === 0) return null;
    
    const attachment = message.attachments[0];
    
    if (attachment.type === 'link' && attachment.title?.includes('Arijit Singh')) {
      return (
        <div className="mt-2 max-w-md">
          <div className="border-l-4 border-[#5865f2] bg-[#2b2d31] rounded-r overflow-hidden">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Arijit Singh" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="absolute top-0 left-0 w-full p-4">
                  <div className="text-yellow-300 text-xl font-bold">100 Million + views</div>
                </div>
                <div className="absolute bottom-0 right-0 w-full p-4 text-right">
                  <div className="text-white text-xl font-bold">MIRCHI MUSIC AWARDS</div>
                  <div className="text-yellow-300 text-xl font-bold">ARIJIT SINGH SOULFUL PERFORMANCE</div>
                </div>
                <button className="w-12 h-12 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                  <Play size={24} className="text-white ml-1" />
                </button>
                <button className="absolute bottom-4 left-4 w-8 h-8 rounded bg-black bg-opacity-50 flex items-center justify-center">
                  <ExternalLink size={16} className="text-white" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="text-blue-400 text-sm hover:underline">
                {attachment.title}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#313338]">
      {channelMessages.map((message) => (
        <div key={message.id} className="flex group">
          {!message.isDeleted && (
            <div className="flex-shrink-0 mr-4">
              <img 
                src={message.author.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80'} 
                alt={message.author.username} 
                className="w-10 h-10 rounded-full"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            {!message.isDeleted && (
              <div className="flex items-center">
                <span className="font-medium text-white mr-2">{message.author.username}</span>
                {message.author.isBot && (
                  <span className="bg-[#5865f2] text-white text-xs px-1 rounded">APP</span>
                )}
                <span className="text-xs text-gray-400 ml-2">{message.timestamp}</span>
              </div>
            )}
            
            <div className={`mt-1 ${message.isDeleted ? 'text-gray-500 italic text-sm' : 'text-gray-200'}`}>
              {message.content}
            </div>
            
            {renderAttachment(message)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;