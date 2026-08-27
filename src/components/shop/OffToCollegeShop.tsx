import React, { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { PixelTransition } from '../ui/PixelTransition';

const heroTiles = [
  { name: 'Cameras', active: true },
  { name: 'Shop all', active: false },
  { name: 'Accessories', active: false },
  { name: 'Electronics', active: false },
  { name: 'Books', active: false },
];

const categoryPills = ['All', 'Cameras', 'Accessories', 'Electronics', 'Books'];

const trendCarousel = [
  { name: 'Photography Shoot', img: '/Store-items/camera/camera-1.jpg' },
  { name: 'Finals Week', img: '/Store-items/textbooks/textbook-2.jpg' },
  { name: 'Engineering Project', img: '/Store-items/calculator/calculator-3.jpg' },
  { name: 'Campus Event', img: '/Store-items/tripods/tripod-1.jpg' },
  { name: 'Study Lounge', img: '/Store-items/notes/handwrtten-notes-2.jpg' },
];

const sidebarFilters = [
  {
    group: '',
    options: ['All']
  },
  {
    group: 'Cameras & Gear',
    options: ['All', 'Cameras', 'Accessories']
  },
  {
    group: 'Academics',
    options: ['All', 'Electronics', 'Books']
  }
];

export const OffToCollegeShop = () => {
  const { resources } = useAppContext();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Filter logic based on our real categories
  const filteredResources = resources.filter(r => {
    if (selectedFilter === 'All') return true;
    return r.category === selectedFilter;
  });

  return (
    <div className="w-full bg-white font-sans pb-24 relative z-20">
      <div className="container mx-auto px-4 max-w-[1400px] pt-12 space-y-16">
        
        <section>
          <h2 className="text-[22px] font-bold text-black mb-6">Campus Circular Discover</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {heroTiles.map((tile, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedFilter(tile.name === 'Shop all' ? 'All' : tile.name)}
                className={`relative flex-shrink-0 w-[180px] h-[220px] rounded-xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-1 ${
                  (selectedFilter === tile.name || (selectedFilter === 'All' && tile.name === 'Shop all')) ? 'border-2 border-black' : ''
                }`}
                style={{ backgroundColor: '#D7F24A' }}
              >
                <div className="absolute top-0 right-0 w-[150%] h-8 bg-white/40 -rotate-45 translate-x-1/4 -translate-y-1/2"></div>
                <div className="absolute inset-4 bottom-12 flex items-center justify-center">
                   <div className="w-24 h-24 bg-black/5 rounded-full blur-xl absolute"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-11 bg-white flex items-center justify-center">
                  <span className="font-bold text-black text-sm">{tile.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[18px] font-bold text-black mb-4">Shop by category</h3>
          <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {categoryPills.map((pill, i) => (
              <button 
                key={i}
                onClick={() => setSelectedFilter(pill)}
                className={`flex-shrink-0 h-[40px] px-[20px] rounded-full flex items-center justify-center font-bold transition-opacity ${selectedFilter === pill ? 'bg-black text-white' : 'text-black hover:opacity-90'}`}
                style={{ backgroundColor: selectedFilter === pill ? '#000' : '#D7F24A' }}
              >
                {pill}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div 
            className="w-full rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6"
            style={{ backgroundColor: '#EFECE6', minHeight: '120px' }}
          >
            <h2 className="text-[24px] font-bold text-black leading-tight max-w-[280px]">
              Our campus essentials edit is here
            </h2>
            
            <div className="flex-1 flex justify-center items-center gap-2">
              <div className="w-16 h-16 bg-white/60 rounded-lg border border-black/5 shadow-sm rotate-[-5deg] flex items-center justify-center overflow-hidden"><img src="/Store-items/camera/camera-1.jpg" className="w-full h-full object-cover mix-blend-multiply"/></div>
              <div className="w-16 h-16 bg-white/60 rounded-lg border border-black/5 shadow-sm rotate-[2deg] translate-y-2 flex items-center justify-center overflow-hidden"><img src="/Store-items/books/book-1.jpg" className="w-full h-full object-cover mix-blend-multiply"/></div>
              <div className="w-16 h-16 bg-white/60 rounded-lg border border-black/5 shadow-sm rotate-[8deg] flex items-center justify-center overflow-hidden"><img src="/Store-items/calculator/calculator-1.jpg" className="w-full h-full object-cover mix-blend-multiply"/></div>
            </div>

            <a href="#" className="font-bold text-black underline hover:no-underline whitespace-nowrap">
              Shop now
            </a>
          </div>
        </section>

        <section>
          <h3 className="text-[18px] font-bold text-black mb-4">Trending on campus</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {trendCarousel.map((item, i) => (
            <div key={i} className="flex flex-col gap-3 flex-shrink-0 w-[180px]">
              <div 
                className="w-full h-[220px] rounded-xl relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-11 bg-black/50 flex items-center justify-center">
                  <span className="font-bold text-white text-xs text-center px-2">{item.name}</span>
                </div>
              </div>
              <div className="font-medium text-black text-sm">
                {item.name}
              </div>
            </div>
          ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-[200px_1fr] gap-8">
          
          <aside className="hidden lg:block">
            <h3 className="font-bold text-black mb-4">Shop by</h3>
            <div className="space-y-6">
              {sidebarFilters.map((group, i) => (
                <div key={i} className="space-y-3">
                  {group.group && <div className="font-bold text-black text-sm">{group.group}</div>}
                  <ul className="space-y-2.5">
                    {group.options.map((opt, j) => {
                      const isSelected = selectedFilter === opt;
                      return (
                        <li key={j} className="flex items-center gap-3">
                          <button 
                            onClick={() => setSelectedFilter(opt)}
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected ? 'border-black bg-black' : 'border-gray-400 bg-transparent'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                          </button>
                          <span className={`text-[14px] cursor-pointer hover:text-black transition-colors ${isSelected ? 'text-black font-medium' : 'text-gray-600'}`} onClick={() => setSelectedFilter(opt)}>
                            {opt}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[18px] font-bold text-black">All resources</h3>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm font-medium text-black outline-none focus:border-black cursor-pointer">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
              {filteredResources.map((item) => (
                <div key={item.id} className="group cursor-pointer" onClick={() => navigate(`/resource/${item.id}`)}>
                  
                  {/* Image wrapper using PixelTransition */}
                  <div className="w-full aspect-square bg-[#f8f8f8] border border-gray-200 rounded-lg overflow-hidden mb-3 relative">
                    <PixelTransition
                      className="w-full h-full"
                      gridSize={10}
                      animationStepDuration={0.3}
                      pixelColor="#D7F24A"
                      firstContent={
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" />
                      }
                      secondContent={
                        <div className="w-full h-full bg-[#1A3129] flex flex-col items-center justify-center text-white p-4 text-center">
                          <Star className="h-6 w-6 text-[#D7F24A] fill-[#D7F24A] mb-2" />
                          <div className="font-bold text-lg mb-1">{item.rating} / 5.0</div>
                          <div className="text-xs text-white/70 mb-4">Trusted Owner</div>
                          <button className="w-full bg-white text-black text-xs font-bold h-8 rounded hover:bg-gray-100 transition-colors">
                            View Details
                          </button>
                        </div>
                      }
                    />
                  </div>
                  
                  <h4 className="text-[14px] leading-snug text-black mb-1 line-clamp-2">
                    {item.name}
                  </h4>

                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex text-[#FF9900]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-[#007185] text-xs hover:underline">{item.rating}</span>
                  </div>

                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-xl font-bold text-black">₹{item.borrowingCharge}</span>
                    <span className="text-xs text-gray-500 font-medium align-baseline">/ day</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-0.5">
                    Deposit: <span className="text-black">₹{item.securityDeposit}</span>
                  </div>

                </div>
              ))}
            </div>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No items found for this category.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
