import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { PixelTransition } from '../components/ui/PixelTransition';
import { Star, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { OffToCollegeShop } from '../components/shop/OffToCollegeShop';

export const Discover = () => {
  const { resources } = useAppContext();
  return (
    <div className="w-full flex flex-col bg-background font-sans min-h-screen">
      <OffToCollegeShop />
    </div>
  );
};

export default Discover;
