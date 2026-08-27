import React, { useState } from 'react';
import { Star, ChevronDown, Check } from 'lucide-react';

const heroTiles = [
  { name: 'Fashion', active: true },
  { name: 'Shop all', active: false },
  { name: 'Electronics', active: false },
  { name: 'Storage', active: false },
  { name: 'Dorm Room', active: false },
];

const categoryPills = ['Women', 'Men', 'Tops', 'Activewear', 'Shoes', 'Accessories', 'Beauty'];

const trendCarousel = [
  { name: 'Class cool' },
  { name: 'Game day' },
  { name: 'Wellness fit' },
  { name: 'Night out' },
  { name: 'Study lounge' },
];

const sidebarFilters = [
  {
    group: '',
    options: ['All']
  },
  {
    group: 'Women',
    options: ['All', 'Tops & Sweaters', 'Pants & Jeans', 'Dresses', 'Blazers', 'Loungewear', 'Activewear', 'Sleepwear', 'Outerwear', 'Shoes', 'Accessories']
  },
  {
    group: 'Men',
    options: ['All', 'Shirts', 'Pants', 'Activewear', 'Shoes', 'Accessories']
  },
  {
    group: 'Tops',
    options: ['All', 'T-shirts', 'Sweaters']
  },
  {
    group: 'Activewear',
    options: ['All']
  }
];

const products = [
  {
    id: 1,
    title: 'Aelfric Eden Graphic Hoodie for Men Y2K',
    price: 67.95,
    listPrice: null,
    rating: 4.7,
    reviews: '1.4K',
    bought: '1K+ bought in past month',
    delivery: 'Wed Aug 26',
    swatches: ['#000', '#eee', '#333'],
    img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60' // Placeholder
  },
  {
    id: 2,
    title: 'JanSport NCAA Officially Licensed Backpack',
    price: 40.10,
    listPrice: 59.99,
    savings: 10.91,
    rating: 4.6,
    reviews: '59',
    bought: '500+ bought in past month',
    delivery: 'Wed Aug 26',
    swatches: [],
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60' // Placeholder
  },
  {
    id: 3,
    title: 'Red "Go Sports" crewneck sweatshirt on model',
    price: null,
    listPrice: null,
    rating: null,
    reviews: null,
    bought: null,
    delivery: null,
    swatches: [],
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60' // Placeholder
  },
  {
    id: 4,
    title: 'USC maroon/white varsity jacket',
    price: null,
    listPrice: null,
    rating: null,
    reviews: null,
    bought: null,
    delivery: null,
    swatches: [],
    img: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=500&auto=format&fit=crop&q=60' // Placeholder
  }
];

