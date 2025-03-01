import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { disconnectFromVoiceChannel } from '../store/slices/uiSlice';
import { toggleMicMute } from '../store/slices/usersSlice'; // Make sure this import matches your actual action


const VoiceConnectedBar: React.FC = () => {
  const dispatch = useDispatch();
  const { connectedToVoice, currentVoiceChannelName, currentVoiceChannelId } = useSelector((state: RootState) => state.ui);
  const { currentServerId } = useSelector((state: RootState) => state.ui);
  const { servers } = useSelector((state: RootState) => state.servers);
  const { isMicMuted } = useSelector((state: RootState) => state.users);
  
  // Create refs for the audio elements
  const disconnectSoundRef = useRef<HTMLAudioElement | null>(null);
  const micToggleSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize the audio elements when component mounts
  useEffect(() => {
    disconnectSoundRef.current = new Audio('/public/Disconnect.mp3');
    micToggleSoundRef.current = new Audio('/public/mute.mp3');
    
    return () => {
      disconnectSoundRef.current = null;
      micToggleSoundRef.current = null;
    };
  }, []);
  
  const currentServer = servers.find(server => server.id === currentServerId);
  
  if (!connectedToVoice || !currentVoiceChannelId || !currentServer) return null;
  
  const handleDisconnect = () => {
    // Play the disconnect sound
    if (disconnectSoundRef.current) {
      disconnectSoundRef.current.currentTime = 0;
      disconnectSoundRef.current.play()
        .catch(error => console.error('Error playing disconnect sound:', error));
    }
    
    // Dispatch the disconnect action
    dispatch(disconnectFromVoiceChannel());
  };
  
  const handleMicToggle = () => {
    // Play the mic toggle sound
    if (micToggleSoundRef.current) {
      micToggleSoundRef.current.currentTime = 0;
      micToggleSoundRef.current.play()
        .catch(error => console.error('Error playing mic toggle sound:', error));
    }
    
    // Dispatch the mic toggle action
    dispatch(toggleMicMute());
  };
  
  return ( 
    <div className="voicediv fixed z-50">
    <div className="bg-[#232428] rounded-md shadow-lg overflow-hidden w-full">
      {/* Top section with Voice Connected status and controls */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Voice Connected with icon */}
          <div className="text-[#43b581] flex items-center">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="mr-1">
              <path d="M3 9.5c1-1 2.5-1.5 4-1.5 3 0 5.5 2.5 5.5 5.5 0 1.5-.5 3-1.5 4m-10-10c2-2 5-3 8-3 6 0 11 5 11 11 0 3-1 6-3 8"></path>
              <path d="M3 9.5c1-1 2.5-1.5 4-1.5 3 0 5.5 2.5 5.5 5.5 0 1.5-.5 3-1.5 4"></path>
              <path d="M3 9.5c1-1 2.5-1.5 4-1.5 3 0 5.5 2.5 5.5 5.5 0 1.5-.5 3-1.5 4"></path>
            </svg>
            <span className="font-medium">Voice Connected</span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          {/* Audio visualization */}
          <div className="h-6 flex items-center">
            <div className="h-3 w-1 bg-gray-400 mx-[1px] rounded-sm"></div>
            <div className="h-5 w-1 bg-gray-400 mx-[1px] rounded-sm"></div>
            <div className="h-4 w-1 bg-gray-400 mx-[1px] rounded-sm"></div>
            <div className="h-2 w-1 bg-gray-400 mx-[1px] rounded-sm"></div>
          </div>

          {/* Phone icon */}
          <div className="w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleDisconnect} >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="red">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z"></path>
            </svg>

          </div>
        </div>
      </div>

      {/* Channel name */}
      <div className="px-3 pb-2 text-gray-400 text-sm">
        {currentServer.name} / {currentVoiceChannelName}
      </div>

      {/* Bottom control buttons */}
      <div className="flex justify-between bg-[#1e1f22] p-2">
        {/* Mute button */}
        <button
          className={`w-[70px] h-[50px] flex items-center justify-center ${isMicMuted ? "bg-[#ed4245]" : "bg-[#2b2d31]"} rounded-md ${!isMicMuted && "hover:bg-[#36393f]"}`}
          onClick={handleMicToggle}
        >
          {isMicMuted ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M19.74 4.26a1 1 0 0 0-1.48 0L10.74 12H10a4 4 0 0 1-4-4V6a4 4 0 0 1 7.92-.8l1.14-1.14A6 6 0 0 0 4 6v2a6 6 0 0 0 5 5.91V16h2v-2.09a5.92 5.92 0 0 0 1.74-.69l5.52 5.52a1 1 0 0 0 1.48-1.48z"></path>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M12 2a4 4 0 0 0-4 4v4a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4zm2 8a2 2 0 0 1-4 0V6a2 2 0 0 1 4 0v4z"></path>
              <path d="M19 10h-1a6 6 0 0 1-12 0H5a8 8 0 0 0 7 7.93V20H8v2h8v-2h-4v-2.07A8 8 0 0 0 19 10z"></path>
            </svg>
          )}
        </button>

        {/* Screen share button */}
        <button className="w-[70px] h-[50px] flex items-center justify-center bg-[#2b2d31] rounded-md hover:bg-[#36393f]">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12z"></path>
            <path d="M10 9h4v6h-4z"></path>
          </svg>
        </button>

        {/* Video button */}
        <button className="w-[70px] h-[50px] flex items-center justify-center bg-[#2b2d31] rounded-md hover:bg-[#36393f]">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M21 6.5l-7 3.5v-3c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-3l7 3.5V6.5z"></path>
          </svg>
        </button>

        {/* Disconnect button */}
        <button
          className="w-[70px] h-[50px] flex items-center justify-center bg-[#2b2d31] rounded-md hover:bg-[#36393f]"
          onClick={handleDisconnect}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9L7.1 5.69C8.45 4.63 10.15 4 12 4zM4 12c0-1.85.63-3.55 1.69-4.9l11.21 11.21C15.55 19.37 13.85 20 12 20c-4.42 0-8-3.58-8-8z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>

  );
};

export default VoiceConnectedBar;