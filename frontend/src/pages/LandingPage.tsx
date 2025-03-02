import React from 'react';
import { Link } from 'react-router-dom';
import { Disc } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#404EED] bg-gradient-to-b from-[#404EED] to-[#2F3136] text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Disc className="h-8 w-8 mr-2" />
          <span className="text-2xl font-bold">Discord</span>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:underline">Download</a>
          <a href="#" className="hover:underline">Nitro</a>
          <a href="#" className="hover:underline">Discover</a>
          <a href="#" className="hover:underline">Safety</a>
          <a href="#" className="hover:underline">Support</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Careers</a>
        </div>
        
        <Link to="/login" className="bg-white text-black px-4 py-2 rounded-full font-medium hover:shadow-lg transition duration-200">
          Log In
        </Link>
      </nav>
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 flex flex-col items-center">
        <h1 className="text-6xl md:text-7xl font-bold text-center leading-tight mb-6">
          GROUP CHAT THAT'S ALL FUN & GAMES
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-3xl mb-10">
          Discord is great for playing games and chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out.
        </p>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Link to="/register" className="bg-white text-black px-8 py-4 rounded-full font-medium hover:shadow-lg transition duration-200 text-lg">
            Sign Up
          </Link>
          <Link to="/app" className="bg-[#23272A] text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transition duration-200 text-lg">
            Open Discord in your browser
          </Link>
        </div>
      </div>
      
      {/* Background Image */}
      <div className="relative mt-10">
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-[#23272A]"></div>
        <div className="container mx-auto px-6 relative">
          <img 
            src="https://images.unsplash.com/photo-1603481546238-487240415921?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="Discord App" 
            className="mx-auto rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;