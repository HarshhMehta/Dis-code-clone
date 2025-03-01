import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Plus } from 'lucide-react';
import AddUserModal from './AddUserModal';

const MemberList: React.FC = () => {
  const { onlineUsers, offlineUsers } = useSelector((state: RootState) => state.users);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  
  const renderUserStatus = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="w-60 bg-[#2b2d31] overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-semibold text-gray-400">ONLINE — {onlineUsers.length}</h3>
          <button 
            className="text-gray-400 hover:text-gray-200 p-1 rounded hover:bg-[#36393f]"
            onClick={() => setIsAddUserModalOpen(true)}
            title="Add User"
          >
            <Plus size={14} />
          </button>
        </div>
        
        <div className="space-y-2">
          {onlineUsers.map(user => (
            <div key={user.id} className="flex items-center">
              <div className="relative mr-3">
                <img 
                  src={user.avatar} 
                  alt={user.username} 
                  className="w-8 h-8 rounded-full"
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2b2d31] ${renderUserStatus(user.status)}`}></div>
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-gray-200 text-sm font-medium">{user.username}</span>
                  {user.isBot && (
                    <span className="ml-2 bg-[#5865f2] text-white text-xs px-1 rounded">APP</span>
                  )}
                </div>
                {user.tag && (
                  <div className="text-xs text-gray-400">{user.tag}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-gray-400 mb-2">OFFLINE — {offlineUsers.length}</h3>
          <div className="space-y-2">
            {offlineUsers.map(user => (
              <div key={user.id} className="flex items-center opacity-50">
                <div className="relative mr-3">
                  <img 
                    src={user.avatar} 
                    alt={user.username} 
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2b2d31] bg-gray-500"></div>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-gray-400 text-sm font-medium">{user.username}</span>
                    {user.isBot && (
                      <span className="ml-2 bg-[#5865f2] text-white text-xs px-1 rounded">APP</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <AddUserModal 
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />
    </div>
  );
};

export default MemberList;