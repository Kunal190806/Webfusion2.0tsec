import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddResourceModal: React.FC<AddResourceModalProps> = ({ isOpen, onClose }) => {
  const { addResource, currentUser } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    borrowingCharge: '',
    securityDeposit: '',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    addResource({
      ownerId: currentUser.id,
      name: formData.name,
      category: formData.category,
      borrowingCharge: Number(formData.borrowingCharge),
      securityDeposit: Number(formData.securityDeposit),
      description: formData.description,
      condition: 'Good',
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500'], // Mock image
      isAvailable: true,
      availabilityDate: new Date().toISOString().split('T')[0],
      distance: 0,
      rating: 5,
      includedAccessories: [],
      borrowingRules: 'Handle with care.',
      location: 'Main Campus',
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-black">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">List a Resource</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Item Name</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="e.g. Sony A7III Camera"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Storage">Storage</option>
              <option value="Books">Books</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Borrowing Charge (₹)</label>
              <input 
                required
                type="number" 
                min="0"
                value={formData.borrowingCharge}
                onChange={e => setFormData({...formData, borrowingCharge: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Security Deposit (₹)</label>
              <input 
                required
                type="number" 
                min="0"
                value={formData.securityDeposit}
                onChange={e => setFormData({...formData, securityDeposit: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
            <textarea 
              required
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Describe the condition and details..."
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-lg font-bold text-white bg-[#16352F] hover:bg-black transition-colors mt-2"
          >
            List Item
          </button>
        </form>
      </div>
    </div>
  );
};
