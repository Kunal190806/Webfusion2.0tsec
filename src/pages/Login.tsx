import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      
      {/* Left Form Side */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 relative z-10">
        <div className="max-w-md w-full mx-auto">
          
          <h1 className="text-3xl font-bold text-black mb-10 text-center">Create an account</h1>
          
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-black mb-4">Sign up</h2>
            
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <input 
                  required
                  type="text" 
                  placeholder="Username" 
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#0F8A54] focus:ring-1 focus:ring-[#0F8A54] text-sm"
                />
              </div>
              <div>
                <input 
                  required
                  type="email" 
                  placeholder="Email" 
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#0F8A54] focus:ring-1 focus:ring-[#0F8A54] text-sm"
                />
              </div>
              <div>
                <input 
                  required
                  type="password" 
                  placeholder="Password" 
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#0F8A54] focus:ring-1 focus:ring-[#0F8A54] text-sm"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#0F8A54] hover:bg-[#0c7044] text-white font-semibold py-3 rounded-full transition-colors mt-6"
              >
                Sign up
              </button>
            </form>
          </div>
          
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-black font-medium">Or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
          <button 
            type="button" 
            onClick={handleLogin}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-black font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-sm">Login with Google</span>
          </button>
          
          <div className="mt-8 text-center text-sm text-black">
            Already have an account? <Link to="/login" className="text-[#0F8A54] font-semibold hover:underline">Login</Link>
          </div>
          
        </div>
      </div>
      
      {/* Right Illustration Side */}
      <div className="hidden lg:block flex-1 relative h-screen">
        <img 
          src="/Loginpage.jpg" 
          alt="Login Illustration" 
          className="w-full h-full object-cover"
        />
      </div>
      
    </div>
  );
};
