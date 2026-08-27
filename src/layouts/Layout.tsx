import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { Bell } from 'lucide-react';
import { Button } from '../components/ui/button';

export const Layout = () => {
  const { currentUser } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-transparent">
        <div className="container mx-auto px-6 flex h-20 items-center justify-between max-w-[1400px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/Campus Circular logo/CC-logo-DESKTOP.svg" 
              alt="Campus Circular Logo" 
              className="h-10 w-auto object-contain hidden md:block" 
            />
            <img 
              src="/Campus Circular logo/CC-logo-mobile.svg" 
              alt="Campus Circular Logo" 
              className="h-8 w-auto object-contain md:hidden" 
            />
          </Link>
          
          {/* Centered Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <Link to="/discover" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">Discover</Link>
            <Link to="/dashboard" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">Borrowings</Link>
            <Link to="/dashboard" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">Listings</Link>
            <Link to="/dashboard" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">Requests</Link>
            <Link to="/impact" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">Impact</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button className="text-foreground hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs border border-border">
                {currentUser?.trustScore}
              </div>
              <span className="text-sm font-semibold">Trust Score</span>
            </div>
            <Button className="hidden md:flex h-10 px-6 rounded-md font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
              + List Resource
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="border-t border-border py-8 bg-card mt-auto">
        <div className="container mx-auto px-6 max-w-[1400px] flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Campus Circular. Built for the frontend competition.
          </p>
        </div>
      </footer>
    </div>
  );
};
