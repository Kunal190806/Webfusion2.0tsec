import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { Button } from '../components/ui/button';
import { Plus, Settings } from 'lucide-react';
import { ProfileCard } from '../components/ui/ProfileCard';
import { ConfettiButton } from '../components/ui/confetti';
import { SettlementModal } from '../components/modals/SettlementModal';
import { RatingModal } from '../components/modals/RatingModal';
import { AddResourceModal } from '../components/modals/AddResourceModal';
import { EditProfileModal } from '../components/modals/EditProfileModal';

export const Dashboard = () => {
  const { transactions, resources, users, updateTransactionStatus, processSettlement, submitRating } = useAppContext();
  const [activeTab, setActiveTab] = useState<'borrowings' | 'listings'>('borrowings');
  const [selectedTransactionForSettlement, setSelectedTransactionForSettlement] = useState<any>(null);
  const [selectedTransactionForRating, setSelectedTransactionForRating] = useState<any>(null);
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Hardcode demo user "u3" for now since auth isn't fully implemented
  const currentUser = users.find(u => u.id === 'u3') || users[0];
  const myBorrowings = transactions.filter(t => t.borrowerId === currentUser?.id);
  
  return (
    <div className="container mx-auto px-6 py-12 max-w-[1400px]">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-foreground">Member Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your resources, active borrowings, and trust score.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline"><Settings className="h-4 w-4 mr-2" /> Settings</Button>
          <ConfettiButton 
            className="bg-[#16352F] text-white hover:bg-[#0D2621]"
            onClick={() => setIsAddResourceModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> List New Resource
          </ConfettiButton>
        </div>
      </div>

      <div className="grid md:grid-cols-[350px_1fr] gap-10 items-start">
        {/* Profile Sidebar using ProfileCard */}
        <div className="flex justify-center w-full sticky top-24">
          <ProfileCard
            name={currentUser?.name}
            title={`${currentUser?.trustScore} Trust Score`}
            handle={currentUser?.name?.toLowerCase().replace(' ', '')}
            status="Active Member"
            contactText="Edit Profile"
            avatarUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400"
            showUserInfo={true}
            enableTilt={true}
            className="w-full"
            innerGradient="linear-gradient(145deg, #16352F 0%, #1A3129 100%)"
            behindGlowColor="rgba(22, 53, 47, 0.4)"
            onContactClick={() => setIsEditProfileModalOpen(true)}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col gap-6">
          <div className="flex border-b border-border">
            <button 
              className={`pb-3 px-1 mr-8 text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'borrowings' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('borrowings')}
            >
              My Borrowings
            </button>
            <button 
              className={`pb-3 px-1 text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'listings' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('listings')}
            >
              My Listings
            </button>
          </div>

          {activeTab === 'borrowings' && (
            <div className="space-y-6">
              {myBorrowings.length === 0 ? (
                <div className="py-20 text-center border border-border bg-card rounded-xl">
                  <h3 className="font-semibold mb-2">Nothing here yet.</h3>
                  <p className="text-muted-foreground text-sm">Your next borrowing will appear here.</p>
                </div>
              ) : (
                <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
                  {/* Table Header */}
                  <div className="grid grid-cols-6 gap-4 p-4 border-b border-border bg-[#F4F3EF] text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    <div className="col-span-2">Resource</div>
                    <div>Duration</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div>Action</div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="divide-y divide-border">
                    {myBorrowings.map(t => {
                      const resource = resources.find(r => r.id === t.resourceId);
                      const owner = users.find(u => u.id === t.ownerId);
                      if (!resource) return null;

                      return (
                        <div key={t.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                          <div className="col-span-2 flex items-center gap-4">
                            <div className="w-12 h-12 bg-muted border border-border rounded overflow-hidden flex-shrink-0">
                              <img src={resource.images[0]} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-[14px]">{resource.name}</div>
                              <div className="text-[11px] text-muted-foreground">Owner: {owner?.name}</div>
                            </div>
                          </div>
                          
                          <div className="text-sm font-medium">2 Days</div>
                          
                          <div className="text-sm font-medium">
                            <div>₹{(resource.borrowingCharge * 2) + 15}</div>
                            <div className="text-[10px] text-muted-foreground">Dep: ₹{resource.securityDeposit}</div>
                          </div>
                          
                          <div>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                              t.status === 'Requested' ? 'bg-amber-100 text-amber-800' :
                              t.status === 'Borrowed' ? 'bg-[#E7F0EC] text-[#16352F]' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {t.status}
                            </span>
                          </div>
                          
                          <div>
                            {t.status === 'Requested' && (
                              <Button size="sm" className="h-8 text-xs bg-[#16352F] text-white" onClick={() => updateTransactionStatus(t.id, 'Handover')}>Simulate Accept</Button>
                            )}
                            {t.status === 'Handover' && (
                              <Button size="sm" className="h-8 text-xs bg-[#16352F] text-white" onClick={() => updateTransactionStatus(t.id, 'Borrowed')}>Confirm Receipt</Button>
                            )}
                            {t.status === 'Borrowed' && (
                              <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => updateTransactionStatus(t.id, 'Returned')}>Return Item</Button>
                            )}
                            {t.status === 'Returned' && (
                              <Button size="sm" className="h-8 text-xs bg-[#16352F] text-white" onClick={() => setSelectedTransactionForSettlement({ t, resource })}>Inspect & Settle</Button>
                            )}
                            {t.status === 'Settlement' && (
                              <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => setSelectedTransactionForRating({ t, resource })}>Review & Accept</Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="py-20 text-center border border-border bg-card rounded-xl">
              <h3 className="font-semibold mb-2">Manage your listings here</h3>
              <p className="text-muted-foreground text-sm mb-6">List a new resource to start sharing.</p>
              <Button className="bg-[#16352F] text-white" onClick={() => setIsAddResourceModalOpen(true)}>List a Resource</Button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddResourceModal 
        isOpen={isAddResourceModalOpen} 
        onClose={() => setIsAddResourceModalOpen(false)} 
      />

      {currentUser && (
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
          userId={currentUser.id}
        />
      )}

      {selectedTransactionForSettlement && (
        <SettlementModal
          isOpen={true}
          onClose={() => setSelectedTransactionForSettlement(null)}
          transaction={selectedTransactionForSettlement.t}
          resource={selectedTransactionForSettlement.resource}
          onSettle={processSettlement}
        />
      )}

      {selectedTransactionForRating && (
        <RatingModal
          isOpen={true}
          onClose={() => setSelectedTransactionForRating(null)}
          transaction={selectedTransactionForRating.t}
          resource={selectedTransactionForRating.resource}
          onSubmit={submitRating}
        />
      )}
    </div>
  );
};

export default Dashboard;
