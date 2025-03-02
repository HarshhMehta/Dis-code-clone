import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCurrentChannel } from '../store/slices/uiSlice';
import { toggleMicMute, toggleDeafen } from '../store/slices/usersSlice';
import { connectToVoiceChannel, disconnectFromVoiceChannel } from '../store/slices/uiSlice';
import { ChevronDown, Hash, Volume2, Plus, Settings, Headphones, Mic, MicOff } from 'lucide-react';

const ChannelList: React.FC = () => {
  const dispatch = useDispatch();
  const { currentServerId, currentChannelId, currentVoiceChannelId } = useSelector((state: RootState) => state.ui);
  const { servers } = useSelector((state: RootState) => state.servers);
  const { currentUser, isMicMuted, isDeafened } = useSelector((state: RootState) => state.users);
  
  const [textChannelsOpen, setTextChannelsOpen] = useState(true);
  const [voiceChannelsOpen, setVoiceChannelsOpen] = useState(true);
  
  const joinSoundRef = useRef<HTMLAudioElement | null>(null);
  const micToggleSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    joinSoundRef.current = new Audio('/Connect.mp3');
  }, []);

  useEffect(() => {
    
    micToggleSoundRef.current = new Audio('/mute.mp3');
    
    return () => {
      
      micToggleSoundRef.current = null;
    };
  }, []);

  
  
  const currentServer = servers.find(server => server.id === currentServerId);
  
  if (!currentServer) return null;
  
  const textChannels = currentServer.channels.filter(channel => channel.type === 'text');
  const voiceChannels = currentServer.channels.filter(channel => channel.type === 'voice');
  
  const handleChannelClick = (channelId: string, channelType: 'text' | 'voice', channelName: string) => {
    dispatch(setCurrentChannel(channelId));
    
    if (channelType === 'voice') {
      if (currentVoiceChannelId === channelId) {
        // Disconnect if clicking the same voice channel
        dispatch(disconnectFromVoiceChannel());
      } else {
        // Connect to voice channel and play sound
        dispatch(connectToVoiceChannel({ channelId, channelName }));
        if (joinSoundRef.current) {
          joinSoundRef.current.play().catch(e => console.error("Error playing sound:", e));
        }
      }
    }
  };

  const handleMicToggle = () => {
    if (micToggleSoundRef.current) {
      micToggleSoundRef.current.currentTime = 0;
      micToggleSoundRef.current.play()
        .catch(error => console.error('Error playing mic toggle sound:', error));
    }
    
    dispatch(toggleMicMute());
  };

  const handleDeafenToggle = () => {
    dispatch(toggleDeafen());
  };
  
  
  return (
    <div className="w-60 bg-[#2b2d31] flex flex-col h-full">
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#1f2023] shadow-sm cursor-pointer hover:bg-[#35373c]">
        <h2 className="font-semibold text-white truncate">{currentServer.name}</h2>
        <ChevronDown size={20} className="text-gray-400" />
      </div>
      
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
        <div>
          <div 
            className="flex items-center px-1 mb-1 text-xs font-semibold text-gray-400 cursor-pointer"
            onClick={() => setTextChannelsOpen(!textChannelsOpen)}
          >
            <ChevronDown size={12} className={`mr-1 transition-transform ${textChannelsOpen ? '' : '-rotate-90'}`} />
            <span>TEXT CHANNELS</span>
            <Plus size={14} className="ml-auto text-gray-400 hover:text-gray-200" />
          </div>
          
          {textChannelsOpen && (
            <div className="space-y-0.5">
              {textChannels.map(channel => (
                <div 
                  key={channel.id}
                  className={`group flex items-center px-2 py-1 rounded hover:bg-[#35373c] cursor-pointer ${
                    currentChannelId === channel.id ? 'bg-[#35373c] text-white' : 'text-gray-400'
                  }`}
                  onClick={() => handleChannelClick(channel.id, 'text', channel.name)}
                >
                  <Hash size={20} className="mr-1.5 text-gray-400" />
                  <span className="truncate">{channel.name}</span>
                  <div className="ml-auto hidden group-hover:flex space-x-1">
                    <Settings size={16} className="text-gray-400 hover:text-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <div 
            className="flex items-center px-1 mb-1 text-xs font-semibold text-gray-400 cursor-pointer"
            onClick={() => setVoiceChannelsOpen(!voiceChannelsOpen)}
          >
            <ChevronDown size={12} className={`mr-1 transition-transform ${voiceChannelsOpen ? '' : '-rotate-90'}`} />
            <span>VOICE CHANNELS</span>
            <Plus size={14} className="ml-auto text-gray-400 hover:text-gray-200" />
          </div>
          
          {voiceChannelsOpen && (
            <div className="space-y-0.5">
              {voiceChannels.map(channel => (
                <div 
                  key={channel.id}
                  className={`group flex items-center px-2 py-1 rounded hover:bg-[#35373c] cursor-pointer ${
                    currentVoiceChannelId === channel.id ? 'bg-[#35373c] text-white' : 'text-gray-400'
                  }`}
                  onClick={() => handleChannelClick(channel.id, 'voice', channel.name)}
                >
                  <Volume2 size={20} className="mr-1.5 text-gray-400" />
                  <span className="truncate">{channel.name}</span>
                  
                  {currentVoiceChannelId === channel.id && (
                    <div className="ml-2 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    </div>
                  )}
                  
                  <div className="ml-auto hidden group-hover:flex space-x-1">
                    <Settings size={16} className="text-gray-400 hover:text-gray-200" />
                  </div>
                </div>
              ))}
              
              {/* Connected users in voice channel */}
              {currentVoiceChannelId && (
                <div className="pl-8 mt-1">
                  <div className="flex items-center text-gray-300 text-sm">
                    <div className="relative mr-2">
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.username} 
                        className="w-6 h-6 rounded-full"
                      />
                      <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-[#2b2d31] bg-green-500"></div>
                    </div>
                    <span>{currentUser.username}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="h-[52px] px-2 bg-[#232428] flex items-center">
        <div className="flex items-center flex-1">
          <div className="w-8 h-8 rounded-full bg-gray-700 mr-2 relative">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.username} 
              className="w-full h-full rounded-full object-cover"
            />
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#232428] ${
              currentUser.status === 'online' ? 'bg-green-500' : 
              currentUser.status === 'idle' ? 'bg-yellow-500' : 
              currentUser.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'
            }`}></div>
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-medium text-white truncate">{currentUser.username}</div>
            <div className="text-xs text-gray-400 truncate">#{currentUser.tag || 'Idle'}</div>
          </div>
        </div>
        <div className="flex space-x-1">
          <button 
            className={`w-8 h-8 flex items-center justify-center ${isMicMuted ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-gray-200'} bg-transparent rounded`}
            onClick={handleMicToggle}
            title={isMicMuted ? "Unmute" : "Mute"}
          >
            {isMicMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <button 
            className={`w-8 h-8 flex items-center justify-center ${isDeafened ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-gray-200'} bg-transparent rounded`}
            onClick={handleDeafenToggle}
            title={isDeafened ? "Undeafen" : "Deafen"}
          >
            <Headphones size={20} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-200 bg-transparent rounded">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
