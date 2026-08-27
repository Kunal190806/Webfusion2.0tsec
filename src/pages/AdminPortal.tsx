import React, { useState } from 'react';
import { Home, FileText, Users, Calendar, CreditCard, Search, Bell, Settings, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const AdminPortal = () => {
  const { resources, transactions, users } = useAppContext();
  const [viewsFilter, setViewsFilter] = useState<'Week' | 'Month' | 'Year'>('Week');
  const [earningsFilter, setEarningsFilter] = useState<'Week' | 'Month' | 'Year'>('Week');

  return (
    <div className="min-h-screen bg-white font-sans flex text-black">
      
      {/* Left Sidebar */}
      <aside className="w-[240px] border-r border-gray-100 flex flex-col flex-shrink-0">
        <div className="h-20 flex items-center px-8">
          <div className="font-bold text-xl tracking-tight">R<span className="opacity-50">.</span></div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a href="#" className="flex items-center gap-4 px-4 py-3 bg-black text-white rounded-2xl font-medium">
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-black hover:bg-gray-50 rounded-2xl font-medium transition-colors">
            <FileText className="w-5 h-5" />
            <span>My Listings</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-black hover:bg-gray-50 rounded-2xl font-medium transition-colors">
            <Users className="w-5 h-5" />
            <span>Requests</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-black hover:bg-gray-50 rounded-2xl font-medium transition-colors">
            <Calendar className="w-5 h-5" />
            <span>Reservations</span>
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-black hover:bg-gray-50 rounded-2xl font-medium transition-colors">
            <CreditCard className="w-5 h-5" />
            <span>Earnings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="relative ml-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-black w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-black"><Bell className="w-5 h-5" /></button>
            <button className="text-gray-400 hover:text-black"><Settings className="w-5 h-5" /></button>
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
              <img src={users[0]?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} alt="Avatar" className="w-full h-full object-cover"/>
            </div>
          </div>
        </header>

        {/* Dashboard Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 pt-4">
          
          {/* Top Metrics Row */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex-1 min-w-[200px] bg-[#EAF5FD] p-4 rounded-2xl flex items-center gap-4 border border-[#D5E9F9]">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm"><Calendar className="w-5 h-5"/></div>
              <div>
                <div className="text-xs text-gray-600 font-medium mb-1">Total bookings</div>
                <div className="text-xl font-bold">487</div>
              </div>
            </div>
            <div className="flex-1 min-w-[200px] bg-[#EAF5FD] p-4 rounded-2xl flex items-center gap-4 border border-[#D5E9F9]">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm"><CreditCard className="w-5 h-5"/></div>
              <div>
                <div className="text-xs text-gray-600 font-medium mb-1">Total revenue</div>
                <div className="text-xl font-bold">200k€</div>
              </div>
            </div>
            <div className="flex-1 min-w-[200px] bg-[#EAF5FD] p-4 rounded-2xl flex items-center gap-4 border border-[#D5E9F9]">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm"><FileText className="w-5 h-5"/></div>
              <div>
                <div className="text-xs text-gray-600 font-medium mb-1">Amount of Listings</div>
                <div className="text-xl font-bold">{resources.length}</div>
              </div>
            </div>
            <div className="flex-1 min-w-[150px] bg-[#EAF5FD] p-4 rounded-2xl flex items-center gap-4 border border-[#D5E9F9]">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm"><Star className="w-5 h-5"/></div>
              <div>
                <div className="text-xs text-gray-600 font-medium mb-1">Min. nightly rate</div>
                <div className="text-xl font-bold">₹ 25</div>
              </div>
            </div>
            <div className="flex-1 min-w-[150px] bg-[#EAF5FD] p-4 rounded-2xl flex items-center gap-4 border border-[#D5E9F9]">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm"><Star className="w-5 h-5"/></div>
              <div>
                <div className="text-xs text-gray-600 font-medium mb-1">Max. nightly rate</div>
                <div className="text-xl font-bold">₹ 500</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            
            {/* Main Column */}
            <div className="space-y-8">
              
              {/* Total Requests Panel */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
                <h3 className="text-sm font-semibold mb-6">Total requests</h3>
                <div className="grid grid-cols-3 divide-x divide-gray-100">
                  <div className="pr-4">
                    <div className="text-3xl font-bold mb-1">487</div>
                    <div className="text-xs text-gray-500 font-medium mb-3">This week</div>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-gray-500">Past week 3396</span>
                      <span className="text-blue-500 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> 32%</span>
                    </div>
                  </div>
                  <div className="px-4">
                    <div className="text-3xl font-bold mb-1">1579</div>
                    <div className="text-xs text-gray-500 font-medium mb-3">This month</div>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-gray-500">Past month 2596</span>
                      <span className="text-red-500 flex items-center gap-1"><TrendingDown className="w-3 h-3"/> 32%</span>
                    </div>
                  </div>
                  <div className="pl-4">
                    <div className="text-3xl font-bold mb-1">2012</div>
                    <div className="text-xs text-gray-500 font-medium mb-3">This year</div>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-gray-500">Past year 2596</span>
                      <span className="text-blue-500 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> 32%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount of Views Chart */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-semibold">Amount of views</h3>
                  <div className="flex gap-2 text-xs font-medium">
                    <button onClick={() => setViewsFilter('Week')} className={viewsFilter === 'Week' ? 'text-black' : 'text-gray-400 hover:text-black'}>Week</button>
                    <button onClick={() => setViewsFilter('Month')} className={viewsFilter === 'Month' ? 'text-black' : 'text-gray-400 hover:text-black'}>Month</button>
                    <button onClick={() => setViewsFilter('Year')} className={viewsFilter === 'Year' ? 'text-black' : 'text-gray-400 hover:text-black'}>Year</button>
                  </div>
                </div>
                {/* Structural Line Chart Placeholder */}
                <div className="h-[200px] w-full border-b border-l border-gray-200 relative">
                  {/* Y Axis Labels */}
                  <div className="absolute -left-6 flex flex-col justify-between h-full text-[10px] text-gray-400 py-1">
                    <span>12</span><span>9</span><span>6</span><span>3</span><span>0</span>
                  </div>
                  {/* X Axis Labels */}
                  <div className="absolute -bottom-6 w-full flex justify-between text-[10px] text-gray-400 px-4">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                  </div>
                  {/* SVG Line Placeholder */}
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 70 L10 60 L20 65 L30 50 L40 55 L50 40 L60 50 L70 55 L80 45 L90 40 L100 60" fill="none" stroke="#3B82F6" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/>
                  </svg>
                </div>
              </div>

              {/* Earnings Bar Chart */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-semibold">Earnings</h3>
                  <div className="flex gap-2 text-xs font-medium">
                    <button onClick={() => setEarningsFilter('Week')} className={earningsFilter === 'Week' ? 'text-black' : 'text-gray-400 hover:text-black'}>Week</button>
                    <button onClick={() => setEarningsFilter('Month')} className={earningsFilter === 'Month' ? 'text-black' : 'text-gray-400 hover:text-black'}>Month</button>
                    <button onClick={() => setEarningsFilter('Year')} className={earningsFilter === 'Year' ? 'text-black' : 'text-gray-400 hover:text-black'}>Year</button>
                  </div>
                </div>
                {/* Structural Bar Chart Placeholder */}
                <div className="h-[200px] w-full border-b border-l border-gray-200 relative flex items-end justify-around px-2">
                  <div className="absolute -left-6 flex flex-col justify-between h-full text-[10px] text-gray-400 py-1">
                    <span>12</span><span>9</span><span>6</span><span>3</span><span>0</span>
                  </div>
                  <div className="absolute -bottom-6 w-full flex justify-between text-[10px] text-gray-400 px-6">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                  </div>
                  
                  {/* Bars */}
                  {[60, 40, 50, 20, 0, 0, 50, 40, 60, 40, 90, 10].map((h, i) => (
                    <div key={i} className="w-[4%] bg-[#D5E9F9] rounded-t-sm relative group" style={{ height: `${h}%` }}>
                      {h > 0 && <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-gray-500 opacity-0 group-hover:opacity-100">₹5840</span>}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Side Column */}
            <div className="space-y-8">
              
              {/* Top Listings */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold">Top Listings</h3>
                  <span className="text-[10px] text-gray-400"># of bookings</span>
                </div>
                
                <div className="space-y-3">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-20 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={resources[i]?.images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200'} className="w-full h-full object-cover"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold truncate">Apartment not far from the center...</h4>
                        <div className="text-[10px] text-gray-400 mt-0.5">Apartments</div>
                        <div className="text-[10px] text-gray-400 truncate">📍 New Delhi, India</div>
                        <div className="flex items-center gap-1 mt-1 text-[10px]">
                          <div className="flex text-blue-500"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
                          <span className="font-bold text-black">5.0</span> (8)
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 pl-2">
                        <div className="w-10 h-12 rounded-full border border-gray-200 flex flex-col items-center justify-center relative bg-white">
                          {i === 0 && <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-[8px]">🏆</div>}
                          <Calendar className="w-3 h-3 text-gray-400 mb-0.5" />
                          <span className="text-sm font-bold leading-none">{25 - i * 2}</span>
                        </div>
                        <div className="text-xs font-bold">₹504<span className="text-[8px] text-gray-400 font-normal">/night</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Reviews</h3>
                <div className="space-y-4">
                  {[
                    {name: 'Kevin Simpson', date: '14 May 2022', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'},
                    {name: 'Leona Maxwell', date: '25 Jun 2022', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'},
                  ].map((review, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                           <img src={review.img} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-xs font-bold">{review.name}</div>
                          <div className="text-[10px] text-gray-400">{review.date}</div>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor sed metus non consectetur. Suspendisse lacinia lorem.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
