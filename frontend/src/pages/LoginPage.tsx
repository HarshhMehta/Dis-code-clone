import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Disc } from 'lucide-react';
import { loginUser } from '../store/slices/authSlice';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password
      }, { withCredentials: true });
      
      dispatch(loginUser(response.data.user));
      navigate('/app');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#404EED] bg-gradient-to-b from-[#404EED] to-[#2F3136] flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex items-center text-white">
          <Disc className="h-8 w-8 mr-2" />
          <span className="text-2xl font-bold">Discord</span>
        </Link>
      </div>
      
      <div className="bg-[#36393f] rounded-lg w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-bold">Welcome back!</h1>
          <p className="text-[#b9bbbe] mt-1">We're so excited to see you again!</p>
        </div>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#b9bbbe] text-xs font-bold uppercase mb-2">
              EMAIL OR PHONE NUMBER <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[#b9bbbe] text-xs font-bold uppercase">
                PASSWORD <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="mt-2">
              <Link to="/forgot-password" className="text-[#00aff4] text-sm hover:underline">
                Forgot your password?
              </Link>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#5865f2] text-white py-3 rounded font-medium hover:bg-[#4752c4] transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
          
          <div className="mt-4 text-sm text-[#b9bbbe]">
            Need an account? <Link to="/register" className="text-[#00aff4] hover:underline">Register</Link>
          </div>
        </form>
        
       
                
           
      
      </div>
    </div>
  );
};

export default LoginPage;