import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar as CalendarIcon, Users, FileText, BookOpen, 
  MessageSquare, CreditCard, Folder, Settings, LogOut, Search, 
  ChevronLeft, ChevronRight, RefreshCw, FileUp, Activity, Plus
} from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';

export const AdminPortal = () => {
  const { resources, transactions, users } = useAppContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Transactions');

  // Stats derived from actual data
  const totalUsers = users.length;
  const activeResources = resources.filter(r => r.isAvailable).length;
  const activeTransactions = transactions.filter(t => t.status !== 'Rated').length;
  
  // Fake timeline data for the right sidebar
  const timelineEvents = [
    { time: '07:00', title: 'New User Registered', desc: 'Alice just joined Campus Circular', icon: <Users className="w-3 h-3"/>, color: 'bg-pink-100 text-pink-500' },
    { time: '08:12', title: 'Transaction Dispute', desc: 'Broken camera lens reported', icon: <Activity className="w-3 h-3"/>, color: 'bg-yellow-100 text-yellow-600', highlight: true },
    { time: '09:00', title: 'Resource Listed', desc: 'New Mac charger added', icon: <FileUp className="w-3 h-3"/>, color: 'bg-green-100 text-green-500' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF8] font-sans text-black p-4 flex gap-6">
      
      {/* LEFT SIDEBAR (Dark Theme) */}
      <aside className="w-64 bg-[#18181A] text-white rounded-[2rem] p-6 flex flex-col relative shrink-0">
        <div className="flex items-center gap-2 mb-10 mt-2">
          <div className="font-serif text-2xl font-bold tracking-tight">Campus<br/>Circular</div>
          <button className="absolute -right-3 top-8 w-6 h-6 bg-[#F6A8D0] rounded-full flex items-center justify-center text-black shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-gray-500 font-medium mb-4 tracking-wider">General</div>
        <nav className="flex flex-col gap-2 mb-8">
          <NavItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" active />
          <NavItem icon={<CalendarIcon className="w-4 h-4" />} label="Schedule" />
          <NavItem icon={<Users className="w-4 h-4" />} label="Members" />
          <NavItem icon={<Activity className="w-4 h-4" />} label="Statistics & reports" />
          <NavItem icon={<BookOpen className="w-4 h-4" />} label="Resources" />
          <NavItem icon={<FileText className="w-4 h-4" />} label="My articles" />
        </nav>

        <div className="text-xs text-gray-500 font-medium mb-4 tracking-wider">Tools</div>
        <nav className="flex flex-col gap-2 mb-auto">
          <NavItem icon={<MessageSquare className="w-4 h-4" />} label="Chats & calls" />
          <NavItem icon={<CreditCard className="w-4 h-4" />} label="Billing" />
          <NavItem icon={<Folder className="w-4 h-4" />} label="Documents base" />
          <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" />
        </nav>

        <button onClick={() => navigate('/')} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mt-8">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col py-2 max-w-5xl">
        
        {/* Top Nav / Search */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 rounded-full bg-[#F6A8D0] flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:opacity-90">
              <Search className="w-4 h-4 text-black" />
            </div>
            <div className="bg-[#F5F2EB] rounded-full px-6 py-2 flex items-center gap-4 flex-1 max-w-xl border border-transparent focus-within:border-gray-200 transition-colors">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent outline-none text-sm w-32 shrink-0 placeholder:text-gray-400"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <div className="flex items-center gap-1 text-xs text-gray-500 border-l border-gray-300 pl-4">
                <span>In:</span>
                {['Transactions', 'Users', 'Resources', 'Disputes'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1 rounded-full border border-dashed transition-all ${activeFilter === f ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800"><Users className="w-4 h-4"/></div>
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800"><Bell className="w-4 h-4"/></div>
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800"><Settings className="w-4 h-4"/></div>
          </div>
        </div>

        {/* Hero Welcome */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Good morning, Admin</h1>
          <p className="text-gray-500 text-sm max-w-xl">
            Campus Circular is running smoothly. There are {activeTransactions} active borrowings happening today. You also have 1 live dispute requiring attention.
          </p>
        </div>

        {/* Colorful Grid */}
        <div className="grid grid-cols-[1fr_1.5fr] gap-4 mb-6">
          
          {/* Yellow Card: Active Users */}
          <div className="bg-[#F4D068] rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
             {/* Abstract shape */}
             <div className="absolute -top-4 -right-4 text-[#E5C057] opacity-50 rotate-12 select-none" style={{ fontSize: '140px', lineHeight: 1 }}>+</div>
             
             <div>
               <h3 className="font-bold text-lg mb-4">Active users:</h3>
               <div className="flex gap-4">
                 <div>
                   <div className="font-bold text-sm">{totalUsers} users</div>
                   <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Total</div>
                 </div>
                 <div>
                   <div className="font-bold text-sm">32 new</div>
                   <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">This week</div>
                 </div>
               </div>
             </div>

             {/* Pure CSS Bar Chart */}
             <div className="flex items-end gap-1.5 h-16 mt-4 border-b-2 border-black/10 pb-1 z-10 relative w-[80%]">
               {[40, 20, 60, 30, 80, 100, 40, 20].map((h, i) => (
                 <div key={i} className={`flex-1 rounded-full ${i === 5 ? 'bg-black' : 'bg-black/30'}`} style={{ height: `${h}%` }}></div>
               ))}
               <div className="absolute -bottom-5 text-[9px] font-bold text-black/50 w-full flex justify-between">
                 <span>Mon</span>
                 <span>Sun</span>
               </div>
             </div>
          </div>

          {/* Pink Card: Transaction Summary */}
          <div className="bg-[#F6A8D0] rounded-3xl p-6 relative overflow-hidden flex flex-col min-h-[220px]">
             <div className="absolute top-4 -right-4 text-[#ECA0C6] opacity-60 select-none" style={{ fontSize: '180px', lineHeight: 0.5 }}>♥</div>
             
             <div className="flex justify-between items-start mb-6 z-10">
               <div>
                 <h3 className="font-bold text-lg mb-3">Transaction summary:</h3>
                 <div className="flex gap-4">
                   <div>
                     <div className="font-bold text-sm">₹840</div>
                     <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Average</div>
                   </div>
                   <div>
                     <div className="font-bold text-sm">₹50</div>
                     <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Minimum</div>
                   </div>
                   <div>
                     <div className="font-bold text-sm">₹4,500</div>
                     <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Maximum</div>
                   </div>
                 </div>
               </div>
               <button className="text-[11px] font-bold hover:underline">Show all...</button>
             </div>

             {/* Pure CSS Line Chart illusion */}
             <div className="flex-1 mt-4 relative z-10 w-full border-b border-black/10">
                <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <path d="M0,20 Q5,25 10,15 T20,10 T30,25 T40,5 T50,15 T60,10 T70,20 T80,15 T90,25 T100,5" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
                  {/* Active Point */}
                  <circle cx="40" cy="5" r="2" fill="black" />
                  <line x1="40" y1="5" x2="40" y2="30" stroke="black" strokeWidth="0.5" strokeDasharray="2,2" />
                </svg>
                <div className="absolute -bottom-5 w-full flex justify-between text-[9px] text-black/50 font-bold">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-4 mb-8">
          
          {/* Green Card: Categories */}
          <div className="bg-[#9EB070] rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[140px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#92A367] rounded-bl-[100px] -z-0"></div>
            <div className="absolute -bottom-8 left-1/2 w-0 h-0 border-l-[40px] border-l-transparent border-b-[80px] border-b-[#8D9F61] border-r-[40px] border-r-transparent -rotate-12 z-0"></div>
            
            <h3 className="font-bold text-lg mb-3 relative z-10">By category:</h3>
            <div className="flex gap-4 relative z-10">
               <div>
                 <div className="font-bold text-sm">48</div>
                 <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Cameras</div>
               </div>
               <div>
                 <div className="font-bold text-sm">124</div>
                 <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Books</div>
               </div>
               <div>
                 <div className="font-bold text-sm">15</div>
                 <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Tools</div>
               </div>
             </div>
          </div>

          {/* Blue Card: Platform Health */}
          <div className="bg-[#8EA7D3] rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[140px]">
            {/* Abstract Star */}
            <div className="absolute top-4 -right-4 w-24 h-24 bg-[#8199C5] rotate-45 z-0" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
            
            <h3 className="font-bold text-lg mb-3 relative z-10">Health:</h3>
            <div className="flex gap-4 relative z-10">
               <div>
                 <div className="font-bold text-sm">94%</div>
                 <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">On-Time Return</div>
               </div>
               <div>
                 <div className="font-bold text-sm">4.8/5</div>
                 <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Avg Rating</div>
               </div>
               <div>
                 <div className="font-bold text-sm">1</div>
                 <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Disputes</div>
               </div>
             </div>
          </div>

        </div>

        {/* Bottom Split Section */}
        <div className="grid grid-cols-[1.2fr_1fr] gap-6">
          
          {/* Left: Transaction List */}
          <div>
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="font-bold text-lg">Transaction list</h3>
              <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer">
                Today <ChevronDown className="w-3 h-3"/>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {[
                { name: 'David Smith', action: 'Requested Camera', time: '09:15 AM', color: 'bg-[#F6A8D0]' },
                { name: 'Samantha Williams', action: 'Returned Textbook', time: '09:15 AM', color: 'bg-[#D3E4F6]' },
                { name: 'Amy White', action: 'Approved Request', time: '09:15 AM', color: 'bg-[#FCE3EA]' },
                { name: 'Tyler Young', action: 'Reported Issue', time: '09:45 AM', color: 'bg-[#E3E9D2]' },
              ].map((t, i) => (
                <div key={i} className={`${t.color} rounded-full py-2 px-3 flex items-center gap-3 transition-transform hover:scale-[1.01] cursor-pointer`}>
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-black/60"/>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-black/60">{t.action}</div>
                  </div>
                  <div className="bg-white/40 px-3 py-1.5 rounded-full text-[10px] font-bold shrink-0">
                    {t.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visit/Tx Details */}
          <div>
             <h3 className="font-bold text-lg mb-4 px-2">Transaction details</h3>
             <div className="bg-[#F6A8D0] rounded-3xl p-6 h-[calc(100%-2.5rem)]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-bold text-lg">Sony Alpha 6400</div>
                    <div className="text-xs text-black/60">Borrower: David Smith</div>
                  </div>
                  <div className="bg-white/40 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider">
                    ID-89K2
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <span className="bg-black/10 px-3 py-1 rounded-full text-xs font-medium">Electronics</span>
                  <span className="bg-black/10 px-3 py-1 rounded-full text-xs font-medium">Camera</span>
                  <span className="bg-black/10 px-3 py-1 rounded-full text-xs font-medium">Overdue</span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-[100px_1fr] text-sm">
                    <div className="text-black/60 text-xs">Last Updated</div>
                    <div className="font-medium text-xs">12 mins ago by System</div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] text-sm">
                    <div className="text-black/60 text-xs">Status</div>
                    <div className="font-medium text-xs leading-relaxed">
                      Item is currently 2 days overdue. Lender has initiated contact.
                    </div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] text-sm">
                    <div className="text-black/60 text-xs">Action</div>
                    <div className="font-medium text-xs">
                      Send automated email reminder to David Smith. Deduct ₹100 from deposit if not returned today.
                    </div>
                  </div>
                </div>
             </div>
          </div>

        </div>

      </main>

      {/* RIGHT SIDEBAR (Calendar & Timeline) */}
      <aside className="w-72 flex flex-col shrink-0">
         {/* Top buttons */}
         <div className="flex justify-end gap-2 mb-8">
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-4 py-1.5 bg-[#F6A8D0] rounded-full text-xs font-bold flex items-center">
              May 2024
            </div>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
         </div>

         {/* Mini Calendar */}
         <div className="mb-6 border-b border-gray-200 pb-6">
           <div className="grid grid-cols-7 gap-1 text-[10px] text-gray-400 font-bold text-center mb-4">
             <div>MO</div><div>TU</div><div>WE</div><div>TH</div><div>FR</div><div>SA</div><div>SU</div>
           </div>
           <div className="grid grid-cols-7 gap-y-3 text-sm text-center">
             {/* Fake dates to match layout */}
             {[...Array(30)].map((_, i) => {
               const day = i + 1;
               const isToday = day === 15;
               return (
                 <div key={i} className="flex justify-center">
                   <div className={`w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-[#F6A8D0] font-bold text-black' : 'text-gray-600 hover:bg-gray-100 cursor-pointer'}`}>
                     {day}
                   </div>
                 </div>
               );
             })}
           </div>
         </div>

         {/* Add Event Button Row */}
         <div className="flex gap-2 mb-8">
           <button className="flex-1 bg-black text-white rounded-full py-2.5 text-xs font-bold hover:bg-gray-800 transition-colors">
             Add record
           </button>
           <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
             <RefreshCw className="w-4 h-4" />
           </button>
         </div>

         {/* Timeline */}
         <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="font-bold text-lg leading-tight">May 15</h3>
                <div className="text-xs text-gray-500 font-medium">Today's timeline</div>
              </div>
              <div className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                All <ChevronDown className="w-3 h-3"/>
              </div>
            </div>

            <div className="relative flex-1">
              <div className="absolute left-10 top-0 bottom-0 w-px bg-gray-200 -z-10"></div>
              
              <div className="flex flex-col gap-6">
                {timelineEvents.map((ev, i) => (
                  <div key={i} className={`flex items-start gap-4 relative ${ev.highlight ? 'z-10' : ''}`}>
                    {ev.highlight && <div className="absolute top-3 left-0 right-0 h-px border-t border-dashed border-yellow-400 -z-10"></div>}
                    
                    <div className="text-[10px] font-bold text-gray-400 mt-1 w-8 shrink-0">{ev.time}</div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-4 border-[#FFFDF8] ${ev.color}`}>
                      {ev.icon}
                    </div>
                    <div className={`flex-1 rounded-2xl p-3 ${ev.highlight ? 'bg-[#FDF6E3] border border-[#F4D068]/30' : 'bg-[#F5F2EB]'}`}>
                      <div className="font-bold text-xs mb-1">{ev.title}</div>
                      <div className="text-[10px] text-gray-500 leading-tight">{ev.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-black text-white rounded-full py-3 text-xs font-bold mt-6 hover:bg-gray-800 transition-colors">
              View all details
            </button>
         </div>
      </aside>

    </div>
  );
};

// Subcomponent for Sidebar Nav
const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => {
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-colors ${active ? 'bg-white/10 text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
};

// Fake Bell icon component (missing from lucide imports)
const Bell = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
);
const ChevronDown = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);
