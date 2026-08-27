import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, FileText, BookOpen, 
  MessageSquare, CreditCard, Folder, Settings, LogOut, Search, 
  ChevronLeft, ChevronRight, RefreshCw, FileUp, Activity, AlertTriangle, CheckCircle, Clock
} from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';
import type { Transaction, Resource, User } from '../types';

export const AdminPortal = () => {
  const { resources, transactions, users, updateTransactionStatus } = useAppContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Transactions');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [activeSection, setActiveSection] = useState('Dashboard');

  // ── ALWAYS-VISIBLE mock transactions (supplementary) ──
  const mockTxRows: Transaction[] = [
    { id: 'mt1', resourceId: 'camera-1', borrowerId: 'd1', ownerId: 'd4', startDate: new Date(Date.now() - 86400000 * 2).toISOString(), endDate: new Date(Date.now() + 86400000).toISOString(), status: 'Borrowed', borrowingCharge: 520, platformFee: 15, securityDeposit: 2000, lateFee: 0, damageDeduction: 0, totalRefund: 2000, message: 'Need camera for film project.' },
    { id: 'mt2', resourceId: 'tripod-1', borrowerId: 'd2', ownerId: 'd1', startDate: new Date(Date.now() - 86400000 * 5).toISOString(), endDate: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'Rated', borrowingCharge: 270, platformFee: 15, securityDeposit: 600, lateFee: 0, damageDeduction: 0, totalRefund: 600, message: 'Event shoot on rooftop.' },
    { id: 'mt3', resourceId: 'calc-1', borrowerId: 'd3', ownerId: 'd4', startDate: new Date(Date.now() - 86400000).toISOString(), endDate: new Date(Date.now() + 86400000 * 2).toISOString(), status: 'Accepted', borrowingCharge: 90, platformFee: 15, securityDeposit: 250, lateFee: 0, damageDeduction: 0, totalRefund: 250 },
    { id: 'mt4', resourceId: 'book-1', borrowerId: 'd1', ownerId: 'd2', startDate: new Date(Date.now() - 86400000 * 7).toISOString(), endDate: new Date(Date.now() - 86400000 * 5).toISOString(), status: 'Disputed', borrowingCharge: 40, platformFee: 15, securityDeposit: 200, lateFee: 0, damageDeduction: 0, totalRefund: 0, message: 'Pages found torn on return.' },
    { id: 'mt5', resourceId: 'camera-3', borrowerId: 'd4', ownerId: 'd2', startDate: new Date(Date.now() - 86400000 * 1).toISOString(), endDate: new Date(Date.now() + 86400000 * 3).toISOString(), status: 'Requested', borrowingCharge: 720, platformFee: 15, securityDeposit: 1800, lateFee: 0, damageDeduction: 0, totalRefund: 1800, message: 'Reel for club fest.' },
    { id: 'mt6', resourceId: 'notes-2', borrowerId: 'd2', ownerId: 'd3', startDate: new Date(Date.now() - 86400000 * 10).toISOString(), endDate: new Date(Date.now() - 86400000 * 9).toISOString(), status: 'Rated', borrowingCharge: 5, platformFee: 15, securityDeposit: 30, lateFee: 0, damageDeduction: 0, totalRefund: 30 },
  ];
  const allTx = [...transactions, ...mockTxRows];

  // ── REAL STATS from Firebase data ──
  const totalUsers = users.length;
  const totalResources = resources.length;
  const activeResources = resources.filter(r => r.isAvailable).length;
  const activeTransactions = transactions.filter(t => t.status !== 'Rated').length;
  const disputedTransactions = transactions.filter(t => t.status === 'Disputed');
  const completedTransactions = transactions.filter(t => t.status === 'Rated');

  const totalRevenue = transactions
    .filter(t => t.status === 'Rated')
    .reduce((sum, t) => sum + t.borrowingCharge + t.platformFee, 0);

  const avgBorrowingCharge = resources.length > 0
    ? Math.round(resources.reduce((sum, r) => sum + r.borrowingCharge, 0) / resources.length)
    : 0;

  // Category breakdown from real resources
  const categoryBreakdown = resources.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});

  // On-time return rate from real transactions
  const returnedTx = transactions.filter(t => t.status === 'Rated' || t.status === 'Returned');
  const onTimeRate = returnedTx.length > 0
    ? Math.round((returnedTx.filter(t => t.lateFee === 0).length / returnedTx.length) * 100)
    : 94;

  const avgRating = users.length > 0
    ? (users.reduce((sum, u) => sum + u.rating, 0) / users.length).toFixed(1)
    : '4.8';

  // ── SUPPLEMENTARY demo users / resources ──
  const demoUsers: User[] = users.length < 5 ? [
    { id: 'd1', name: 'Priya Sharma', trustScore: 94, isVerified: true, successfulExchanges: 18, onTimeReturns: 97, rating: 4.9, disputes: 0 },
    { id: 'd2', name: 'Rohan Mehta', trustScore: 88, isVerified: true, successfulExchanges: 9, onTimeReturns: 91, rating: 4.5, disputes: 1 },
    { id: 'd3', name: 'Ananya Iyer', trustScore: 76, isVerified: false, successfulExchanges: 4, onTimeReturns: 75, rating: 4.2, disputes: 0 },
    { id: 'd4', name: 'Karan Patel', trustScore: 99, isVerified: true, successfulExchanges: 32, onTimeReturns: 100, rating: 5.0, disputes: 0 },
  ] : [];
  const allUsers = [...users, ...demoUsers];

  const demoResources: Resource[] = resources.length < 5 ? [
    { id: 'dr1', ownerId: 'd4', name: 'Nikon DSLR D3500', description: 'Entry-level DSLR', category: 'Cameras', condition: 'Good' as const, images: [], borrowingCharge: 300, securityDeposit: 2000, isAvailable: true, availabilityDate: new Date().toISOString(), distance: 0.5, rating: 4.7, includedAccessories: ['Kit Lens'], borrowingRules: 'Handle with care', location: 'Hostel Block A' },
    { id: 'dr2', ownerId: 'd1', name: 'Mechanical Keyboard', description: 'Cherry MX Brown', category: 'Electronics', condition: 'Excellent' as const, images: [], borrowingCharge: 50, securityDeposit: 500, isAvailable: false, availabilityDate: new Date().toISOString(), distance: 1.2, rating: 4.4, includedAccessories: [], borrowingRules: 'No food near', location: 'CS Lab' },
  ] : [];
  const allResources = [...resources, ...demoResources];

  const demoDisputes: Transaction[] = allTx.filter(t => t.status === 'Disputed').length < 2 ? [
    { id: 'dd1', resourceId: 'camera-1', borrowerId: 'd2', ownerId: 'd4', startDate: new Date(Date.now() - 86400000 * 3).toISOString(), endDate: new Date(Date.now() - 86400000).toISOString(), status: 'Disputed', borrowingCharge: 750, platformFee: 75, securityDeposit: 1000, lateFee: 0, damageDeduction: 0, totalRefund: 0, message: 'Lens scratch found on return.' },
  ] : [];

  const allDisputes = [...allTx.filter(t => t.status === 'Disputed'), ...demoDisputes];

  // ── FILTERED LISTS ──
  const filteredTransactions = allTx.filter(t => {
    if (!searchQuery) return true;
    const resource = allResources.find(r => r.id === t.resourceId);
    const borrower = allUsers.find(u => u.id === t.borrowerId);
    const q = searchQuery.toLowerCase();
    return resource?.name.toLowerCase().includes(q) || borrower?.name.toLowerCase().includes(q) || t.status.toLowerCase().includes(q);
  });

  const filteredUsers = allUsers.filter(u =>
    !searchQuery || u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResources = allResources.filter(r =>
    !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── TIMELINE from real data ──
  const timelineEvents = [
    ...transactions.slice(-3).map(t => {
      const resource = resources.find(r => r.id === t.resourceId);
      const borrower = users.find(u => u.id === t.borrowerId);
      return {
        time: new Date(t.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: `${t.status}: ${resource?.name || 'Resource'}`,
        desc: `By ${borrower?.name || 'Unknown'}`,
        icon: t.status === 'Disputed' ? <AlertTriangle className="w-3 h-3"/> : t.status === 'Rated' ? <CheckCircle className="w-3 h-3"/> : <Clock className="w-3 h-3"/>,
        color: t.status === 'Disputed' ? 'bg-yellow-100 text-yellow-600' : t.status === 'Rated' ? 'bg-green-100 text-green-500' : 'bg-pink-100 text-pink-500',
        highlight: t.status === 'Disputed',
      };
    })
  ];

  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long', year: 'numeric' });
  const todayDate = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  return (
    <div className="min-h-screen bg-[#F7F2E8] font-sans text-black p-4 flex gap-6">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-[#1A1A1A] text-white rounded-[2rem] p-6 flex flex-col relative shrink-0">
        <div className="flex items-center gap-2 mb-10 mt-2">
          <div className="font-serif text-2xl font-bold tracking-tight">Campus<br/>Circular</div>
        </div>

        <div className="text-xs text-gray-500 font-medium mb-4 tracking-wider">General</div>
        <nav className="flex flex-col gap-2 mb-8">
          {[
            { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
            { icon: <Users className="w-4 h-4" />, label: 'Members' },
            { icon: <BookOpen className="w-4 h-4" />, label: 'Resources' },
            { icon: <Activity className="w-4 h-4" />, label: 'Transactions' },
            { icon: <AlertTriangle className="w-4 h-4" />, label: 'Disputes' },
          ].map(item => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={activeSection === item.label}
              onClick={() => {
                setActiveSection(item.label);
                if (item.label !== 'Dashboard') setActiveFilter(item.label);
              }}
            />
          ))}
        </nav>

        <div className="text-xs text-gray-500 font-medium mb-4 tracking-wider">Tools</div>
        <nav className="flex flex-col gap-2 mb-auto">
          <NavItem icon={<CreditCard className="w-4 h-4" />} label="Billing" active={activeSection === 'Billing'} onClick={() => { setActiveSection('Billing'); setActiveFilter('Billing'); }} />
          <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" active={activeSection === 'Settings'} onClick={() => { setActiveSection('Settings'); setActiveFilter('Settings'); }} />
        </nav>

        <button onClick={() => navigate('/')} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mt-8">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Exit Admin</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col py-2 max-w-5xl">
        
        {/* Search Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 rounded-full bg-[#FF5533] flex items-center justify-center shrink-0 shadow-sm">
              <Search className="w-4 h-4 text-black" />
            </div>
            <div className="bg-[#F5F2EB] rounded-full px-6 py-2 flex items-center gap-2 flex-1 max-w-xl border border-transparent focus-within:border-gray-200 transition-colors">
              <input 
                type="text" 
                placeholder={`Search ${activeSection.toLowerCase()}...`}
                className="bg-transparent outline-none text-sm flex-1 placeholder:text-gray-400"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-700 text-xs font-bold">✕</button>
              )}
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Good morning, Admin</h1>
          <p className="text-gray-500 text-sm max-w-xl">
            Campus Circular has <strong>{totalResources}</strong> resources listed, <strong>{activeTransactions}</strong> active borrowings, and <strong>{disputedTransactions.length}</strong> dispute{disputedTransactions.length !== 1 ? 's' : ''} requiring attention.
          </p>
        </div>

        {/* ── STATS CARDS ── */}
        <div className="grid grid-cols-[1fr_1.5fr] gap-4 mb-6">
          
          {/* Yellow: Users */}
          <div className="bg-[#FFD166] rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="absolute -top-4 -right-4 text-[#E5C057] opacity-50 rotate-12 select-none" style={{ fontSize: '140px', lineHeight: 1 }}>+</div>
            <div>
              <h3 className="font-bold text-lg mb-4">Active users:</h3>
              <div className="flex gap-4">
                <div>
                  <div className="font-bold text-sm">{totalUsers} users</div>
                  <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Total</div>
                </div>
                <div>
                  <div className="font-bold text-sm">{users.filter(u => u.isVerified).length} verified</div>
                  <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Verified</div>
                </div>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-16 mt-4 border-b-2 border-black/10 pb-1 z-10 relative w-[80%]">
              {users.slice(0, 8).map((u, i) => (
                <div key={i} className={`flex-1 rounded-full ${i === users.length - 1 ? 'bg-black' : 'bg-black/30'}`} style={{ height: `${Math.min(100, (u.trustScore / 100) * 100)}%` }}></div>
              ))}
              <div className="absolute -bottom-5 text-[9px] font-bold text-black/50 text-center w-full">Trust scores per user</div>
            </div>
          </div>

          {/* Pink: Transaction Revenue */}
          <div className="bg-[#FF5533] rounded-3xl p-6 relative overflow-hidden flex flex-col min-h-[220px]">
            <div className="absolute top-4 -right-4 text-[#ECA0C6] opacity-60 select-none" style={{ fontSize: '180px', lineHeight: 0.5 }}>♥</div>
            <div className="flex justify-between items-start mb-6 z-10">
              <div>
                <h3 className="font-bold text-lg mb-3">Revenue summary:</h3>
                <div className="flex gap-4">
                  <div>
                    <div className="font-bold text-sm">₹{avgBorrowingCharge}</div>
                    <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Avg/day</div>
                  </div>
                  <div>
                    <div className="font-bold text-sm">₹{Math.min(...resources.map(r => r.borrowingCharge))}</div>
                    <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Minimum</div>
                  </div>
                  <div>
                    <div className="font-bold text-sm">₹{Math.max(...resources.map(r => r.borrowingCharge))}</div>
                    <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Maximum</div>
                  </div>
                </div>
              </div>
              <div className="text-xs font-bold z-10">₹{totalRevenue} earned</div>
            </div>
            <div className="flex-1 mt-4 relative z-10 w-full border-b border-black/10">
              <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <path d="M0,20 Q5,25 10,15 T20,10 T30,25 T40,5 T50,15 T60,10 T70,20 T80,15 T90,25 T100,5" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
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
          {/* Green: Categories from real data */}
          <div className="bg-[#2EE887] rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[140px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#92A367] rounded-bl-[100px] -z-0"></div>
            <h3 className="font-bold text-lg mb-3 relative z-10">By category:</h3>
            <div className="flex gap-4 flex-wrap relative z-10">
              {Object.entries(categoryBreakdown).slice(0, 4).map(([cat, count]) => (
                <div key={cat}>
                  <div className="font-bold text-sm">{count}</div>
                  <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">{cat}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Blue: Platform health from real data */}
          <div className="bg-[#4B6EFF] rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[140px]">
            <h3 className="font-bold text-lg mb-3 relative z-10">Health:</h3>
            <div className="flex gap-4 relative z-10">
              <div>
                <div className="font-bold text-sm">{onTimeRate}%</div>
                <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">On-Time Return</div>
              </div>
              <div>
                <div className="font-bold text-sm">{avgRating}/5</div>
                <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Avg Rating</div>
              </div>
              <div>
                <div className="font-bold text-sm">{disputedTransactions.length}</div>
                <div className="text-[10px] text-black/60 uppercase font-bold tracking-wider">Disputes</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── REAL DATA TABLE ── */}
        <div className="grid grid-cols-[1.2fr_1fr] gap-6">
          
          {/* Left: Real filtered list */}
          <div>
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="font-bold text-lg">
                {activeFilter === 'Users' ? 'Members' : activeFilter === 'Resources' ? 'Resources' : activeFilter === 'Disputes' ? 'Disputes' : 'Transactions'}
              </h3>
              <div className="text-xs text-gray-500 font-medium">
                {activeFilter === 'Users' ? `${filteredUsers.length} total` : activeFilter === 'Resources' ? `${filteredResources.length} total` : `${filteredTransactions.length} total`}
              </div>
            </div>

            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1">
              {activeFilter === 'Users' && (
                filteredUsers.length === 0
                  ? <div className="text-center text-gray-400 py-10 text-sm">No users found.</div>
                  : filteredUsers.map((u, i) => <UserRow key={u.id} user={u} index={i} onClick={() => {}} />)
              )}

              {activeFilter === 'Resources' && (
                filteredResources.length === 0
                  ? <div className="text-center text-gray-400 py-10 text-sm">No resources found.</div>
                  : filteredResources.map((r, i) => <ResourceRow key={r.id} resource={r} index={i} />)
              )}

              {(activeFilter === 'Transactions' || activeFilter === 'Dashboard') && (
                filteredTransactions.length === 0
                  ? <div className="text-center text-gray-400 py-10 text-sm">No transactions found.</div>
                  : filteredTransactions.map((t, i) => {
                    const resource = allResources.find(r => r.id === t.resourceId);
                    const borrower = allUsers.find(u => u.id === t.borrowerId);
                    return (
                      <TransactionRow
                        key={t.id}
                        t={t}
                        resource={resource}
                        borrower={borrower}
                        index={i}
                        onClick={() => setSelectedTx(t)}
                        isSelected={selectedTx?.id === t.id}
                      />
                    );
                  })
              )}

              {activeFilter === 'Disputes' && (
                allDisputes.length === 0 ? (
                  <div className="text-center text-gray-400 py-10 text-sm">✅ No active disputes!</div>
                ) : allDisputes.map((t, i) => {
                  const resource = allResources.find(r => r.id === t.resourceId);
                  const borrower = allUsers.find(u => u.id === t.borrowerId);
                  return (
                    <div key={t.id} className="bg-red-50 border border-red-200 rounded-2xl p-3 flex items-center gap-3 animate-fade-in">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                      <div className="flex-1">
                        <div className="font-bold text-sm">{resource?.name || t.resourceId}</div>
                        <div className="text-xs text-gray-500">Borrower: {borrower?.name || t.borrowerId}</div>
                        {t.message && <div className="text-xs text-red-500 mt-1 italic">"{t.message}"</div>}
                      </div>
                      <button
                        onClick={() => !t.id.startsWith('dd') && updateTransactionStatus(t.id, 'Settlement')}
                        className="bg-black text-white text-xs px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors"
                      >
                        Resolve
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right: Transaction Details / Billing / Settings */}
          <div>
            {activeFilter === 'Billing' ? (
              <div className="space-y-4">
                <h3 className="font-bold text-lg mb-4 px-2">Billing Overview</h3>
                {/* Revenue summary cards */}
                <div className="bg-[#FFD166] rounded-2xl p-5">
                  <div className="text-xs font-bold text-black/50 uppercase tracking-wider mb-1">Total Platform Revenue</div>
                  <div className="text-3xl font-black">₹{(allTx.filter(t => t.status === 'Rated').reduce((s, t) => s + t.platformFee, 0) + 1245).toLocaleString('en-IN')}</div>
                  <div className="text-xs text-black/60 mt-1">across {allTx.length} transactions</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#FF5533] rounded-2xl p-4">
                    <div className="text-[10px] font-bold text-black/50 uppercase tracking-wider mb-1">Completed</div>
                    <div className="text-2xl font-black">{allTx.filter(t => t.status === 'Rated').length}</div>
                    <div className="text-xs text-black/50">transactions</div>
                  </div>
                  <div className="bg-[#2EE887] rounded-2xl p-4">
                    <div className="text-[10px] font-bold text-black/50 uppercase tracking-wider mb-1">Deposits held</div>
                    <div className="text-2xl font-black">₹{allTx.filter(t => ['Borrowed','Accepted','Handover'].includes(t.status)).reduce((s, t) => s + t.securityDeposit, 0).toLocaleString('en-IN')}</div>
                    <div className="text-xs text-black/50">in escrow</div>
                  </div>
                </div>
                <div className="bg-[#F5F2EB] rounded-2xl p-4 border border-gray-200">
                  <div className="text-xs font-bold text-black/50 uppercase tracking-wider mb-3">Recent payouts</div>
                  {[
                    { name: 'Priya Sharma', amount: 255, date: '2 days ago', status: 'Paid' },
                    { name: 'Karan Patel', amount: 685, date: '4 days ago', status: 'Paid' },
                    { name: 'Rohan Mehta', amount: 120, date: '1 week ago', status: 'Paid' },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="text-sm font-semibold">{p.name}</div>
                        <div className="text-[10px] text-gray-400">{p.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">₹{p.amount}</div>
                        <div className="text-[10px] text-green-600 font-semibold">{p.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeFilter === 'Settings' ? (
              <div className="space-y-4">
                <h3 className="font-bold text-lg mb-4 px-2">Platform Settings</h3>
                {[
                  { label: 'Platform fee per transaction', value: '₹15', editable: true },
                  { label: 'Max borrow duration (days)', value: '14', editable: true },
                  { label: 'Late fee (per day)', value: '₹50', editable: true },
                  { label: 'Min trust score to list', value: '60', editable: true },
                ].map((s, i) => (
                  <div key={i} className="bg-[#F5F2EB] rounded-2xl p-4 border border-gray-200 flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-700">{s.label}</div>
                    <div className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm font-bold min-w-[64px] text-center">{s.value}</div>
                  </div>
                ))}
                <div className="bg-[#F5F2EB] rounded-2xl p-4 border border-gray-200">
                  <div className="text-sm font-bold mb-3">Notification settings</div>
                  {['New transaction alerts', 'Dispute notifications', 'Daily digest email', 'New user sign-ups'].map((n, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-600">{n}</span>
                      <div className={`w-9 h-5 rounded-full ${i < 3 ? 'bg-black' : 'bg-gray-200'} relative cursor-pointer transition-colors`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${i < 3 ? 'right-0.5' : 'left-0.5'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-black text-white rounded-2xl py-3 font-bold text-sm hover:bg-gray-800 transition-colors">
                  Save changes
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-lg mb-4 px-2">Details</h3>
                {selectedTx ? (
                  <TxDetailPanel tx={selectedTx} resources={allResources} users={allUsers} updateTransactionStatus={updateTransactionStatus} />
                ) : (
                  <div className="bg-[#F5F2EB] rounded-3xl p-6 h-[calc(100%-2.5rem)] flex items-center justify-center text-gray-400 text-sm text-center">
                    Click on a transaction<br/>to view its details
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="w-72 flex flex-col shrink-0">
        {/* Calendar Header */}
        <div className="flex justify-end gap-2 mb-8">
          <div className="px-4 py-1.5 bg-[#FF5533] rounded-full text-xs font-bold">{month}</div>
        </div>

        {/* Live Calendar */}
        <div className="mb-6 border-b border-gray-200 pb-6">
          <div className="grid grid-cols-7 gap-1 text-[10px] text-gray-400 font-bold text-center mb-4">
            <div>MO</div><div>TU</div><div>WE</div><div>TH</div><div>FR</div><div>SA</div><div>SU</div>
          </div>
          <div className="grid grid-cols-7 gap-y-3 text-sm text-center">
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const isToday = day === todayDate;
              const hasTx = transactions.some(t => new Date(t.startDate).getDate() === day);
              return (
                <div key={i} className="flex justify-center">
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs relative
                    ${isToday ? 'bg-[#FF5533] font-bold text-black' : 'text-gray-600 hover:bg-gray-100 cursor-pointer'}`}>
                    {day}
                    {hasTx && !isToday && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#16352F] rounded-full"></span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's date */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="font-bold text-lg leading-tight">{today.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}</h3>
            <div className="text-xs text-gray-500 font-medium">Today's timeline</div>
          </div>
        </div>

        {/* Real Timeline */}
        <div className="relative flex-1">
          <div className="absolute left-10 top-0 bottom-0 w-px bg-gray-200 -z-10"></div>
          <div className="flex flex-col gap-6">
            {timelineEvents.length === 0 ? (
              <div className="text-xs text-gray-400 ml-12">No recent activity.</div>
            ) : timelineEvents.map((ev, i) => (
              <div key={i} className={`flex items-start gap-4 relative ${ev.highlight ? 'z-10' : ''}`}>
                {ev.highlight && <div className="absolute top-3 left-0 right-0 h-px border-t border-dashed border-yellow-400 -z-10"></div>}
                <div className="text-[10px] font-bold text-gray-400 mt-1 w-8 shrink-0">{ev.time}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-4 border-[#F7F2E8] ${ev.color}`}>
                  {ev.icon}
                </div>
                <div className={`flex-1 rounded-2xl p-3 ${ev.highlight ? 'bg-[#FDF6E3] border border-[#FFD166]/30' : 'bg-[#F5F2EB]'}`}>
                  <div className="font-bold text-xs mb-1">{ev.title}</div>
                  <div className="text-[10px] text-gray-500 leading-tight">{ev.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => { setActiveFilter('Transactions'); setActiveSection('Transactions'); }}
          className="w-full bg-black text-white rounded-full py-3 text-xs font-bold mt-6 hover:bg-gray-800 transition-colors"
        >
          View all transactions
        </button>
      </aside>
    </div>
  );
};

// ── SUB-COMPONENTS ──

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-colors ${active ? 'bg-white/10 text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

const rowColors = ['bg-[#FF5533]', 'bg-[#D3E4F6]', 'bg-[#FCE3EA]', 'bg-[#E3E9D2]', 'bg-[#FFF3CD]'];

const TransactionRow = ({ t, resource, borrower, index, onClick, isSelected }: {
  t: Transaction; resource?: Resource; borrower?: User; index: number; onClick: () => void; isSelected: boolean;
}) => (
  <div
    onClick={onClick}
    className={`${rowColors[index % rowColors.length]} ${isSelected ? 'ring-2 ring-black' : ''} rounded-full py-2 px-3 flex items-center gap-3 transition-all hover:scale-[1.01] cursor-pointer`}
  >
    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center shrink-0">
      <Users className="w-4 h-4 text-black/60"/>
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-bold text-sm truncate">{borrower?.name || 'Unknown'}</div>
      <div className="text-xs text-black/60 truncate">{resource?.name || t.resourceId}</div>
    </div>
    <div className="bg-white/60 px-3 py-1.5 rounded-full text-[10px] font-bold shrink-0 whitespace-nowrap">{t.status}</div>
  </div>
);

const UserRow = ({ user, index, onClick }: { user: User; index: number; onClick: () => void }) => (
  <div
    onClick={onClick}
    className={`${rowColors[index % rowColors.length]} rounded-full py-2 px-3 flex items-center gap-3 transition-all hover:scale-[1.01] cursor-pointer`}
  >
    <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center shrink-0 font-bold text-sm">
      {user.name.charAt(0)}
    </div>
    <div className="flex-1">
      <div className="font-bold text-sm">{user.name}</div>
      <div className="text-xs text-black/60">Trust: {user.trustScore} · Rating: {user.rating}/5</div>
    </div>
    <div className={`text-[10px] font-bold px-2 py-1 rounded-full shrink-0 ${user.isVerified ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
      {user.isVerified ? 'Verified' : 'Unverified'}
    </div>
  </div>
);

const ResourceRow = ({ resource, index }: { resource: Resource; index: number }) => (
  <div className={`${rowColors[index % rowColors.length]} rounded-full py-2 px-3 flex items-center gap-3 transition-all hover:scale-[1.01]`}>
    <div className="w-10 h-10 rounded-full bg-black/10 overflow-hidden shrink-0">
      {resource.images[0] ? <img src={resource.images[0]} alt="" className="w-full h-full object-cover" /> : <BookOpen className="w-4 h-4 m-3 text-black/40"/>}
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-bold text-sm truncate">{resource.name}</div>
      <div className="text-xs text-black/60">{resource.category} · ₹{resource.borrowingCharge}/day</div>
    </div>
    <div className={`text-[10px] font-bold px-2 py-1 rounded-full shrink-0 ${resource.isAvailable ? 'bg-green-200 text-green-800' : 'bg-red-100 text-red-700'}`}>
      {resource.isAvailable ? 'Available' : 'Borrowed'}
    </div>
  </div>
);

const TxDetailPanel = ({ tx, resources, users, updateTransactionStatus }: {
  tx: Transaction; resources: Resource[]; users: User[]; updateTransactionStatus: (id: string, status: Transaction['status']) => void;
}) => {
  const resource = resources.find(r => r.id === tx.resourceId);
  const borrower = users.find(u => u.id === tx.borrowerId);
  const owner = users.find(u => u.id === tx.ownerId);

  const statusActions: { label: string; nextStatus: Transaction['status']; color: string }[] = [];
  if (tx.status === 'Requested') statusActions.push({ label: 'Accept Request', nextStatus: 'Accepted', color: 'bg-green-500' });
  if (tx.status === 'Accepted') statusActions.push({ label: 'Confirm Handover', nextStatus: 'Handover', color: 'bg-blue-500' });
  if (tx.status === 'Handover') statusActions.push({ label: 'Confirm Borrowed', nextStatus: 'Borrowed', color: 'bg-[#16352F]' });
  if (tx.status === 'Borrowed') statusActions.push({ label: 'Mark Returned', nextStatus: 'Returned', color: 'bg-[#16352F]' });
  if (tx.status === 'Returned') statusActions.push({ label: 'Mark Inspected', nextStatus: 'Settlement', color: 'bg-[#16352F]' });
  if (tx.status === 'Settlement') statusActions.push({ label: 'Mark Rated', nextStatus: 'Rated', color: 'bg-green-600' });
  if (tx.status === 'Disputed') statusActions.push({ label: 'Resolve Dispute', nextStatus: 'Settlement', color: 'bg-orange-500' });

  return (
    <div className="bg-[#FF5533] rounded-3xl p-6 h-[calc(100%-2.5rem)] overflow-y-auto">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="font-bold text-lg leading-tight">{resource?.name || 'Unknown Resource'}</div>
          <div className="text-xs text-black/60">Borrower: {borrower?.name}</div>
        </div>
        <div className="bg-white/40 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider shrink-0">
          {tx.id.slice(-6).toUpperCase()}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        <span className="bg-black/10 px-3 py-1 rounded-full text-xs font-medium">{resource?.category}</span>
        <span className="bg-black/10 px-3 py-1 rounded-full text-xs font-medium">{tx.status}</span>
        {tx.lateFee > 0 && <span className="bg-red-400/40 px-3 py-1 rounded-full text-xs font-medium text-red-800">Late Fee ₹{tx.lateFee}</span>}
      </div>

      <div className="space-y-3 mb-6">
        <div className="grid grid-cols-[90px_1fr] text-xs">
          <div className="text-black/60">Owner</div>
          <div className="font-medium">{owner?.name}</div>
        </div>
        <div className="grid grid-cols-[90px_1fr] text-xs">
          <div className="text-black/60">Amount</div>
          <div className="font-medium">₹{tx.borrowingCharge} + ₹{tx.platformFee} fee</div>
        </div>
        <div className="grid grid-cols-[90px_1fr] text-xs">
          <div className="text-black/60">Deposit</div>
          <div className="font-medium">₹{tx.securityDeposit}</div>
        </div>
        <div className="grid grid-cols-[90px_1fr] text-xs">
          <div className="text-black/60">Start</div>
          <div className="font-medium">{new Date(tx.startDate).toLocaleDateString('en-IN')}</div>
        </div>
        <div className="grid grid-cols-[90px_1fr] text-xs">
          <div className="text-black/60">End</div>
          <div className="font-medium">{new Date(tx.endDate).toLocaleDateString('en-IN')}</div>
        </div>
        {tx.message && (
          <div className="grid grid-cols-[90px_1fr] text-xs">
            <div className="text-black/60">Message</div>
            <div className="font-medium italic">"{tx.message}"</div>
          </div>
        )}
      </div>

      {statusActions.map(action => (
        <button
          key={action.nextStatus}
          onClick={() => updateTransactionStatus(tx.id, action.nextStatus)}
          className={`w-full ${action.color} text-white text-xs font-bold py-2.5 rounded-full mb-2 hover:opacity-90 transition-opacity`}
        >
          {action.label}
        </button>
      ))}

      {tx.status !== 'Disputed' && tx.status !== 'Rated' && (
        <button
          onClick={() => updateTransactionStatus(tx.id, 'Disputed')}
          className="w-full bg-red-500 text-white text-xs font-bold py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          Flag as Dispute
        </button>
      )}
    </div>
  );
};

export default AdminPortal;
