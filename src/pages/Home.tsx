import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Camera, Monitor, Speaker, Activity, MonitorPlay, BookOpen, Calendar, Wrench, Send, Handshake, RotateCcw, Star, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';

import { ScrollExpand } from '../components/ui/ScrollExpand';
import { PixelTransition } from '../components/ui/PixelTransition';
import { TypingAnimation } from '../components/ui/typing-animation';
import { MorphingText } from '../components/ui/morphing-text';

const categories = [
  { name: 'Electronics', icon: Monitor },
  { name: 'Cameras', icon: Camera },
  { name: 'Audio', icon: Speaker },
  { name: 'Sports', icon: Activity },
  { name: 'Lab Equip.', icon: MonitorPlay },
  { name: 'Books', icon: BookOpen },
  { name: 'Events', icon: Calendar },
  { name: 'Tools', icon: Wrench },
];

const popularSearches = ['Camera', 'Tripod', 'Mic', 'Projector', 'Textbooks', 'Lab Equipment'];

export const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/ai-discovery?q=${encodeURIComponent(searchQuery)}&cat=${encodeURIComponent(searchCategory)}`);
    }
  };

  const morphTexts = [
    `<span class="font-serif text-[4.5rem] leading-[1.05] tracking-tight text-white drop-shadow-xl">Campus Circular</span>`,
    `<div class="flex flex-col items-center justify-center w-full">
      <h2 class="font-serif text-[4.5rem] leading-[1.05] tracking-tight mb-6 text-white drop-shadow-xl">
        Borrow what you need.<br />
        Share what you have.
      </h2>
      <p class="text-[1.1rem] leading-relaxed max-w-lg mx-auto text-white/90 drop-shadow-md font-sans">
        Access useful resources across your campus<br />without buying things you only need temporarily.
      </p>
    </div>`
  ];

  return (
    <div className="flex flex-col bg-background font-sans min-h-screen">
      
      {/* Animated Hero Section */}
      <section className="w-full bg-[#EAE8E3]">
        <ScrollExpand
          src="/HeroImage.jpg"
          alt="Product hero"
          title={<TypingAnimation>Campus Circular</TypingAnimation>}
          scrollHint="Scroll"
          useWindowScroll
        >
          <MorphingText texts={morphTexts} />
        </ScrollExpand>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-6 max-w-[1400px] -mt-20 relative z-10 mb-20">
        <div className="max-w-2xl bg-card rounded-xl shadow-2xl p-6 border border-border mx-auto">
          {/* Search Box */}
          <div className="mb-6">
            <form onSubmit={handleSearch} className="flex w-full bg-background rounded-md shadow-sm overflow-hidden border border-border">
              <div className="flex items-center pl-3 border-r border-border bg-muted/30">
                <select 
                  className="bg-transparent text-[13px] font-medium outline-none pr-2 py-3 text-muted-foreground cursor-pointer"
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Cameras">Cameras</option>
                  <option value="Audio">Audio</option>
                  <option value="Books">Books</option>
                </select>
              </div>
              <div className="flex items-center pl-4 text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1 py-3 px-3">
                <input
                  type="text"
                  placeholder="What do you need?"
                  className="w-full bg-transparent text-[15px] font-medium outline-none placeholder:text-muted-foreground/70"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  e.g. camera, tripod and microphone for my event tomorrow
                </div>
              </div>
              <button type="submit" className="bg-[#16352F] text-white px-6 flex items-center justify-center hover:bg-[#0D2621] transition-colors">
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Popular Searches */}
          <div>
            <div className="text-[11px] font-bold text-foreground mb-3">Popular searches</div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map(tag => (
                <button key={tag} className="px-4 py-1.5 bg-background border border-border rounded-full text-xs font-medium text-foreground hover:border-primary/30 transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Impact Stats Bar */}
      <section className="container mx-auto px-6 max-w-[1400px] relative z-10 -mt-10 mb-20">
        <div className="bg-[#1A3129] rounded-xl shadow-xl text-white py-8 px-10 grid grid-cols-2 md:grid-cols-5 gap-8 border border-[#2A4139]">
          <div className="flex items-center gap-4 border-r border-white/10">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-primary-light flex-shrink-0">
              <span className="font-serif italic text-lg">₹</span>
            </div>
            <div>
              <div className="text-2xl font-serif">₹2.4L+</div>
              <div className="text-[11px] text-white/70 font-medium">Money saved</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 border-r border-white/10">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-primary-light flex-shrink-0">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-serif">1,240+</div>
              <div className="text-[11px] text-white/70 font-medium">Resources reused</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 border-r border-white/10">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-primary-light flex-shrink-0">
              <Handshake className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-serif">386+</div>
              <div className="text-[11px] text-white/70 font-medium">Active members</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 border-r border-white/10">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-primary-light flex-shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-serif">94%</div>
              <div className="text-[11px] text-white/70 font-medium">On-time returns</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-primary-light flex-shrink-0">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-serif">72%</div>
              <div className="text-[11px] text-white/70 font-medium leading-tight mt-1">Reduction in new purchases</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-6 max-w-[1400px] pb-24">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-20">
          
          {/* How It Works */}
          <div>
            <div className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase mb-3">
              How It Works
            </div>
            <h2 className="text-2xl font-serif mb-12 text-foreground">
              Simple steps, trusted by everyone.
            </h2>
            
            <div className="flex justify-between relative">
              {/* Line connector */}
              <div className="absolute top-6 left-10 right-10 h-[1px] border-t border-dashed border-border -z-10"></div>
              
              <div className="flex flex-col items-center text-center max-w-[80px]">
                <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mb-4 text-foreground">
                  <Search className="h-5 w-5" />
                </div>
                <div className="text-[11px] font-bold mb-1">1. Discover</div>
                <div className="text-[10px] text-muted-foreground leading-snug">Find the perfect resource with AI assistance</div>
              </div>
              
              <div className="flex flex-col items-center text-center max-w-[80px]">
                <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mb-4 text-foreground">
                  <Send className="h-5 w-5" />
                </div>
                <div className="text-[11px] font-bold mb-1">2. Request</div>
                <div className="text-[10px] text-muted-foreground leading-snug">Send a request to borrow what you need</div>
              </div>
              
              <div className="flex flex-col items-center text-center max-w-[80px]">
                <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mb-4 text-foreground">
                  <Handshake className="h-5 w-5" />
                </div>
                <div className="text-[11px] font-bold mb-1">3. Borrow</div>
                <div className="text-[10px] text-muted-foreground leading-snug">Complete a safe handover and use with care</div>
              </div>
              
              <div className="flex flex-col items-center text-center max-w-[80px]">
                <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mb-4 text-foreground">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div className="text-[11px] font-bold mb-1">4. Return</div>
                <div className="text-[10px] text-muted-foreground leading-snug">Return on time, same condition as received</div>
              </div>
              
              <div className="flex flex-col items-center text-center max-w-[80px]">
                <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mb-4 text-foreground">
                  <Star className="h-5 w-5" />
                </div>
                <div className="text-[11px] font-bold mb-1">5. Review</div>
                <div className="text-[10px] text-muted-foreground leading-snug">Rate your experience and build trust</div>
              </div>
            </div>
          </div>

          {/* Browse By Category */}
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase mb-3">
                  Browse by category
                </div>
                <h2 className="text-2xl font-serif text-foreground">
                  Explore what's available<br />around you.
                </h2>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <ArrowRight className="h-4 w-4 rotate-180 text-muted-foreground" />
                </button>
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {categories.map((cat, i) => (
                <div key={i} className="flex flex-col items-center justify-center aspect-[3/4] bg-[#F5F5F0] rounded-xl cursor-pointer hover:bg-[#EAE8E3] transition-colors border border-border/50">
                  <cat.icon className="h-6 w-6 text-foreground/80 mb-3" strokeWidth={1.5} />
                  <div className="text-[10px] font-bold text-center text-foreground">{cat.name}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center md:justify-start">
              <button className="text-xs font-bold flex items-center gap-2 hover:text-primary transition-colors">
                View all categories <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Resources (Ecommerce style) */}
      <section className="container mx-auto px-6 max-w-[1400px] pb-24 border-t border-border pt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase mb-3">
              Discover Resources
            </div>
            <h2 className="text-2xl font-serif text-foreground">
              Available right now.
            </h2>
          </div>
          <Button onClick={() => navigate('/discover')} variant="outline">Browse All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: '1', name: 'Sony Alpha 6400', price: 300, deposit: 1000, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400', rating: 4.9 },
            { id: '2', name: 'Arduino Starter Kit', price: 50, deposit: 300, img: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=400', rating: 4.7 },
            { id: '3', name: 'Rode Wireless GO II', price: 200, deposit: 1500, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400', rating: 4.8 },
            { id: '4', name: 'Scientific Calculator', price: 20, deposit: 100, img: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=400', rating: 4.5 },
          ].map((item, i) => (
            <div key={i} className="group flex flex-col gap-3">
              {/* Image with Pixel Transition */}
              <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
                <PixelTransition
                  className="w-full h-full"
                  gridSize={10}
                  animationStepDuration={0.3}
                  pixelColor="#16352F"
                  firstContent={
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  }
                  secondContent={
                    <div className="w-full h-full bg-[#1A3129] flex flex-col items-center justify-center text-white p-4 text-center">
                      <Star className="h-6 w-6 text-yellow-400 fill-yellow-400 mb-2" />
                      <div className="font-bold text-lg mb-1">{item.rating} / 5.0</div>
                      <div className="text-xs text-white/70 mb-4">Trusted Owner</div>
                      <Button size="sm" variant="secondary" className="w-full text-xs h-8" onClick={(e) => { e.stopPropagation(); navigate(`/resource/${item.id}`); }}>
                        View Details
                      </Button>
                    </div>
                  }
                />
              </div>
              
              {/* Product Info */}
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-[15px]">{item.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold">₹{item.price}</span>
                  <span className="text-muted-foreground text-xs">/ day</span>
                  <span className="text-muted-foreground text-[10px]">•</span>
                  <span className="text-muted-foreground text-xs">₹{item.deposit} deposit</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
