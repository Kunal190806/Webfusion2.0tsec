import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { PixelTransition } from '../components/ui/PixelTransition';
import { Star, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { OffToCollegeShop } from '../components/shop/OffToCollegeShop';

export const Discover = () => {
  const { resources } = useAppContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(resources.map(r => r.category)));

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? r.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full flex flex-col bg-background font-sans min-h-screen">
      
      {/* Off To College Shop Section (New Hero) */}
      <OffToCollegeShop />

      {/* Legacy Campus Circular Resources Section */}
      <div className="container mx-auto px-6 py-12 max-w-[1400px] border-t border-border mt-12 pt-12">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Peer-to-Peer Campus Listings</h2>
        <p className="text-muted-foreground max-w-2xl">Find everything you need for your next project, event, or class. Borrow from your peers and reduce waste.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search items..." 
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <Button 
            variant={activeCategory === null ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setActiveCategory(null)}
          >
            All
          </Button>
          {categories.map(cat => (
            <Button 
              key={cat} 
              variant={activeCategory === cat ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredResources.map((item) => (
          <div key={item.id} className="group flex flex-col gap-3">
            {/* Image with Pixel Transition */}
            <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
              <PixelTransition
                className="w-full h-full"
                gridSize={10}
                animationStepDuration={0.3}
                pixelColor="#16352F"
                firstContent={
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                }
                secondContent={
                  <div className="w-full h-full bg-[#1A3129] flex flex-col items-center justify-center text-white p-4 text-center cursor-pointer" onClick={() => navigate(`/resource/${item.id}`)}>
                    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400 mb-2" />
                    <div className="font-bold text-lg mb-1">{item.rating} / 5.0</div>
                    <div className="text-xs text-white/70 mb-4">Trusted Owner</div>
                    <Button size="sm" variant="secondary" className="w-full text-xs h-8">
                      View Details
                    </Button>
                  </div>
                }
              />
            </div>
            
            {/* Product Info */}
            <div className="cursor-pointer" onClick={() => navigate(`/resource/${item.id}`)}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-[15px] group-hover:text-primary transition-colors">{item.name}</h3>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-primary">₹{item.borrowingCharge}</span>
                <span className="text-muted-foreground text-xs">/ day</span>
                <span className="text-muted-foreground text-[10px]">•</span>
                <span className="text-muted-foreground text-xs">₹{item.securityDeposit} deposit</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredResources.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No resources found matching your search.
        </div>
      )}
    </div>
    </div>
  );
};

export default Discover;
