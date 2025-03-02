import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/slices/usersSlice';
import { X } from 'lucide-react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [status, setStatus] = useState<'online' | 'offline' | 'idle' | 'dnd'>('online');
  const [isBot, setIsBot] = useState(false);
  const [tag, setTag] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username.trim()) {
      const newUser = {
        id: `user-${Date.now()}`,
        username,
        avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80',
        status,
        isBot,
        tag: tag || undefined,
      };
      
      dispatch(addUser(newUser));
      onClose();
      
      // Reset form
      setUsername('');
      setAvatar('');
      setStatus('online');
      setIsBot(false);
      setTag('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#36393f] rounded-lg w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Add New User</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Avatar URL (optional)
            </label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter avatar URL"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="online">Online</option>
              <option value="idle">Idle</option>
              <option value="dnd">Do Not Disturb</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Tag (optional)
            </label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tag (e.g. 'Playing music')"
            />
          </div>
          
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="isBot"
              checked={isBot}
              onChange={(e) => setIsBot(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="isBot" className="text-gray-300 text-sm">
              Is this a bot?
            </label>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#4f545c] text-white px-4 py-2 rounded mr-2 hover:bg-[#5d6269]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#5865f2] text-white px-4 py-2 rounded hover:bg-[#4752c4]"
              disabled={!username.trim()}
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;