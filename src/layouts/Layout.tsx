import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { Bell, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';

export const Layout = () => {
  const { currentUser } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Discover', path: '/discover' },
    { name: 'Borrowings', path: '/dashboard?tab=borrowings' },
    { name: 'Listings', path: '/dashboard?tab=listings' },
    { name: 'Requests', path: '/dashboard?tab=requests' },
    { name: 'Impact', path: '/impact' },
  ];

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
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">{link.name}</Link>
            ))}
            <Link to="/admin" className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors bg-red-50 px-2 py-1 rounded">Admin</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-foreground hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs border border-border">
                {currentUser?.trustScore}
              </div>
              <span className="text-sm font-semibold">Trust Score</span>
            </div>
            <Link to="/login" className="hidden md:block">
              <Button variant="outline" className="h-10 px-4 rounded-md font-semibold">
                Login
              </Button>
            </Link>
            <Button className="hidden md:flex h-10 px-6 rounded-md font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
              + List Resource
            </Button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-foreground p-1" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden sticky top-20 z-40 bg-background border-b border-border shadow-lg w-full flex flex-col p-4 animate-in slide-in-from-top-2">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-lg font-semibold py-3 border-b border-border/50 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/admin" 
            className="text-lg font-bold py-3 border-b border-border/50 text-red-500 hover:text-red-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Admin Panel
          </Link>
          <div className="flex flex-col gap-3 mt-4">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full h-12 font-semibold">Login</Button>
            </Link>
            <Button className="w-full h-12 font-semibold bg-primary text-primary-foreground">
              + List Resource
            </Button>
          </div>
        </div>
      )}
      
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
