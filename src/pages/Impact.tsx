import React from 'react';
import { Leaf, DollarSign, RefreshCw, TrendingUp } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const Impact = () => {
  const { transactions, resources } = useAppContext();

  // Basic calculations for demo
  const successfulTransactions = transactions.filter(t => t.status === 'Rated' || t.status === 'Settlement').length + 1500; // Mock base scale
  const moneySaved = transactions.reduce((acc, t) => acc + (t.borrowingCharge * 3), 0) + 45000; // Mock metric
  const itemsDiverted = resources.length + 850;

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="bg-[#16352F] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#2EE887] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-[1200px]">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">Our Campus <br/><span className="text-[#2EE887]">Impact</span></h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light leading-relaxed">
            Every item borrowed is an item not bought. See how the Campus Circular community is driving sustainable, economic change at our university.
          </p>
        </div>
      </section>

      {/* Global Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Metric 1 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-[#F0FDF4] text-[#16A34A] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <RefreshCw className="w-10 h-10" />
              </div>
              <div className="text-5xl font-bold text-black mb-2">{successfulTransactions}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Items Exchanged</h3>
              <p className="text-gray-500 text-sm">Successfully borrowed and returned by students this semester.</p>
            </div>

            {/* Metric 2 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-[#FEF3C7] text-[#D97706] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-10 h-10" />
              </div>
              <div className="text-5xl font-bold text-black mb-2">₹{moneySaved.toLocaleString()}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Student Savings</h3>
              <p className="text-gray-500 text-sm">Total estimated savings compared to buying these items brand new.</p>
            </div>

            {/* Metric 3 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-[#ECFEFF] text-[#0891B2] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="w-10 h-10" />
              </div>
              <div className="text-5xl font-bold text-black mb-2">{itemsDiverted}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Items Diverted</h3>
              <p className="text-gray-500 text-sm">High-quality goods kept in circulation instead of ending up in landfills.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Personal Impact */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Your Personal Impact</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                As a member of Campus Circular, your choices directly contribute to a greener campus. By choosing to borrow instead of buy, you're reducing manufacturing demand and saving money.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black text-[#2EE887] rounded-full flex items-center justify-center font-bold text-xl">4</div>
                  <div>
                    <div className="font-bold text-black">Items Borrowed</div>
                    <div className="text-sm text-gray-500">You've chosen the sustainable route 4 times.</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black text-[#2EE887] rounded-full flex items-center justify-center font-bold text-xl"><TrendingUp className="w-6 h-6"/></div>
                  <div>
                    <div className="font-bold text-black">Top 15% Contributor</div>
                    <div className="text-sm text-gray-500">Your sharing habits put you in the top tier of the campus.</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md bg-[#16352F] rounded-[3rem] p-10 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#2EE887] rounded-full blur-2xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
               <h3 className="text-xl font-medium mb-2 text-white/80">You have saved approx</h3>
               <div className="text-6xl font-bold font-serif mb-8 text-[#2EE887]">₹4,250</div>
               
               <div className="space-y-4">
                 <div className="flex justify-between items-end border-b border-white/10 pb-2">
                   <span className="text-white/60">Sony Camera</span>
                   <span className="font-bold">₹2,000 saved</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-white/10 pb-2">
                   <span className="text-white/60">Tripod</span>
                   <span className="font-bold">₹850 saved</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-white/10 pb-2">
                   <span className="text-white/60">Calculators (2)</span>
                   <span className="font-bold">₹1,400 saved</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};