export const OffToCollegeShop = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <div className="w-full bg-white font-sans pb-24 relative z-20">
      {/* Container for the shop content */}
      <div className="container mx-auto px-4 max-w-[1400px] pt-12 space-y-16">
        
        {/* SECTION 1: Hero Category Tiles */}
        <section>
          <h2 className="text-[22px] font-bold text-black mb-6">The Off to College Shop</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {heroTiles.map((tile, i) => (
              <div 
                key={i} 
                className={`relative flex-shrink-0 w-[180px] h-[220px] rounded-xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-1 ${
                  tile.active ? 'border-2 border-black' : ''
                }`}
                style={{ backgroundColor: '#D7F24A' }}
              >
                {/* Diagonal White Stripe Accent */}
                <div className="absolute top-0 right-0 w-[150%] h-8 bg-white/40 -rotate-45 translate-x-1/4 -translate-y-1/2"></div>
                
                {/* Image Placeholder */}
                <div className="absolute inset-4 bottom-12 flex items-center justify-center">
                   {/* In a real app, the product image goes here. For now it's transparent/empty so the yellow shows. */}
                   <div className="w-24 h-24 bg-black/5 rounded-full blur-xl absolute"></div>
                </div>

                {/* White Label Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-11 bg-white flex items-center justify-center">
                  <span className="font-bold text-black text-sm">{tile.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Shop by category pill row */}
        <section>
          <h3 className="text-[18px] font-bold text-black mb-4">Shop by category</h3>
          <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {categoryPills.map((pill, i) => (
              <button 
                key={i}
                className="flex-shrink-0 h-[40px] px-[20px] rounded-full flex items-center justify-center font-bold text-black hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#D7F24A' }}
              >
                {pill}
              </button>
            ))}
          </div>
        </section>

        {/* SECTION 3: Promo Banner */}
        <section>
          <div 
            className="w-full rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6"
            style={{ backgroundColor: '#EFECE6', minHeight: '120px' }}
          >
            <h2 className="text-[24px] font-bold text-black leading-tight max-w-[280px]">
              Our campus style edit is here
            </h2>
            
            <div className="flex-1 flex justify-center items-center gap-2">
              {/* Product cutouts collage placeholders */}
              <div className="w-16 h-16 bg-white/60 rounded-lg border border-black/5 shadow-sm rotate-[-5deg]"></div>
              <div className="w-16 h-16 bg-white/60 rounded-lg border border-black/5 shadow-sm rotate-[2deg] translate-y-2"></div>
              <div className="w-16 h-16 bg-white/60 rounded-lg border border-black/5 shadow-sm rotate-[8deg]"></div>
            </div>

            <a href="#" className="font-bold text-black underline hover:no-underline whitespace-nowrap">
              Shop now
            </a>
          </div>
        </section>

        {/* SECTION 4: Carousel Row */}
        <section>
          <h3 className="text-[18px] font-bold text-black mb-4">Shop on-trend college looks</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {trendCarousel.map((item, i) => (
              <div key={i} className="flex flex-col gap-3 flex-shrink-0 w-[180px]">
                <div 
                  className="w-full h-[220px] rounded-xl relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#D7F24A' }}
                >
                  <div className="absolute top-0 right-0 w-[150%] h-8 bg-white/40 -rotate-45 translate-x-1/4 -translate-y-1/2"></div>
                </div>
                <div className="font-medium text-black text-sm">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: Grid with Sidebar */}
        <section className="grid lg:grid-cols-[200px_1fr] gap-8">
          
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <h3 className="font-bold text-black mb-4">Shop by</h3>
            <div className="space-y-6">
              {sidebarFilters.map((group, i) => (
                <div key={i} className="space-y-3">
                  {group.group && <div className="font-bold text-black text-sm">{group.group}</div>}
                  <ul className="space-y-2.5">
                    {group.options.map((opt, j) => {
                      const isSelected = selectedFilter === opt && (!group.group || group.group === 'Women'); // Simplified for demo
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

          {/* Main Grid Area */}
          <div>
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[18px] font-bold text-black">Shop all</h3>
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

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  {/* Image wrapper */}
                  <div className="w-full aspect-square bg-[#f8f8f8] border border-gray-200 rounded-lg overflow-hidden mb-3 relative">
                    <img src={product.img} alt={product.title} className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  
                  {/* Swatches */}
                  {product.swatches.length > 0 && (
                    <div className="flex gap-1.5 mb-2">
                      {product.swatches.map((color, i) => (
                        <div key={i} className="w-3.5 h-3.5 rounded-full border border-gray-300" style={{ backgroundColor: color }}></div>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h4 className="text-[14px] leading-snug text-black mb-1 line-clamp-2">
                    {product.title}
                  </h4>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-1">
                      <div className="flex text-[#FF9900]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[#007185] text-xs hover:underline">{product.reviews}</span>
                    </div>
                  )}

                  {/* Bought info */}
                  {product.bought && (
                    <div className="text-xs text-gray-500 mb-2">
                      {product.bought}
                    </div>
                  )}

                  {/* Price */}
                  {product.price !== null && (
                    <div className="flex items-baseline gap-1">
                      <span className="text-[10px] font-medium align-top mt-1">$</span>
                      <span className="text-xl font-bold text-black">{Math.floor(product.price)}</span>
                      <span className="text-[10px] font-medium align-top mt-1">{(product.price % 1).toFixed(2).substring(2)}</span>
                    </div>
                  )}
                  
                  {/* List Price / Savings */}
                  {product.listPrice && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      List: <span className="line-through">${product.listPrice}</span>
                    </div>
                  )}

                  {/* Delivery */}
                  {product.delivery && (
                    <div className="text-xs text-gray-600 mt-2">
                      Delivery <span className="font-bold text-black">{product.delivery}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
