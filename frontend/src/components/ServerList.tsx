import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCurrentServer } from '../store/slices/uiSlice';
import { addServer } from '../store/slices/serversSlice';
import { Disc as Discord, Plus, Compass, Download, X } from 'lucide-react';

const ServerList: React.FC = () => {
  const dispatch = useDispatch();
  const { servers } = useSelector((state: RootState) => state.servers);
  const { currentServerId } = useSelector((state: RootState) => state.ui);
  const [showAddServerModal, setShowAddServerModal] = useState(false);
  const [newServerName, setNewServerName] = useState('');
  const [newServerIcon, setNewServerIcon] = useState('');

  const handleServerClick = (serverId: string) => {
    dispatch(setCurrentServer(serverId));
  };

  const handleAddServerClick = () => {
    setShowAddServerModal(true);
  };

  const handleCloseModal = () => {
    setShowAddServerModal(false);
    setNewServerName('');
    setNewServerIcon('');
  };

  const handleCreateServer = () => {
    if (newServerName.trim()) {
      const newServer = {
        id: `server-${Date.now()}`,
        name: newServerName,
        icon: newServerIcon || 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=74&q=80',
        channels: [
          {
            id: `channel-${Date.now()}`,
            name: 'general',
            type: 'text' as const,
            messages: [],
          },
          {
            id: `channel-${Date.now() + 1}`,
            name: 'voice-chat',
            type: 'voice' as const,
            messages: [],
          },
        ],
        members: [],
      };
      
      dispatch(addServer(newServer));
      dispatch(setCurrentServer(newServer.id));
      handleCloseModal();
    }
  };

  return (
    <div className="w-[72px] bg-[#1e1f22] flex flex-col items-center pt-3 space-y-2 overflow-y-auto">
      <div 
        className={`flex items-center justify-center w-12 h-12 rounded-full bg-[#5865f2] text-white cursor-pointer hover:rounded-2xl transition-all duration-200`}
      >
        <Discord size={28} />
      </div>
      
      <div className="w-8 h-[2px] bg-[#35363c] rounded-full my-1"></div>
      
      {servers.map((server) => (
        <div 
          key={server.id}
          className={`relative flex items-center justify-center w-12 h-12 rounded-[24px] bg-[#36393f] cursor-pointer hover:rounded-2xl transition-all duration-200 group ${
            currentServerId === server.id ? 'rounded-2xl' : 'rounded-full'
          }`}
          onClick={() => handleServerClick(server.id)}
        >
          {currentServerId === server.id && (
            <div className="absolute left-0 w-1 h-10 bg-white rounded-r-full"></div>
          )}
          {server.icon ? (
            <img 
              src={server.icon} 
              alt={server.name} 
              className="w-full h-full object-cover rounded-inherit"
            />
          ) : (
            <span className="text-white font-medium">{server.name.substring(0, 2)}</span>
          )}
          <div className="absolute left-0 scale-0 transform -translate-x-full bg-black text-white text-sm p-2 rounded pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap z-50">
            {server.name}
          </div>
        </div>
      ))}
      
      <div 
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#36393f] text-[#3ba55d] cursor-pointer hover:rounded-2xl hover:bg-[#3ba55d] hover:text-white transition-all duration-200 group"
        onClick={handleAddServerClick}
      >
        <Plus size={24} />
        <div className="absolute left-0 scale-0 transform -translate-x-full bg-black text-white text-sm p-2 rounded pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap z-50">
          Add a Server
        </div>
      </div>
      
      <div 
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#36393f] text-[#3ba55d] cursor-pointer hover:rounded-2xl hover:bg-[#3ba55d] hover:text-white transition-all duration-200 group"
      >
        <Compass size={24} />
        <div className="absolute left-0 scale-0 transform -translate-x-full bg-black text-white text-sm p-2 rounded pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap z-50">
          Explore Public Servers
        </div>
      </div>
      
      <div 
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#36393f] text-[#3ba55d] cursor-pointer hover:rounded-2xl hover:bg-[#3ba55d] hover:text-white transition-all duration-200 group"
      >
        <Download size={24} />
        <div className="absolute left-0 scale-0 transform -translate-x-full bg-black text-white text-sm p-2 rounded pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap z-50">
          Download Apps
        </div>
      </div>

      {/* Add Server Modal */}
      {showAddServerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#36393f] rounded-lg w-full max-w-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Create a Server</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Server Name
              </label>
              <input
                type="text"
                value={newServerName}
                onChange={(e) => setNewServerName(e.target.value)}
                className="w-full bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter server name"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Server Icon URL (optional)
              </label>
              <input
                type="text"
                value={newServerIcon}
                onChange={(e) => setNewServerIcon(e.target.value)}
                className="w-full bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter icon URL"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-[#4f545c] text-white px-4 py-2 rounded mr-2 hover:bg-[#5d6269]"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateServer}
                className="bg-[#5865f2] text-white px-4 py-2 rounded hover:bg-[#4752c4]"
                disabled={!newServerName.trim()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerList;