import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Disc } from 'lucide-react';
import { loginUser } from '../store/slices/authSlice';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState({
    month: '',
    day: '',
    year: ''
  });
  const [acceptEmails, setAcceptEmails] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !username || !displayName || !password || !dateOfBirth.month || !dateOfBirth.day || !dateOfBirth.year) {
      setError('Please fill in all required fields');
      return;
    }
    
    const dobString = `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/register`, {
        email,
        username,
        displayName,
        password,
        dateOfBirth: dobString
      }, { withCredentials: true });
      
      dispatch(loginUser(response.data.user));
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generate month options
  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];
  
  // Generate day options (1-31)
  const days = Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }));
  
  // Generate year options (1900-current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => ({ value: String(currentYear - i), label: String(currentYear - i) })
  );
  
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
          <h1 className="text-white text-2xl font-bold">Create an account</h1>
        </div>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#b9bbbe] text-xs font-bold uppercase mb-2">
              EMAIL <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-[#b9bbbe] text-xs font-bold uppercase mb-2">
              DISPLAY NAME
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-[#b9bbbe] text-xs font-bold uppercase mb-2">
              USERNAME <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-[#b9bbbe] text-xs font-bold uppercase mb-2">
              PASSWORD <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-[#b9bbbe] text-xs font-bold uppercase mb-2">
              DATE OF BIRTH <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <select
                value={dateOfBirth.month}
                onChange={(e) => setDateOfBirth({ ...dateOfBirth, month: e.target.value })}
                className="bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                required
              >
                <option value="" disabled>Month</option>
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
              
              <select
                value={dateOfBirth.day}
                onChange={(e) => setDateOfBirth({ ...dateOfBirth, day: e.target.value })}
                className="bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                required
              >
                <option value="" disabled>Day</option>
                {days.map(day => (
                  <option key={day.value} value={day.value}>{day.label}</option>
                ))}
              </select>
              
              <select
                value={dateOfBirth.year}
                onChange={(e) => setDateOfBirth({ ...dateOfBirth, year: e.target.value })}
                className="bg-[#202225] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                required
              >
                <option value="" disabled>Year</option>
                {years.map(year => (
                  <option key={year.value} value={year.value}>{year.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="acceptEmails"
              checked={acceptEmails}
              onChange={(e) => setAcceptEmails(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="acceptEmails" className="text-[#b9bbbe] text-sm">
              (Optional) It's okay to send me emails with Discord updates, tips, and special offers. You can opt out at any time.
            </label>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#5865f2] text-white py-3 rounded font-medium hover:bg-[#4752c4] transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating account...' : 'Continue'}
          </button>
          
          <div className="mt-4 text-sm text-[#b9bbbe]">
            By registering, you agree to Discord's <a href="#" className="text-[#00aff4] hover:underline">Terms of Service</a> and <a href="#" className="text-[#00aff4] hover:underline">Privacy Policy</a>.
          </div>
          
          <div className="mt-4 text-sm text-[#b9bbbe]">
            <Link to="/login" className="text-[#00aff4] hover:underline">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;